class SigmoidHelper {
    static output(x) {
        return 1.0 / (1.0 + Math.exp(-x));
    }
    static derivative(x) {
        return x * (1 - x);
    }
}
