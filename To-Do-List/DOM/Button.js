//2단계
//DOM의 기본 틀을 확장하여, 'button' element를 만드는 class
import DOM from "./DOM.js";
import Image from "./Image.js";

class Button extends DOM{
    constructor(innerText, className, imageSrc){
        super('button', innerText, className);
        this.image = new Image(imageSrc);
        this.image.node.classList.add('button-image');
        this.node.appendChild(this.image.node);
    }
}

export default Button;