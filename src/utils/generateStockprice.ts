export const generateStockPrice = (name: string) => {
  const hash = name.split("").reduce(function (a: number, b: string) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  const amplitude = 100;
  const d = new Date();
  const n = d.getTime();
  return Math.abs(3 * Math.sin(2 * hash * n) + Math.random() * amplitude);
};
