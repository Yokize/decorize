"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var deleteProperty_1 = require("../deleteProperty");
var storage_1 = require("./storage");
function deleteFromStorage(key, target, property) {
    // Get existing storage from the object.
    var storage = storage_1.getStorage(target);
    // Delete the metadata from the storage.
    return isUndefined_1.default(property)
        ? deleteProperty_1.deleteProperty(storage.root, key)
        : !isUndefined_1.default(storage.prop[property]) && deleteProperty_1.deleteProperty(storage.prop[property], key);
}
exports.deleteFromStorage = deleteFromStorage;
//# sourceMappingURL=delete.js.map