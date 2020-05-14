"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnMetadata = void 0;
var tslib_1 = require("tslib");
/// <reference types="reflect-metadata" />
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var has_1 = require("./fallback/has");
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.hasOwnMetadata;
/**
 * Reflect checks the existence of the key at the map, which relates to the `target` or
 * its `property`. The fallback implementation checks whether the key is in the private
 * storage, which defined directly on the `target`. The fallback approach has limitations
 * to check metadata existence on a non-object `target`.
 */
var _hasOwnMetadata = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function hasOwnMetadataFk(key, target, property) {
    return isObject_1.default(target) ? has_1.hasInStorage(key, target, property) : false;
};
function hasOwnMetadata(key, target, property) {
    return _hasOwnMetadata(key, target, property);
}
exports.hasOwnMetadata = hasOwnMetadata;
//# sourceMappingURL=hasOwnMetadata.js.map