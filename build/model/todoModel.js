"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TaskItems = new mongoose_1.Schema({
    date: {
        type: Number,
    },
    title: {
        type: String,
    },
    time: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
    details: {
        type: [String],
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    personal: {
        type: Boolean,
        default: false,
    },
});
var TaskSchema = new mongoose_1.Schema({
    userid: String,
    todos: [TaskItems],
});
exports.default = (0, mongoose_1.model)("Tasks", TaskSchema);
