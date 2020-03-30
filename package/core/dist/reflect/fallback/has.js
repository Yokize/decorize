"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var storage_1 = require("./storage");
function hasInStorage(key, target, property) {
    // Get existing storage from the object.
    var storage = storage_1.getStorage(target);
    // Determine whenever metadata defined.
    return storage
        ? isUndefined_1.default(property)
            ? Object.hasOwnProperty.call(storage.root, key)
            : !isUndefined_1.default(storage.prop[property]) && Object.hasOwnProperty.call(storage.prop[property], key)
        : false;
}
exports.hasInStorage = hasInStorage;
//# sourceMappingURL=has.js.map