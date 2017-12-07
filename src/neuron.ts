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