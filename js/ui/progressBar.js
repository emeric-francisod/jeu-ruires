class ProgressBar extends GuiComponent {
    constructor(x, y, w, h, max) {
        super(x, y);
        this.maxValue = max;
        this.value = max;

        this.size = {
            width: w,
            height: h,
        };
    }

    updateValue(value) {
        this.value = value;
    }
}

class HealthBar extends ProgressBar {
    constructor(x, y, w, h, max) {
        super(x, y, w, h, max);
        this.design = {
            borderWeight: 3,
            borderColor: color(120, 10, 91),
            barColor: color(0, 98, 91),
        };
    }

    render() {
        const barWidth = (this.value * this.size.width) / this.maxValue;

        fill(this.design.barColor);
        noStroke();
        rect(this.position.x, this.position.y, barWidth, this.size.height);

        noFill();
        stroke(this.design.borderColor);
        strokeWeight(this.design.borderWeight);
        rect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}
