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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileImage = exports.userData = exports.login = exports.register = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authModel_1 = __importDefault(require("../model/authModel"));
var dotenv_1 = __importDefault(require("dotenv"));
var cloudinary_config_1 = __importDefault(require("../middlewares/cloudinary.config"));
dotenv_1.default.config();
var maxAge = 3 * 24 * 60 * 60;
var createToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.SECT_CODE, {
        expiresIn: maxAge,
    });
};
var handleErrors = function (err) {
    var errors = {};
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered";
    }
    if (err.message === "incorrect password") {
        errors.password = "That password is incorrect";
    }
    if (err.code === 11000) {
        errors.email = "Email is already registered";
    }
    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(function (_a) {
            var properties = _a.properties;
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};
var handleLogin = function (user, res) {
    var token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
};
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, _b, userimage, user, err_1, errors;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password, username = _a.username, _b = _a.userimage, userimage = _b === void 0 ? "" : _b;
                return [4 /*yield*/, authModel_1.default.create({ email: email, password: password, username: username, userimage: userimage })];
            case 1:
                user = _c.sent();
                res.status(201).json({ user: user._id, created: true });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _c.sent();
                errors = handleErrors(err_1);
                res.json({ errors: errors, created: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, err_2, errors;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, authModel_1.default.login(email, password)];
            case 2:
                user = _b.sent();
                handleLogin(user, res);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                errors = handleErrors(err_2);
                res.json({ errors: errors, status: false });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var userData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, userData_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, authModel_1.default.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ error: "User not found" })];
                }
                userData_1 = [
                    {
                        _id: user._id,
                        email: user.email,
                        username: user.username,
                        userimage: user.userimage,
                    },
                ];
                res.send({ status: "ok", data: userData_1 });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching user data:", error_1);
                res.status(500).json({ status: "error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userData = userData;
var profileImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, result, imageUrl, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!req.file) {
                    return [2 /*return*/, res.status(400).json({ error: "No image provided" })];
                }
                return [4 /*yield*/, cloudinary_config_1.default.uploader.upload(req.file.path)];
            case 2:
                result = _a.sent();
                imageUrl = result.secure_url;
                return [4 /*yield*/, authModel_1.default.updateOne({ _id: userId }, { userimage: imageUrl })];
            case 3:
                _a.sent();
                res.json({ status: "ok" });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Image upload error:", error_2);
                res.status(500).json({ status: "error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.profileImage = profileImage;
