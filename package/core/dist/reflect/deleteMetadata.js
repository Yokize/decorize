"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMetadata = void 0;
var tslib_1 = require("tslib");
/// <reference types="reflect-metadata" />
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var hasOwnMetadata_1 = require("./hasOwnMetadata");
var delete_1 = require("./fallback/delete");
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.deleteMetadata;
/**
 * Reflect and Fallback removes corresponding metadata by the specified key and return
 * status whether metadata have been found and successfully removed. Reflect removes
 * metadata from the map, which relates to the `target` or its `property`. The fallback
 * implementation removes metadata from the private storage, which defined directly on
 * the `target`.
 */
var _deleteMetadata = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function deleteMetadataFk(key, target, property) {
    if (isObject_1.default(target))
        return hasOwnMetadata_1.hasOwnMetadata(key, target, property) ? delete_1.deleteFromStorage(key, target, property) : false;
    else
        throw new TypeError('Metadata can be deleted only from the object');
};
function deleteMetadata(key, target, property) {
    return _deleteMetadata(key, target, property);
}
exports.deleteMetadata = deleteMetadata;
//# sourceMappingURL=deleteMetadata.js.map