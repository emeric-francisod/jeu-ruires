class ProgressBar {
    constructor(max) {
        this.maxValue = max;
        this.value = max;
    }

    updateValue(value) {
        this.value = value;
    }
}

class HealthBar extends ProgressBar {
    constructor(max) {
        super(max);
        this.design = {
            width: 100,
            height: 15,
            borderWeight: 3,
            margin: {
                top: 15,
                left: 20,
            },
            borderColor: color(120, 10, 91),
            barColor: color(0, 98, 91),
        };
    }

    render() {
        const barWidth = (this.value * this.design.width) / this.maxValue;

        fill(this.design.barColor);
        noStroke();
        rect(this.design.margin.left, this.design.margin.top, barWidth, this.design.height);

        noFill();
        stroke(this.design.borderColor);
        strokeWeight(this.design.borderWeight);
        rect(this.design.margin.left, this.design.margin.top, this.design.width, this.design.height);
    }
}
