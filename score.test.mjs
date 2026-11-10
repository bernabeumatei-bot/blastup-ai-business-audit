import test from "node:test";
import assert from "node:assert/strict";
import {questions} from "./questions.mjs";
import {scoreAnswers} from "./score.mjs";
test("contiene 25 preguntas repartidas en cinco áreas",()=>{
  assert.equal(questions.length,25);
  assert.equal(new Set(questions.map(q=>q.category)).size,5);
});
test("calcula puntuaciones y prioridad a partir de respuestas completas",()=>{
  const result=scoreAnswers([...Array(5).fill(0),...Array(20).fill(2)]);
  assert.equal(result.overallPercent,80);
  assert.equal(result.priority,"Procesos");
});
test("rechaza respuestas incompletas",()=>assert.throws(()=>scoreAnswers([2])));
