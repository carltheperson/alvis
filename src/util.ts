export const combine = <T, D>(first: T, second: D): T & D => {
  const comb = { ...first, ...second };
  const secondKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(second));
  const firstKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(first));
  firstKeys.forEach((key) => {
    if (secondKeys.includes(key)) {
      Object.defineProperty(comb, key, {
        value: (...params: unknown[]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const firstFunc = (first as unknown as Record<string, any>)[key];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const secondFunc = (second as unknown as Record<string, any>)[key];
          firstFunc(...params);
          secondFunc(...params);
        },
      });
    }
  });
  return comb;
};

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
