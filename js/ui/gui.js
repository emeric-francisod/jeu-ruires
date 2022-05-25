class GUI {
    constructor() {
        this.components = {};
    }

    addComponent(component, name) {
        this.components[name] = component;
    }

    render() {
        for (const name in this.components) {
            this.components[name].render();
        }
    }
}
