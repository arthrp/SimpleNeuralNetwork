///<reference path="neuron.ts" />
class Network {
    constructor() {
        this._epochs = 10000;
        this._hiddenNeurons = [new Neuron(), new Neuron()];
        this._outputNeuron = new Neuron();
    }
    train(inputs, results) {
        const hiddenNeurons = this._hiddenNeurons;
        const outputNeuron = this._outputNeuron;
        for (let epoch = 0; epoch < this._epochs; epoch++) {
            for (let i = 0; i < inputs.length; i++) {
                let inputOne = inputs[i][0];
                let inputTwo = inputs[i][1];
                hiddenNeurons[0].inputs = [inputOne, inputTwo];
                hiddenNeurons[1].inputs = [inputOne, inputTwo];
                outputNeuron.inputs = [hiddenNeurons[0].output, hiddenNeurons[1].output];
                outputNeuron.error = SigmoidHelper.derivative(outputNeuron.output) * (results[i] - outputNeuron.output);
                outputNeuron.adjustWeights();
                hiddenNeurons[0].error = SigmoidHelper.derivative(hiddenNeurons[0].output) * outputNeuron.error * outputNeuron.weights[0];
                hiddenNeurons[1].error = SigmoidHelper.derivative(hiddenNeurons[1].output) * outputNeuron.error * outputNeuron.weights[1];
                hiddenNeurons[0].adjustWeights();
                hiddenNeurons[1].adjustWeights();
            }
        }
    }
    getResult(inputs) {
        this._hiddenNeurons[0].inputs = [inputs[0], inputs[1]];
        this._hiddenNeurons[1].inputs = [inputs[0], inputs[1]];
        this._outputNeuron.inputs = [this._hiddenNeurons[0].output, this._hiddenNeurons[1].output];
        return `${inputs[0]} xor ${inputs[1]} = ${this._outputNeuron.output}`;
    }
}
const xorInputs = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
const xorResults = [0, 1, 1, 0]; //Results for each input, mapped by indices
const network = new Network();
network.train(xorInputs, xorResults);
const result = network.getResult([0, 1]);
document.querySelector("#results").innerHTML = result;
console.log(result);
