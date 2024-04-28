//3단계
import Button from "./Button.js";
import Div from "./Div.js";

class Todo {
    //constructor
    constructor(todo) {
        //Div(innerText, className)
        this.row = new Div('', 'row').node; //할 일 전체 한 줄을 의미
        this.innerText = new Div(todo, 'text-box'); //사용자가 입력한 할 일을 todo로 받아서 innerText로 넣어줌  
        //Button(innerText, className, imgSrc)
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