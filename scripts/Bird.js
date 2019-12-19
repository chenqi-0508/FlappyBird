const birdDom = document.querySelector('.bird');
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);

const gameDom = document.querySelector('.game');
const gameHeight = parseFloat(getComputedStyle(gameDom).height);

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        //小鸟下落的最大距离（屏幕高度-大地高度-自身高度）
        this.maxY = gameHeight - landHeight - this.height;
        //重力加速度g(像素/秒²)
        this.g = 1500;
        //小鸟翅膀状态
        this.swingState = 1;
        //小鸟煽动翅膀定时器
        this.swingTimer = null;
    }

    /**
     * 重写move方法
     * 自动下落
     */
    move(duration) {
        this.ySpeed += this.g * duration;
        super.move(duration);
    }

    /**
     * 判断小鸟可飞行高度的范围
     */
    onMove() {
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > this.maxY) {
            this.top = this.maxY;
            //小鸟碰到地面，则停止飞行
            this.stopSwing();
        }
    }

    /**
     * 小鸟起飞
     */
    jump() {
        this.ySpeed = -350;
    }

    /**
     * 小鸟开始煽动翅膀
     */
    startSwing() {
        //自动改变翅膀状态1-3对应3张翅膀图片
        this.swingTimer = setInterval(() => {
            this.swingState = (this.swingState + 1) % 3 + 1;
            birdDom.className = `bird swing${this.swingState}`;
        }, 100);
    }

    /**
     * 小鸟停止煽动翅膀
     */
    stopSwing() {
        clearInterval(this.swingTimer);
        this.swingTimer = null;
    }
}
