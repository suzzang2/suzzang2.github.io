import Todo from "../DOM/Todo.js";
import Complete from "../DOM/Complete.js";

class TodoController {
    //constructor
    constructor(todo){
        this.newTodo = new Todo(todo);
        this.delBtnNode = this.newTodo.getDelBtn();
        this.comBtnNode = this.newTodo.getCompleteBtn();
        this.innerNode = this.newTodo.getInnerText();

        this.delBtnNode.addEventListener('click', () => {
            if(this.comBtnNode.innerText === '완료')
                this.delTodo();
            else
                this.deleteComplete();
        })
        this.comBtnNode.addEventListener('click', () => {
            if(this.comBtnNode.innerText === '완료')
                this.doneTodo();
            else
                this.restoreComplete();
        })
    }

    //method 
    addTodo(){
        const todoList = document.getElementById("to-do-list");
        const input = document.querySelector('input');
        todoList.appendChild(this.newTodo.addRow());
        input.value='' //이거뭐지?
    }

    delTodo(){ //여기서 지움과 동시에 complete list로 이동해줘야함...
        const todoList = document.getElementById("to-do-list");
        todoList.removeChild(this.newTodo.getRow());
    }

    doneTodo(){
        this.innerNode.classList.toggle('done-text');
        this.comBtnNode.classList.toggle('done-btn');

        // if(this.comBtnNode.innerText === '미완'){
        //     this.comBtnNode.innerText='완료';
        //     // this.innerText.node.classList.remove('done-text');
        //     // this.completeBtn.node.classList.remove('done-btn');
        // } else {
        //     this.comBtnNode.innerText = '미완';
        //     // this.innerText.node.classList.toggle('done-text');
        //     // this.completeBtn.node.classList.toggle('done-btn');
        // }
        const todoList = document.getElementById("to-do-list");
        todoList.removeChild(this.newTodo.getRow()); //상태 바꾸는 거 대신에 아예 사라지게

        //complete list로 이동, 이거 나중에 ComplteController로 옮기기
        const completeList = document.getElementById("complete-list");
        completeList.appendChild(this.newTodo.getRow());
        if(this.comBtnNode.innerText === '완료'){
            this.comBtnNode.innerText = '복구';
        }
    }

    restoreComplete(){
        this.innerNode.classList.toggle('done-text');
        this.comBtnNode.classList.toggle('done-btn');
        //1. complete list에서 삭제
        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newTodo.getRow());
        //2. todo list로 이동
        const todoList = document.getElementById("to-do-list");
        todoList.appendChild(this.newTodo.getRow());
        if(this.comBtnNode.innerText === '복구'){
            this.comBtnNode.innerText = '완료';

        }
    }
    deleteComplete(){
        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newTodo.getRow());
    }

}

export default TodoController;