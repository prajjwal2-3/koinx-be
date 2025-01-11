export function getStandardDeviation(priceArr: number[]): number {

    const mean = priceArr.reduce((acc, curr) => acc + curr, 0) / priceArr.length;

    const squaredDeviations = priceArr.map(price => (price - mean) ** 2);

    const variance = squaredDeviations.reduce((acc, curr) => acc + curr, 0) / priceArr.length;

    return Math.sqrt(variance);
}
