class SigmoidHelper {
    public static output(x: number): number {
        return 1.0 / (1.0 + Math.exp(-x));
    }

    public static derivative(x: number): number {
        return x * (1 - x);
    }
}

class Neuron {
    public inputs: number[] = [0,0];
    public weights: number[] = [0,0];
    public error = 0;

    public get output(): number { return SigmoidHelper.output(
        this.weights[0] * this.inputs[0] + 
        this.weights[1] * this.inputs[1] + 
        this.bias); }

    private bias = Math.random();

    public randomizeWeights(): void {
        this.weights[0] = Math.random();
        this.weights[1] = Math.random();
        this.bias = Math.random();
    }

    public adjustWeights(): void {
        this.weights[0] += this.error * this.inputs[0];
        this.weights[1] += this.error * this.inputs[1];
        this.bias += this.error;
    }
}

class Network {
    private readonly _epochs = 10000;
    private readonly _hiddenNeurons : Neuron[] = [new Neuron(), new Neuron()];
    private readonly _outputNeuron : Neuron = new Neuron();

    public train(inputs, results){
        const hiddenNeurons = this._hiddenNeurons;
        let outputNeuron = this._outputNeuron;

        for(let epoch = 0; epoch<this._epochs; epoch++){
            for (let i = 0; i < inputs.length; i++)
            {
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
    [0,0],
    [0,1],
    [1,0],
    [1,1]
];

const xorResults = [0,1,1,0]; //Results for each input, mapped by indices

new Network().train(xorInputs, xorResults);