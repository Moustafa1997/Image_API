//to check params send to url
const check_item = (arr1: unknown[], items: unknown[]): boolean => {
  return arr1.every((t) => items.indexOf(t) !== -1);
};

const ArrOfNumbers = (arr2: unknown[]): boolean => {
  return arr2.every((t) => Number.isInteger(t));
};

interface ParamsInfo {
  filename: string;
  width: number;
  height: number;
}

const checkParameters = (x: ParamsInfo): boolean => {
  const params: string[] = ['filename', 'width', 'height'];
  const paramsKeys: string[] = Object.keys(x);
  const shape: number[] = [Number(x.height), Number(x.width)];

  return check_item(params, paramsKeys) && ArrOfNumbers(shape);
};

export { checkParameters, ParamsInfo };
