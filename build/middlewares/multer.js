"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMulter = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public/src/assets/multer");
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});
exports.uploadMulter = (0, multer_1.default)({ storage: storage });
