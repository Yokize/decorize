"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var storage_1 = require("./storage");
function getFromStorage(key, target, property) {
    // Get existing storage from the object.
    var storage = storage_1.getStorage(target);
    // Get metadata from the storage.
    return isUndefined_1.default(property) ? storage.root[key] : storage.prop[property] && storage.prop[property][key];
}
exports.getFromStorage = getFromStorage;
//# sourceMappingURL=get.js.map