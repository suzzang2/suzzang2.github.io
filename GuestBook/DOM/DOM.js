//1단계(base)
//html에 element를 추가하는 기본 틀이 되는 class
class DOM{
    constructor(tagName, innerText, className){
        this.node = document.createElement(tagName);
        this.node.innerText = innerText;
        if (className) this.node.classList.add(className);
    }
}

export default DOM;