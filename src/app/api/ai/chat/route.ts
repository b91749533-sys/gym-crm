import { NextResponse } from 'next/server';
import { chatWithAIFitnessAssistant } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message = '' } = body;
    const response = await chatWithAIFitnessAssistant(message);
    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
