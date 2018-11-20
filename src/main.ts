///<reference path="neuron.ts" />

const EPOCHS = 100000;

class Network {
    constructor(private readonly _epochs: number) {}

    private readonly _hiddenNeurons : Neuron[] = [new Neuron(), new Neuron()];
    private readonly _outputNeuron : Neuron = new Neuron();

    public train(inputs, results): void {
        const hiddenNeurons = this._hiddenNeurons;
        const outputNeuron = this._outputNeuron;

        for(let epoch = 0; epoch < this._epochs; epoch++){
            for (let i = 0; i < inputs.length; i++)
            {
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

    public getResult(inputs): string {
        this._hiddenNeurons[0].inputs = [inputs[0], inputs[1]];
        this._hiddenNeurons[1].inputs = [inputs[0], inputs[1]];

        this._outputNeuron.inputs = [this._hiddenNeurons[0].output, this._hiddenNeurons[1].output];

        return `${inputs[0]} xor ${inputs[1]} = ${this._outputNeuron.output}`;
    }
}

const xorInputs = [
    [0,0],
    [0,1],
    [1,0],
    [1,1]
];

const xorResults = [0,1,1,0]; //Results for each input, mapped by indices

const network = new Network(EPOCHS);
console.log('Starting training...');
network.train(xorInputs, xorResults);
console.log(`Finished after ${EPOCHS} epochs`);

const result = network.getResult([0,1]);

document.querySelector("#results").innerHTML = result;
console.log(result);

document.querySelector("#calculate").addEventListener("click", () => {
    const first = (<any>(document.querySelector("#one"))).value;
    const second = (<any>(document.querySelector("#two"))).value;

    const tmp = network.getResult([first,second]);
    document.querySelector("#results").innerHTML = tmp;
});