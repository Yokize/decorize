"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromStorage = void 0;
var tslib_1 = require("tslib");
var isUndefined_1 = tslib_1.__importDefault(require("lodash/isUndefined"));
var storage_1 = require("./storage");
function getFromStorage(key, target, property) {
    // Get the existing storage from the `target`.
    var storage = storage_1.getStorage(target);
    // Get the metadata from the storage.
    return isUndefined_1.default(property) ? storage.root[key] : storage.prop[property] && storage.prop[property][key];
}
exports.getFromStorage = getFromStorage;
//# sourceMappingURL=get.js.map