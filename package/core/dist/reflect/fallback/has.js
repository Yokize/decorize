"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInStorage = void 0;
var tslib_1 = require("tslib");
var isUndefined_1 = tslib_1.__importDefault(require("lodash/isUndefined"));
var storage_1 = require("./storage");
function hasInStorage(key, target, property) {
    // Get the existing storage from the `target`.
    var storage = storage_1.getStorage(target);
    // Determine whether the metadata is defined.
    return storage
        ? isUndefined_1.default(property)
            ? Object.hasOwnProperty.call(storage.root, key)
            : !isUndefined_1.default(storage.prop[property]) && Object.hasOwnProperty.call(storage.prop[property], key)
        : false;
}
exports.hasInStorage = hasInStorage;
//# sourceMappingURL=has.js.map