//2단계
//DOM의 기본 틀을 확장하여, 'button' element를 만드는 class
import DOM from "./DOM.js";
import Image from "./Image.js";

class Button extends DOM {
    constructor(innerText, className, imageSrc) {
        super('button', '', className); // 버튼 요소 생성

        // button내 text를 담는 span element
        this.textSpan = document.createElement('span');
        this.textSpan.innerText = innerText;
        this.textSpan.classList.add('button-text');
        this.node.appendChild(this.textSpan);

        // button내 image를 담는 image element
        this.image = new Image(imageSrc);
        this.image.node.classList.add('button-image');
        this.node.appendChild(this.image.node);
    }

    // innerText 설정 메서드
    setInnerText(text) {
        this.textSpan.innerText = text;
    }
    // 이미지 설정 메서드
    setImage(imageSrc) {
        // 이미지 요소를 새로운 이미지로 교체
        this.image.node.src = imageSrc;
    }
}


export default Button;