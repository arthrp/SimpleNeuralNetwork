class SigmoidHelper {
    static output(x) {
        return 1.0 / (1.0 + Math.exp(-x));
    }
    static derivative(x) {
        return x * (1 - x);
    }
}
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
class Network {
    constructor() {
        this._epochs = 10000;
        this._hiddenNeurons = [new Neuron(), new Neuron()];
        this._outputNeuron = new Neuron();
    }
    train(inputs, results) {
        const hiddenNeurons = this._hiddenNeurons;
        let outputNeuron = this._outputNeuron;
        for (let epoch = 0; epoch < this._epochs; epoch++) {
            for (let i = 0; i < inputs.length; i++) {
                let inputOne = inputs[i][0];
                let inputTwo = inputs[i][1];
                hiddenNeurons[0].inputs = [inputOne, inputTwo];
                hiddenNeurons[1].inputs = [inputOne, inputTwo];
                outputNeuron.inputs = [hiddenNeurons[0].output, hiddenNeurons[1].output];
                console.log(`${inputOne} xor ${inputTwo} = ${outputNeuron.output}`);
                outputNeuron.error = SigmoidHelper.derivative(outputNeuron.output) * (results[i] - outputNeuron.output);
                outputNeuron.adjustWeights();
                hiddenNeurons[0].error = SigmoidHelper.derivative(hiddenNeurons[0].output) * outputNeuron.error * outputNeuron.weights[0];
                hiddenNeurons[1].error = SigmoidHelper.derivative(hiddenNeurons[1].output) * outputNeuron.error * outputNeuron.weights[1];
                hiddenNeurons[0].adjustWeights();
                hiddenNeurons[1].adjustWeights();
            }
        }
    }
}
const xorInputs = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
const xorResults = [0, 1, 1, 0]; //Results for each input, mapped by indices
new Network().train(xorInputs, xorResults);
//# sourceMappingURL=main.js.map