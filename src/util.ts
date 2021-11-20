export const calculateXOffset = (
  entityAmount: number,
  entityWidth: number,
  width: number
): number => {
  return width / 2 - ((entityAmount - 1) * entityWidth) / 2;
};

export const calculateYOffset = (
  entityHeight: number,
  height: number
): number => {
  return height / 2 - entityHeight / 2;
};

export const getRandomUnsortedArray = (length: number) => {
  const sortedArray = Array(length)
    .fill(0)
    .map((_, index) => index + 1);
  const unsortedArray = sortedArray.reduce<number[]>((arr, number, i) => {
    const randomNewIndex = Math.floor(Math.random() * length);
    const temp = arr[randomNewIndex];
    arr[randomNewIndex] = number;
    arr[i] = temp;
    return arr;
  }, sortedArray);
  return unsortedArray;
};

export const timeout = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
