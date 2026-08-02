import { NextResponse } from 'next/server';
import { generateAINutritionPlan } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { calories = 2800, dietType = 'High Protein', goal = 'Muscle Recomp' } = body;
    const plan = await generateAINutritionPlan(goal, parseInt(calories, 10), dietType);
    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
