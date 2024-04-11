import DOM from "./DOM.js";

class Image extends DOM{
    constructor(src, className){ //Image(이미지 주소, 이미지 클래스명)으로 사용
        super('img', '', className);
        this.node.src = src;
    }
}

export default Image;