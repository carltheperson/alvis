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

const getVectorLength = ({ x, y }: { x: number; y: number }) => {
  return Math.sqrt(x * x + y * y);
};

export const convertVectorToUnitVector = (vec: { x: number; y: number }) => {
  const length = getVectorLength(vec);
  return {
    x: vec.x / length,
    y: vec.y / length,
  };
};

export const convertVectorToRadians = (vec: { x: number; y: number }) => {
  return Math.atan2(vec.x, vec.y);
};

export const rotate = (
  cx: number,
  cy: number,
  x: number,
  y: number,
  radians: number
) => {
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = cos * (x - cx) + sin * (y - cy) + cx;
  const ny = cos * (y - cy) - sin * (x - cx) + cy;
  return { x: nx, y: ny };
};

export const getDistanceBetweenPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  return Math.hypot(x2 - x1, y2 - y1);
};

export const addTitle = (text: string) => {
  const title = document.createElement("h1");
  title.innerText = text;
  document.body.appendChild(title);
};

export const addSmallTitle = (text: string, div: HTMLDivElement) => {
  const title = document.createElement("h2");
  title.innerText = text;
  div.appendChild(title);
};

export const addWhitespace = (div: HTMLDivElement, height: number) => {
  const newDiv = document.createElement("div");
  newDiv.style.height = height + "px";
  div.appendChild(newDiv);
};

/** Used to give an algorithm two views */
export const setUpSwitchButton = (
  container: HTMLDivElement,
  secondContainer: HTMLDivElement,
  switchHandler: (on: boolean) => void
) => {
  const button = document.createElement("button");
  button.innerText = "Switch";
  button.style.opacity = "0.5";
  container.appendChild(button);

  container.appendChild(secondContainer);

  let on = false;

  const switchWrapper = () => {
    secondContainer.innerHTML = "";
    switchHandler(on);
    on = !on;
  };

  button.addEventListener("click", switchWrapper);

  switchWrapper();
};

export const getAlgorithmKeyFromUrl = (): string | null => {
  return location.search.split("a=")[1] ?? null;
};

export const setAlgorithmKeyInUrl = (key: string) => {
  window.history.replaceState(null, null as any, "?a=" + key);
};
