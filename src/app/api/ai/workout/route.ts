import { NextResponse } from 'next/server';
import { generateAIWorkoutPlan } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt = '4 day hypertrophy split', level = 'INTERMEDIATE', goal = 'Hypertrophy' } = body;
    const plan = await generateAIWorkoutPlan(prompt, level, goal);
    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
