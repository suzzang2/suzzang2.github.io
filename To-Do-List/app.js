import TodoController from "./controller/TodoController.js";

const addBtn = document.getElementById('input');
const input = document.querySelector('input');

addBtn.addEventListener('click', () => { 
    const todoControl = new TodoController(input.value);
    todoControl.addTodo();
})