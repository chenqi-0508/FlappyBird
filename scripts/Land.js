const landDom = document.querySelector('.land');
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);

class Land extends Rectangle {
    constructor(speed) {
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
    }

    /**
     * 当land移动到指定位置时，重置位置
     */
    onMove() {
        if (this.left <= -this.width / 2) {
            this.left = 0;
        }
    }
}
