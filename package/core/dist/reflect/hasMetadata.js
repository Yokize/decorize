"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMetadata = void 0;
var tslib_1 = require("tslib");
/// <reference types="reflect-metadata" />
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var proto_1 = require("./fallback/proto");
var has_1 = require("./fallback/has");
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.hasMetadata;
/**
 * Reflect checks the existence of the key at the map, which relates to the `target` or its
 * `property` with additional checking on the prototype chain. The fallback implementation
 * checks whether the key is in the private storage, which defined directly on the `target`
 * or its prototype chain. Reflect and Fallback is aligned to get prototype chain in same way.
 * The fallback approach has limitations to check metadata existence on a non-object `target`.
 */
var _hasMetadata = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function hasMetadataFk(key, target, property) {
    return isObject_1.default(target)
        ? has_1.hasInStorage(key, target, property) || _hasMetadata(key, proto_1.getProtoOf(target), property)
        : false;
};
function hasMetadata(key, target, property) {
    return _hasMetadata(key, target, property);
}
exports.hasMetadata = hasMetadata;
//# sourceMappingURL=hasMetadata.js.map