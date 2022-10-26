"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//for resizing an specific image ;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const fs_2 = __importDefault(require("fs"));
const resizing_image = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const image_Input = path_1.default.join(__dirname, '../', '../', 'assets/', 'up_images/', filename) +
        '.jpg';
    const image_Output_File = path_1.default.join(__dirname, '../', '../', 'assets/', 'result/');
    const image_Output = path_1.default.join(__dirname, '../', '../', 'assets/', 'result/', filename) +
        `-${width}-${height}.jpg`;
    if (!fs_2.default.existsSync(image_Output_File)) {
        yield fs_1.promises.mkdir(image_Output_File);
    }
    try {
        yield (0, sharp_1.default)(image_Input).resize(width, height).toFile(image_Output);
        return image_Output;
    }
    catch (error) {
        return error;
    }
});
exports.default = resizing_image;
