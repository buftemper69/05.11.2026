import { create_new_task } from "./func.js";

let taskList = document.querySelector(".tasks");
let taskInput = document.querySelectorAll('.taskinput')[1];
let taskInputButton = document.querySelector('.text-input');
let stat = document.querySelector('.stat');

let tuple = [0 , 0];


export function updateFooter() {
    stat.textContent = `Total: ${tuple[0]} Completed: ${tuple[1]}`;
}

taskInputButton.addEventListener('click', () => {
    let textt = taskInput.value.trim();
    create_new_task(textt, taskList, tuple , updateFooter);
    taskInput.value = '';
});
