//2단계
//DOM의 기본 틀을 확장하여, 'div' element를 만드는 class
//(기존 DOM constructor의 tagName을 'div'로 고정)
import DOM from "./DOM.js";

class Div extends DOM{
    constructor(innerText, className){
        super('div', innerText, className);
    }
}

export default Div;