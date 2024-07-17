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
const randomGenerate_1 = require("./randomGenerate");
const simple_git_1 = __importDefault(require("simple-git"));
const getAllfiles_1 = require("./getAllfiles");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/send-url", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    console.log("Request Body:", req.body);
    const id = (0, randomGenerate_1.random)();
    const git = (0, simple_git_1.default)();
    const outputPath = path_1.default.join(__dirname, `output/${id}`);
    yield git.clone(repoUrl, outputPath);
    const files = (0, getAllfiles_1.getAllFiles)(outputPath);
    res.json({ generated: id, files });
}));
app.listen(5500, () => {
    console.log("App is running at 5500");
});
