const gameWidth = gameDom.clientWidth;

/**
 * 管道类
 */
class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    }

    /**
     * 当pipe移动出视野时，移除
     */
    onMove() {
        if (this.left <= -this.width) {
            this.dom.remove();
        }
    }
}

/**
 * 管道对类（上下管道为一对）
 */
class PipePare {
    constructor(speed) {
        //管道中间的固定高度
        const spaceHeight = 150;
        //管道高度的最小值
        const minHeight = 40;
        //管道高度的最大值
        const maxHeight = gameHeight - landHeight - spaceHeight - minHeight;
        //随机生成上管道高度
        const upHeight = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
        //生成下管道高度
        const downHeight = maxHeight + minHeight - upHeight;
        //下管道top
        const downTop = gameHeight - landHeight - downHeight;
        //创建上下管道dom
        const upDom = document.createElement('div');
        const downDom = document.createElement('div');
        upDom.className = 'pipe up';
        downDom.className = 'pipe down';
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

        //插入dom
        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);

    }

    move(druation) {
        this.upPipe.move(druation);
        this.downPipe.move(druation);
    }

    //是否是无效的管道对，即离开视野的管道对
    get useLess() {
        return this.upPipe.left <= -this.upPipe.width;
    }
}

/**
 * 管道制造类
 */
class PipeProduct {
    constructor(speed) {
        //管道移动速度
        this.speed = speed;
        //管道队列，存放管道对
        this.pipeList = [];
        //生产管道定时器
        this.timer = null;
        //生产管道的间隔事件
        this.tick = 1500;
    }

    /**
     * 开始生成管道对
     */
    startProduct() {
        if (this.timer) {
            return;
        }
        setInterval(() => {
            this.pipeList.push(new PipePare(this.speed));
            //循环移除过期的管道对
            this.pipeList.forEach((pare, index) => {
                if (pare.useLess) {
                    this.pipeList.splice(index, 1);
                }
            })
        }, this.tick)
    }

    /**
     * 停止生成管道对
     */
    stopProduct() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
