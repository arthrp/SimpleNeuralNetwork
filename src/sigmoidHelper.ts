class SigmoidHelper {
    public static output(x: number): number {
        return 1.0 / (1.0 + Math.exp(-x));
    }

    public static derivative(x: number): number {
        return x * (1 - x);
    }
}