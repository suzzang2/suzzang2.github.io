import Button from "./Button.js";
import Div from "./Div.js";

class Todo {
    constructor(todo) {
        this.row = new Div('', 'row').node;
        this.innerText = new Div(todo, 'text-box');
        this.completeBtn = new Button('완료', 'complete-btn', 'https://cdn-icons-png.flaticon.com/512/14090/14090371.png');
        this.delBtn = new Button('삭제', 'del-btn', 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png');
    }

    //method
    addRow(){
        [this.innerText, this.completeBtn, this.delBtn].forEach((dom)=>{
            this.row.appendChild(dom.node);
        });
        return this.row;
    }

    getRow(){
        return this.row;
    }
    getCompleteBtn(){
        return this.completeBtn.node;
    }
    getDelBtn(){
        return this.delBtn.node;
    }
    getInnerText(){
        return this.innerText.node;
    }
}

export default Todo;