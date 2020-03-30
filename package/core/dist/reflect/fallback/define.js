"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var storage_1 = require("./storage");
function defineInStorage(key, value, target, property) {
    var _a;
    // Create new or get existing storage from the target object.
    var storage = storage_1.getOrCreateStorage(target);
    // Determine where to store value.
    isUndefined_1.default(property)
        ? (storage.root[key] = value)
        : isUndefined_1.default(storage.prop[property])
            ? (storage.prop[property] = (_a = {}, _a[key] = value, _a))
            : (storage.prop[property][key] = value);
}
exports.defineInStorage = defineInStorage;
//# sourceMappingURL=define.js.map