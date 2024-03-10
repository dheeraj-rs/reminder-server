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
exports.updateData = exports.deleteData = exports.updatePinned = exports.listData = exports.addData = void 0;
var todoModel_1 = __importDefault(require("../model/todoModel"));
var addData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, date, title, time, startTime, endTime, icon, color, details, pinned, personal, userid, newTodo, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body.newTask, date = _a.date, title = _a.title, time = _a.time, startTime = _a.startTime, endTime = _a.endTime, icon = _a.icon, color = _a.color, details = _a.details, pinned = _a.pinned, personal = _a.personal, userid = _a.userid;
                return [4 /*yield*/, todoModel_1.default.findOne({ userid: userid })];
            case 1:
                newTodo = _b.sent();
                if (!newTodo) {
                    newTodo = new todoModel_1.default({
                        userid: userid,
                        todos: [
                            {
                                date: date,
                                title: title,
                                time: time,
                                startTime: startTime,
                                endTime: endTime,
                                icon: icon,
                                color: color,
                                details: details,
                                pinned: pinned,
                                personal: personal,
                            },
                        ],
                    });
                }
                else {
                    newTodo.todos.push({
                        date: date,
                        title: title,
                        time: time,
                        startTime: startTime,
                        endTime: endTime,
                        icon: icon,
                        color: color,
                        details: details,
                        pinned: pinned,
                        personal: personal,
                        userid: "",
                    });
                }
                return [4 /*yield*/, newTodo.save()];
            case 2:
                _b.sent();
                res.status(201).json({ status: true, newTodo: newTodo });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ error: "An error occurred." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addData = addData;
var listData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, existingTodo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userid = req.query.userid;
                return [4 /*yield*/, todoModel_1.default.findOne({ userid: userid })];
            case 1:
                existingTodo = _a.sent();
                if (!existingTodo) {
                    res.status(404).json({ status: false, message: "User not found" });
                    return [2 /*return*/];
                }
                res.status(200).json({ status: true, todos: existingTodo.todos });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: "An error occurred." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listData = listData;
var updatePinned = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, pinned, updatedTask, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.id;
                pinned = req.body.pinned;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, todoModel_1.default.findOneAndUpdate({ "todos._id": taskId }, // Match by the nested task _id field
                    { $set: { "todos.$.pinned": pinned } }, // Update pinned status in the nested array
                    { new: true })];
            case 2:
                updatedTask = _a.sent();
                if (!updatedTask) {
                    return [2 /*return*/, res.status(404).json({ message: "Task not found" })];
                }
                // Send the updated task as a response
                res.status(200).json(updatedTask);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error updating pinned status:", error_3);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePinned = updatePinned;
var deleteData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, updatedTodo, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, todoModel_1.default.findOneAndUpdate({ "todos._id": taskId }, { $pull: { todos: { _id: taskId } } }, { new: true })];
            case 2:
                updatedTodo = _a.sent();
                if (!updatedTodo) {
                    res.status(404).json({ message: "Task not found" });
                }
                res.status(200).json(updatedTodo);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error deleting task:", error_4);
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteData = deleteData;
var updateData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, updatedTasks, updatedTask, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.id;
                updatedTasks = req.body.updatedTask;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, todoModel_1.default.findOneAndUpdate({ "todos._id": taskId }, { $set: { "todos.$": updatedTasks } }, { new: true })];
            case 2:
                updatedTask = _a.sent();
                // console.log(updatedTask);
                if (!updatedTask) {
                    res.status(404).json({ message: "Task not found" });
                }
                res.status(200).json({ status: true, updatedTask: updatedTask });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error("Error updating task:", error_5);
                res.status(500).json({ error: "An error occurred." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateData = updateData;
