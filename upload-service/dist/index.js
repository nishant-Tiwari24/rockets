"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const randomGenerate_1 = require("./randomGenerate");
const simple_git_1 = __importDefault(require("simple-git"));
const app = (0, express_1.default)();
app.post("/send-url", (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = (0, randomGenerate_1.random)();
    const git = (0, simple_git_1.default)();
    git.clone(repoUrl, `output${id}`);
    res.json({ generated: id });
});
app.listen(5500, () => {
    console.log("App is running at 5500");
});
