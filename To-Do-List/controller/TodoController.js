//4단계
import Todo from "../DOM/Todo.js";

class TodoController {
    //constructor
    constructor(todo){
        this.newTodo = new Todo(todo);
        //getter로 Todo객체 세팅
        this.delBtnNode = this.newTodo.getDelBtn();
        this.comBtnNode = this.newTodo.getCompleteBtn();
        
        this.innerNode = this.newTodo.getInnerText();

        this.delBtnNode.addEventListener('click', () => {
            if(this.comBtnNode.innerText === '완료')
                this.delTodo();
            else
                this.delComplete();
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
        todoList.appendChild(this.newTodo.addRow()); //위에서 만들어준 newTodo를 appenChild
        input.value='' //입력 필드 비워주는 역할!!
    }

    delTodo(){ //to-do-list에서 삭제(이동하는 것까지는 안 함)
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
        this.delComplete();
        //2. todo list로 이동
        const todoList = document.getElementById("to-do-list");
        todoList.appendChild(this.newTodo.getRow());
        if(this.comBtnNode.innerText === '복구'){ //버튼 내 텍스트 바꿔주기
            this.comBtnNode.innerText = '완료';
        }
    }
    delComplete(){
        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newTodo.getRow());
    }

}

export default TodoController;