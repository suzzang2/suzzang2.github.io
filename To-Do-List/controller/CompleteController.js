import Complete from "../DOM/Complete";

//TodoController override하기?
class CompleteController {
    constructor(complete){
        this.newComplete = new Complete(complete);
        this.delBtn = this.newComplete.getDelBtn();
        this.restoreBtn = this.newComplete.getRestoreBtn();
        this.innerNode = this.newComplete.getInnerText();

        this.delBtn.addEventListener('click', () => {
            this.delComplete();
        })
        this.restoreBtn.addEventListener('click', () => {
            this.restoreComplete();
        })
    }

    //이거 이름들 addTodo로 할지 이걸로 할지?
    addComplete(){ 
        const completeList = document.getElementById("complete-list");
        completeList.appendChild(this.newComplete.addRow());
    }
    delComplete(){
        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newComplete.getRow());
    }
    restoreComplete(){
        this.innerNode.classList.toggle('done-text');
        this.restoreBtn.classList.toggle('done-btn');

        const completeList = document.getElementById("complete-list");
        completeList.removeChild(this.newComplete.getRow());

        const todoList = document.getElementById("to-do-list");
        todoList.appendChild(this.newComplete.getRow());
    }
}

export default CompleteController;