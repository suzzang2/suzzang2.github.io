import Button from "./Button.js";
import Div from "./Div.js";

class Complete {
    constructor(complete){
        this.row = new Div('', 'row').node;
        this.innerText = new Div(complete, 'text-box');
        this.restoreBtn = new Button('복구', 'restore-btn');
        this.delBtn = new Button('삭제', 'del-btn');
    }
    addRow(){
        [this.innerText, this.restoreBtn, this.delBtn].forEach((dom)=>{
            this.row.appendChild(dom.node);
        });
        return this.row;
    }
    
}

export default Complete;