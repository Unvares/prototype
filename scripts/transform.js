class Transform {
    constructor() {
        this.startPosition = [0, 0];
        this.currentPosition = [0, 0];
        this.currentTranslate = [0, 0];
        this.prevTranslate = [0, 0];
        this.isGoing = false;
        this.animationID = undefined; // it is defined in actionStart function
    }

    actionStart(event) {
        this.isGoing = true;
        this.startPosition = this.getTouchPosition(event);
        this.animationID = requestAnimationFrame( () => {
            this.rotating();
        });
    }

    getTouchPosition(event) {
        return [event.touches[0].clientX, event.touches[0].clientY];
    }

    actionEnd(event) {
        this.isGoing = false;
        cancelAnimationFrame(this.animationID);
        this.prevTranslate = this.currentTranslate.concat();
    }

    mouseMove(event) {
        this.currentPosition = this.getTouchPosition(event);
        this.getCurrentTranslate();        
    }

    getCurrentTranslate() {
        const currentTranslateX = this.prevTranslate[0] + this.startPosition[0] - this.currentPosition[0];
        const currentTranslateY = this.prevTranslate[1] + this.startPosition[1] - this.currentPosition[1];
        
        this.currentTranslate = [currentTranslateX, currentTranslateY];
    }

    rotating() {
        const rotationX = this.currentTranslate[1];
        const rotationY = this.currentTranslate[0] / 2;
        globalAR.tramModel.setAttribute('rotation', `${-rotationX} ${rotationY} 0`);
        if(this.isGoing) {
            requestAnimationFrame( () => {
                this.rotating();
            });
        }
    }
}

const rotationController = new Transform();

window.addEventListener('touchstart', (event) => {
    rotationController.actionStart(event);
});
window.addEventListener('touchmove', (event) => {
    rotationController.mouseMove(event);
});
window.addEventListener('touchend', (event) => {
    rotationController.actionEnd(event);
});