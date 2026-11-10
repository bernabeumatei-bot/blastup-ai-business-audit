import {questions} from "./questions.mjs";
import {scoreAnswers} from "./score.mjs";
const list = document.querySelector("#questions");
questions.forEach((question, index) => {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = (index+1) + ". " + question.text;
  fieldset.append(legend);
  for (const [value,label] of [[0,"No"],[1,"Parcialmente"],[2,"Sí"]]) {
    const choice = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio"; input.name = "q" + index; input.value = String(value); input.required = true;
    choice.append(input, document.createTextNode(label));
    fieldset.append(choice);
  }
  list.append(fieldset);
});
document.querySelector("#audit").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const answers = questions.map((_,index)=>Number(data.get("q"+index)));
  const result = scoreAnswers(answers);
  document.querySelector("#overall").textContent = "Puntuación descriptiva: " + result.overallPercent + " %";
  const categories = document.querySelector("#categories");
  categories.replaceChildren();
  result.byCategory.forEach(({name,percent}) => {
    const p = document.createElement("p");
    p.textContent = name + ": " + percent + " %";
    categories.append(p);
  });
  document.querySelector("#priority").textContent = "Área para explorar primero: " + result.priority + ". Verifica las causas antes de elegir una solución.";
  document.querySelector("#results").hidden = false;
  document.querySelector("#results").scrollIntoView({behavior:"smooth"});
});
