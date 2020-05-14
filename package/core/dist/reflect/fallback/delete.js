"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromStorage = void 0;
var tslib_1 = require("tslib");
var isUndefined_1 = tslib_1.__importDefault(require("lodash/isUndefined"));
var deleteProperty_1 = require("../deleteProperty");
var storage_1 = require("./storage");
function deleteFromStorage(key, target, property) {
    // Get the existing storage from the `target`.
    var storage = storage_1.getStorage(target);
    // Delete the metadata from the storage.
    return isUndefined_1.default(property)
        ? deleteProperty_1.deleteProperty(storage.root, key)
        : !isUndefined_1.default(storage.prop[property]) && deleteProperty_1.deleteProperty(storage.prop[property], key);
}
exports.deleteFromStorage = deleteFromStorage;
//# sourceMappingURL=delete.js.map