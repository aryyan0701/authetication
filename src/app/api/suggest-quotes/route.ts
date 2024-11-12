// Import required packages
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Define the POST function
export async function POST(req: Request) {
  try {
    // Define a static prompt for generating quotes
    const prompt = 'Generate a random inspirational quote.';

    // Call the streamText function with the prompt and OpenAI model
    const result = await streamText({
      model: openai('gpt-3.5-turbo'), // Use GPT-3.5 Turbo model
      system: 'You are a helpful assistant.',
      prompt,
    });

    // Return the response as a data stream
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error generating quote:', error);
    
    // Return an error response if something goes wrong
    return new Response('Internal Server Error', { status: 500 });
  }
}
