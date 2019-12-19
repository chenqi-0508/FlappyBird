class Game {
    constructor() {
        this.sky = new Sky(-50);
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProduct = new PipeProduct(-100);
        this.timer = null;
        //时间间隔
        this.tick = 16;
        this.gameOver = false;
        this.score = 0;
    }

    /**
     * 开始游戏
     */
    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            //重新开始游戏
            window.location.reload();
        }
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProduct.pipeList.forEach(pare => {
                pare.move(duration);
            });
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
                alert(`GAME OVER! SCORE: ${this.score}`);
            }
            this.score++;
        }, this.tick);
        //小鸟开始煽动翅膀
        this.bird.startSwing();
        //开始生成管道
        this.pipeProduct.startProduct();
    }

    /**
     * 结束游戏
     */
    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProduct.stopProduct();
    }

    /**
     * 绑定键盘事件
     */
    eventListener() {
        document.onkeydown = (e) => {
            const event = e || window.event;
            //按空格键小鸟起飞
            if (e.keyCode === 32) {
                this.bird.jump();
            } else if (e.keyCode === 13 || e.keyCode === 108) {
                if (this.timer) {//结束
                    this.stop();
                } else {//开始
                    this.start();
                }
            }
        }
    }

    /**
     * 判断游戏是否结束
     */
    isGameOver() {
        //1.判断小鸟是否落地
        if (this.bird.top >= this.bird.maxY) {
            return true;
        }
        //2.判断小鸟是否撞到管道
        // this.pipeProduct.pipeList.forEach(pare => {
        //     if (this.isHit(this.bird, pare.upPipe) || this.isHit(this.bird, pare.downPipe)) {
        //         return true;
        //     }
        // });
        for (let i = 0; i < this.pipeProduct.pipeList.length; i++) {
            const pair = this.pipeProduct.pipeList[i];
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断两个矩形是否相撞
     * @param rec1
     * @param rec2
     */
    isHit(rec1, rec2) {
        //横向：判断两个矩形中心点的水平方向距离是否小于两个宽度之和的一半
        //纵向：判断两个矩形中心点的竖直方向距离是否小于两个宽度之和的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerX2 = rec2.left + rec2.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;
        const centerY2 = rec2.top + rec2.height / 2;
        const boolX = Math.abs(centerX1 - centerX2) < (rec1.width + rec2.width) / 2;
        const boolY = Math.abs(centerY1 - centerY2) < (rec1.width + rec2.width) / 2;
        return boolX && boolY;
    }
}

const game = new Game();
game.eventListener();
