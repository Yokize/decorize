"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="reflect-metadata" />
var isObject_1 = __importDefault(require("lodash/isObject"));
var hasOwnMetadata_1 = require("./hasOwnMetadata");
var get_1 = require("./fallback/get");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getOwnMetadata;
/**
 * Reflect retrieves metadata by key from map related to the object or property.
 * Fallback get metadata from private storage defined directly at the object.
 * Fallback approach have limitation to get metadata from non-object target.
 */
var _getOwnMetadata = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function getOwnMetadataFk(key, target, property) {
    return isObject_1.default(target)
        ? hasOwnMetadata_1.hasOwnMetadata(key, target, property)
            ? get_1.getFromStorage(key, target, property)
            : undefined
        : undefined;
};
function getOwnMetadata(key, target, property) {
    return _getOwnMetadata(key, target, property);
}
exports.getOwnMetadata = getOwnMetadata;
//# sourceMappingURL=getOwnMetadata.js.map