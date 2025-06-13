import { generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { Redis } from '@upstash/redis';

// Initialize Upstash Redis client with environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});
// here we define the schema for the response we want from the AI. vercel ai sdk will use this schema and make sure the response matches this format.
const foodAnalysisSchema = z.object({
  analysis: z.object({
    foodName: z.string(),
    calories: z.number(),
    macronutrients: z.object({
      protein: z.number(),
      carbs: z.number(),
      fat: z.number(),
    }),
    foodItems: z.array(z.string()),
    confidence: z.number(),
  }),
});

export async function POST(req: Request) {
  try {
    // Simple approach to identify user by IP (can be improved with authentication)
    const userIp = req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimitKey = `rate_limit:upload:${userIp}`;
    const rateLimitWindow = 1800; // 30 minutes in seconds
    const maxUploads = 10;

    // Check rate limit using Redis
    const currentCount = await redis.get(rateLimitKey);
    if (currentCount !== null && Number(currentCount) >= maxUploads) {
      return new Response('Rate limit exceeded. You can upload a maximum of 10 photos every 30 minutes.', { status: 429 });
    }

    // Increment count and set expiration if first upload in window
    await redis.incr(rateLimitKey);
    if (currentCount === null) {
      await redis.expire(rateLimitKey, rateLimitWindow);
    }

    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return new Response('No image provided', { status: 400 });
    }

    // Convert the image to base64
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    const { object } = await generateObject({
      // Using gpt-4o-mini for cheaper costs.
      model: openai('gpt-4o-mini'),
      schema: foodAnalysisSchema,
      temperature: 0.2,
      system: "Analyze this food image and provide nutritional information.try to name the dish based on traditional names or common names, estimated calories, macronutrients, and identify visible food items. If you're not certain, provide your best estimate and reflect that in the confidence score.",
      messages: [
        {
          role: 'user',
          content: [
            { 
              type: 'text', 
              text: 'Please analyze this food image and provide detailed nutritional information.' 
            },
            {
              type: 'image',
              image: base64Image
            },
          ],
        },
      ],
    });

    return Response.json(object);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return new Response('Error analyzing image', { status: 500 });
  }
}
