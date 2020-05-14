"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnMetadata = void 0;
var tslib_1 = require("tslib");
/// <reference types="reflect-metadata" />
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var hasOwnMetadata_1 = require("./hasOwnMetadata");
var get_1 = require("./fallback/get");
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getOwnMetadata;
/**
 * Reflect retrieves metadata by the key from the map, which relates to the `target`
 * or its `property`. The fallback implementation retrieves metadata from the private
 * storage, which defined directly on the `target`.
 */
var _getOwnMetadata = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function getOwnMetadataFk(key, target, property) {
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