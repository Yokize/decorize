"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="reflect-metadata" />
var isObject_1 = __importDefault(require("lodash/isObject"));
var hasOwnMetadata_1 = require("./hasOwnMetadata");
var delete_1 = require("./fallback/delete");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.deleteMetadata;
/**
 * Reflect and Fallback removes corresponding metadata by specified key and return
 * status whether metadata have been found and successfully removed. Reflect removes
 * metadata from map defined for an object or property. Fallback removes metadata
 * from the storage defined on the object. Fallback approach have limitation to
 * delete metadata from non-object target.
 */
var _deleteMetadata = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function deleteMetadataFk(key, target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Delete metadata associated with target or property.
        return hasOwnMetadata_1.hasOwnMetadata(key, target, property) ? delete_1.deleteFromStorage(key, target, property) : false;
    else
        throw new TypeError('Metadata can be deleted only from the object');
};
function deleteMetadata(key, target, property) {
    return _deleteMetadata(key, target, property);
}
exports.deleteMetadata = deleteMetadata;
//# sourceMappingURL=deleteMetadata.js.map