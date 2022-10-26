"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParameters = void 0;
//to check params send to url
const check_item = (arr1, items) => {
    return arr1.every((t) => items.indexOf(t) !== -1);
};
const ArrOfNumbers = (arr2) => {
    return arr2.every((t) => Number.isInteger(t));
};
const checkParameters = (x) => {
    const params = ['filename', 'width', 'height'];
    const paramsKeys = Object.keys(x);
    const shape = [Number(x.height), Number(x.width)];
    return check_item(params, paramsKeys) && ArrOfNumbers(shape);
};
exports.checkParameters = checkParameters;
