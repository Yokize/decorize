"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineInStorage = void 0;
var tslib_1 = require("tslib");
var isUndefined_1 = tslib_1.__importDefault(require("lodash/isUndefined"));
var storage_1 = require("./storage");
function defineInStorage(key, value, target, property) {
    var _a;
    // Create new or get the existing storage from the `target`.
    var storage = storage_1.getOrCreateStorage(target);
    // Determine where and how to store the value.
    isUndefined_1.default(property)
        ? (storage.root[key] = value)
        : isUndefined_1.default(storage.prop[property])
            ? (storage.prop[property] = (_a = {}, _a[key] = value, _a))
            : (storage.prop[property][key] = value);
}
exports.defineInStorage = defineInStorage;
//# sourceMappingURL=define.js.map