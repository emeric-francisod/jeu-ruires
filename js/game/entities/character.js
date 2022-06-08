class Character extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings.width, settings.height);
        this.nextPosition = createVector(x, y);
        this.orientation = 0;
        this.nextOrientation = 0;
        this.speed = settings.speed;
        this.velocity = createVector(0, 0);
        this.calculateVelocity();
    }

    get nextX() {
        return this.nextPosition.x;
    }

    get nextY() {
        return this.nextPosition.y;
    }

    moveForward(t) {
        this.nextPosition.x += this.velocity.x * t;
        this.nextPosition.y += this.velocity.y * t;
    }

    confirmPosition(isConfirmed = true) {
        if (isConfirmed) {
            this.position.x = this.nextPosition.x;
            this.position.y = this.nextPosition.y;
        } else {
            this.nextPosition.x = this.position.x;
            this.nextPosition.y = this.position.y;
        }
    }

    rotate(angle) {
        this.nextOrientation = angle;
    }

    confirmAngle(isConfirmed = true) {
        if (isConfirmed) {
            this.orientation = this.nextOrientation;
        } else {
            this.nextOrientation = this.orientation;
        }
    }

    calculateVelocity() {
        this.velocity = p5.Vector.fromAngle(-this.orientation, this.speed);
    }
}
