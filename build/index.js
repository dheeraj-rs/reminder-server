"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var Routes_1 = __importDefault(require("./routes/Routes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGO_CONNECT, {})
    .then(function () {
    console.log("Db connection successful ⚡️");
})
    .catch(function (err) {
    console.error(err.message);
});
app.use((0, cors_1.default)({
    origin: process.env.LOCAL_HOST,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/", Routes_1.default);
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server listening on Port: ".concat(port));
});
