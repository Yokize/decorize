"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="reflect-metadata" />
var isObject_1 = __importDefault(require("lodash/isObject"));
var proto_1 = require("./fallback/proto");
var has_1 = require("./fallback/has");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.hasMetadata;
/**
 * Reflect check existence of a key at map related to object or property with
 * additional checking at prototype chain. Fallback check whether key is defined
 * in private storage directly on the object or its prototype chain. Reflect and
 * Fallback is aligned to get prototype chain in same way. Fallback approach have
 * limitation to check metadata existence on non-object target.
 */
var _hasMetadata = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function hasMetadataFk(key, target, property) {
    return isObject_1.default(target)
        ? has_1.hasInStorage(key, target, property) || _hasMetadata(key, proto_1.getProtoOf(target), property)
        : false;
};
function hasMetadata(key, target, property) {
    return _hasMetadata(key, target, property);
}
exports.hasMetadata = hasMetadata;
//# sourceMappingURL=hasMetadata.js.map