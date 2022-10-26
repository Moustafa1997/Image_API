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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const image_resizing_1 = __importDefault(require("../utilities/image_resizing"));
const checkParameters_1 = require("../utilities/checkParameters");
const routes = express_1.default.Router();
routes.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, checkParameters_1.checkParameters)(req.query)) {
        const filename = req.query.filename;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        const image_resized = path_1.default.join(__dirname, '../', '../', 'assets/', 'result/', filename) +
            `-${width}-${height}.jpg`;
        if (fs_1.default.existsSync(image_resized)) {
            res.sendFile(image_resized);
        }
        else {
            const imageProcessed = yield (0, image_resizing_1.default)(filename, width, height);
            if (!String(imageProcessed).includes('Error')) {
                res.sendFile(imageProcessed);
            }
            else {
                res
                    .status(404)
                    .send('There is no such file name on the server,try again.');
            }
        }
    }
    else {
        res
            .status(500)
            .send('Please set a filename as string, width and height as a number parameters in the url .');
    }
}));
exports.default = routes;
