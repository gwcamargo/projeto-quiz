const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spn_qtd = document.querySelector(".spn-qtd");

const text_finish = document.querySelector(".finish span"); 
const content = document.querySelector(".content");
const content_finish = document.querySelector(".finish");

const btn_restart = document.querySelector(".finish button");

import questoes from "./data.json";

let current_index = 0;
let questions_correct = 0;

function load_question() {
    spn_qtd.innerHTML = `${current_index + 1}/${questoes.length}`;
    const item = questoes[current_index];
    answers.innerHTML = "";
    question.innerHTML = item.question;

   item.answers.forEach((answer) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}`
   });
}

load_question()