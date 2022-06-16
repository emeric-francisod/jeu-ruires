class Sprite {
    constructor(image, spriteWidth, spriteHeight) {
        this.image = image;
        this.spriteSize = {
            width: spriteWidth,
            height: spriteHeight,
        };
        this.spriteNumber = this.image.width / this.spriteSize.width;
        this.spriteNo = 0;

        this.animationId = null;
    }

    clone() {
        return new Sprite(this.image, this.spriteSize.width, this.spriteSize.height);
    }

    startAnimation() {
        this.animationId = setInterval(this.nextImage.bind(this), 1000 / 8);
    }

    clearAnimation() {
        clearInterval(this.animationId);
        this.animationId = null;
    }

    isPlaying() {
        return this.animationId !== null;
    }

    displayImage(x, y, h = null, w = null) {
        let height = h === null ? this.spriteSize.height : h;
        let width = w === null ? (this.spriteSize.width * height) / this.spriteSize.height : w;
        imageMode(CENTER);
        image(
            this.image,
            x,
            y,
            width,
            height,
            this.spriteNo * this.spriteSize.width,
            0,
            this.spriteSize.width,
            this.spriteSize.height
        );
    }

    nextImage() {
        this.spriteNo = this.spriteNo >= this.spriteNumber - 1 ? 0 : this.spriteNo + 1;
    }
}
