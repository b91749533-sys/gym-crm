'use client';

import React, { useState } from 'react';
import { Apple, Sparkles, Plus, PieChart, Flame, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { NutritionPlan } from '@/lib/types';
import { MOCK_NUTRITION_PLANS } from '@/lib/mock-data';
import { generateAINutritionPlan } from '@/lib/gemini';

export const NutritionModule: React.FC = () => {
  const [plans, setPlans] = useState<NutritionPlan[]>(MOCK_NUTRITION_PLANS);
  const [activePlan, setActivePlan] = useState<NutritionPlan>(MOCK_NUTRITION_PLANS[0]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [targetCalories, setTargetCalories] = useState('2800');
  const [dietType, setDietType] = useState('High Protein Recomp');

  const handleGenerateAiDiet = async () => {
    setIsAiLoading(true);
    try {
      const calNum = parseInt(targetCalories, 10) || 2800;
      const res = await generateAINutritionPlan('Muscle Recomposition', calNum, dietType);
      const newPlan: NutritionPlan = {
        id: `nut-${Date.now()}`,
        title: res.title || `AI ${dietType} (${calNum} kcal)`,
        assignedToName: 'David Chen',
        createdBy: 'APEX Gemini AI',
        dailyCalories: res.dailyCalories || calNum,
        proteinGrams: res.proteinGrams || 190,
        carbsGrams: res.carbsGrams || 260,
        fatGrams: res.fatGrams || 70,
        mealCategories: res.mealCategories || [],
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setPlans([newPlan, ...plans]);
      setActivePlan(newPlan);
    } catch (err) {
      console.error('AI Diet generation error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Nutrition & Macro Meal Planner</h2>
          <p className="text-xs text-zinc-400 mt-1">Manage dietary macros, caloric targets, and AI bio-nutritional meal plans.</p>
        </div>
      </div>

      {/* AI Nutrition Generator Banner */}
      <Card glow className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/40 border-emerald-500/40 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Gemini AI Diet Generator</h3>
          <Badge variant="success">SMART MACROS</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <Input
              label="Target Daily Kcal"
              type="number"
              value={targetCalories}
              onChange={(e) => setTargetCalories(e.target.value)}
              className="text-xs"
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="Dietary Focus Style"
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="text-xs"
              placeholder="e.g. Keto, Low Carb, High Protein, Vegan"
            />
          </div>
          <div className="flex items-end">
            <Button
              variant="glow"
              size="sm"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-400/30"
              disabled={isAiLoading}
              onClick={handleGenerateAiDiet}
              icon={<Sparkles className="w-4 h-4" />}
            >
              {isAiLoading ? 'AI Calculating...' : 'Generate Diet'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Macro Summary Card */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Macro Breakdown ({activePlan.dailyCalories} kcal)</h3>
          
          {/* Caloric & Macro Gauge Bars */}
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex items-center justify-between text-zinc-300 font-semibold mb-1">
                <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-rose-400" /> Protein</span>
                <span className="text-white">{activePlan.proteinGrams}g</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-zinc-300 font-semibold mb-1">
                <span className="flex items-center gap-1.5"><Apple className="w-3.5 h-3.5 text-amber-400" /> Carbohydrates</span>
                <span className="text-white">{activePlan.carbsGrams}g</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-zinc-300 font-semibold mb-1">
                <span className="flex items-center gap-1.5"><PieChart className="w-3.5 h-3.5 text-cyan-400" /> Fats</span>
                <span className="text-white">{activePlan.fatGrams}g</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Meal Categories Timeline */}
        <Card className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-lg font-bold text-white">{activePlan.title}</h3>
              <p className="text-xs text-zinc-400">Assigned Member: <span className="text-cyan-400 font-semibold">{activePlan.assignedToName || 'Unassigned'}</span></p>
            </div>
            <Badge variant="success">TARGET {activePlan.dailyCalories} KCAL</Badge>
          </div>

          <div className="space-y-4">
            {activePlan.mealCategories.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    {cat.title} ({cat.time})
                  </h4>
                </div>

                <div className="space-y-2">
                  {cat.meals.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 text-xs">
                      <div>
                        <p className="font-bold text-zinc-200">{m.name}</p>
                        <p className="text-[10px] text-zinc-500">Portion: {m.portion}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white">{m.calories} kcal</span>
                        <p className="text-[10px] text-emerald-400 font-mono">P: {m.protein}g | C: {m.carbs}g | F: {m.fat}g</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
