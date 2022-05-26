class Message extends GuiComponent {
    constructor(x, y, message, size, color, verticalAlign, horizontalAlign, bold, maxWidth) {
        super(x, y);
        this.color = color;
        this.size = size;
        this.message = message;
        this.style = bold ? BOLD : NORMAL;
        this.maxWidth = maxWidth;
        this.align = {};

        switch (verticalAlign) {
            case 'top':
                this.align.vertical = TOP;
                break;
            case 'bottom':
                this.align.vertical = BOTTOM;
                break;
            case 'center':
                this.align.vertical = CENTER;
                break;
            case 'baseline':
            default:
                this.align.vertical = BASELINE;
        }

        switch (horizontalAlign) {
            case 'right':
                this.align.horizontal = RIGHT;
                break;
            case 'center':
                this.align.horizontal = CENTER;
                break;
            case 'left':
            default:
                this.align.horizontal = LEFT;
        }
    }

    setMessage(message) {
        this.message = message;
    }

    render() {
        fill(this.color);
        textAlign(this.align.horizontal, this.align.vertical);
        textSize(this.size);
        textStyle(this.style);
        rectMode(CENTER);
        text(this.message, this.position.x, this.position.y, this.maxWidth);
    }
}
