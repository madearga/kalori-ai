import { generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
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
    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return new Response('No image provided', { status: 400 });
    }

    // Convert the image to base64
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    const { object } = await generateObject({
      // you can use gpt-4o-mini for cheaper costs. gpt-4o is recommended for better results.
      model: openai('gpt-4o'),
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