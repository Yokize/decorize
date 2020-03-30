"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="reflect-metadata" />
var isObject_1 = __importDefault(require("lodash/isObject"));
var hasOwnMetadata_1 = require("./hasOwnMetadata");
var proto_1 = require("./fallback/proto");
var get_1 = require("./fallback/get");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getMetadata;
/**
 * Reflect retrieves metadata by key from map related to the object or property
 * with additional checking on prototype chain. Fallback get the metadata from
 * private storage defined directly on the object or its prototype chain. Reflect
 * and Fallback is aligned to get prototype chain in same way. Fallback approach
 * have limitation to check metadata existence on non-object target.
 */
var _getMetadata = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function getMetadataFk(key, target, property) {
    return isObject_1.default(target)
        ? hasOwnMetadata_1.hasOwnMetadata(key, target, property)
            ? get_1.getFromStorage(key, target, property)
            : _getMetadata(key, proto_1.getProtoOf(target), property)
        : undefined;
};
function getMetadata(key, target, property) {
    return _getMetadata(key, target, property);
}
exports.getMetadata = getMetadata;
//# sourceMappingURL=getMetadata.js.map