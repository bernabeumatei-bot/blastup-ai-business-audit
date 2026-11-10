import {questions} from "./questions.mjs";
export function scoreAnswers(answers) {
  if (!Array.isArray(answers) || answers.length !== questions.length ||
      answers.some((answer) => ![0,1,2].includes(answer))) {
    throw new Error("Responde las 25 preguntas con 0, 1 o 2.");
  }
  const categories = {};
  questions.forEach((question, index) => {
    const group = categories[question.category] ?? {points:0,max:0};
    group.points += answers[index];
    group.max += 2;
    categories[question.category] = group;
  });
  const byCategory = Object.entries(categories).map(([name, value]) => ({
    name, percent: Math.round(value.points / value.max * 100)
  }));
  return {
    overallPercent:Math.round(answers.reduce((sum,value)=>sum+value,0) / (questions.length*2)*100),
    byCategory,
    priority:byCategory.slice().sort((a,b)=>a.percent-b.percent)[0].name
  };
}
