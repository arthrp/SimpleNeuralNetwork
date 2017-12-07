class Neuron {
    constructor() {
        this.inputs = [0, 0];
        this.weights = [0, 0];
        this.error = 0;
        this.bias = Math.random();
    }
    get output() {
        return SigmoidHelper.output(this.weights[0] * this.inputs[0] +
            this.weights[1] * this.inputs[1] +
            this.bias);
    }
    randomizeWeights() {
        this.weights[0] = Math.random();
        this.weights[1] = Math.random();
        this.bias = Math.random();
    }
    adjustWeights() {
        this.weights[0] += this.error * this.inputs[0];
        this.weights[1] += this.error * this.inputs[1];
        this.bias += this.error;
    }
}
//# sourceMappingURL=neuron.js.map