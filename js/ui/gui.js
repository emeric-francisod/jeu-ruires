class GUI {
    constructor(background = null) {
        this.components = {};
        if (background !== null) {
            this.background = background;
        }
    }

    addComponent(component, name) {
        this.components[name] = component;
    }

    render() {
        if (this.background) {
            background(this.background);
        }
        for (const name in this.components) {
            this.components[name].render();
        }
    }
}
