const skyDom = document.querySelector('.sky');
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);

class Sky extends Rectangle {
    constructor(speed) {
        super(skyWidth, skyHeight, 0, 0, speed, 0, skyDom);
    }

    /**
     * 当sky移动到指定位置时，重置位置
     */
    onMove() {
        if (this.left <= -this.width / 2) {
            this.left = 0;
        }
    }
}
