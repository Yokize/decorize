"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="reflect-metadata" />
var isObject_1 = __importDefault(require("lodash/isObject"));
var has_1 = require("./fallback/has");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.hasOwnMetadata;
/**
 * Reflect check existence of key at map related to object and property. Fallback
 * is checking whether the key is defined at private storage directly on the object.
 * Fallback approach have limitation to check metadata existence on non-object target.
 */
var _hasOwnMetadata = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function hasOwnMetadataFk(key, target, property) {
    return isObject_1.default(target) ? has_1.hasInStorage(key, target, property) : false;
};
function hasOwnMetadata(key, target, property) {
    return _hasOwnMetadata(key, target, property);
}
exports.hasOwnMetadata = hasOwnMetadata;
//# sourceMappingURL=hasOwnMetadata.js.map