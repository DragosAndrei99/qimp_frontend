export const isPowerOf2 = (n) => {
  return n > 0 && (n & (n - 1)) === 0;
};
