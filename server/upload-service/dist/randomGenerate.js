"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
function random() {
    const subset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ123456789";
    const length = 5;
    let id = "";
    for (var i = 0; i < length; i++) {
        id += subset[Math.floor(Math.random() * length)];
    }
    return id;
}
exports.random = random;
