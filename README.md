# AI Calorie Analyzer 🍽️

A modern web application that analyzes food images using **Vercel AI SDK** to provide nutritional information. Simply upload a photo of your food, and get instant details about calories and nutrients.

## Features ✨

- Upload food images with drag-and-drop
- Get instant AI analysis of food content
- View calories and macronutrients
- See detailed breakdown of detected ingredients
- Beautiful, responsive UI

## Tech Stack 🛠️

- Next.js 15
- Vercel AI SDK
- Shadcn UI
- TypeScript
- Tailwind CSS

## Vercel AI SDK Integration 🤖

This project showcases the power of Vercel AI SDK's `generateObject` function, which enables:
- Type-safe AI responses using Zod schema validation
- Structured data output for consistent UI rendering
- Multi-modal capabilities (text + image analysis)
- Easy integration with GPT-4o

The `generateObject` function ensures we get properly formatted nutritional data every time, making the app reliable and maintainable.

## Quick Start 🚀

1. Clone the repo
2. Install dependencies with `pnpm install`
3. Copy `.env.example` to `.env.local` and add your OpenAI API key
4. Run `pnpm dev` to start the development server

## Environment Setup 🔑

Required environment variables:

OPENAI_API_KEY=your_openai_api_key


## Contributing 🤝

Contributions are welcome! Feel free to submit issues and pull requests.

## License 📄

MIT License - feel free to use this project however you'd like!

---
Built with ❤️ using Vercel AI SDK