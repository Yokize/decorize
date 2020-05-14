"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = void 0;
var tslib_1 = require("tslib");
/// <reference types="reflect-metadata" />
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var hasOwnMetadata_1 = require("./hasOwnMetadata");
var proto_1 = require("./fallback/proto");
var get_1 = require("./fallback/get");
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getMetadata;
/**
 * Reflect retrieves metadata by the key from the map, which relates to the `target`
 * or its `property` with additional checking on the prototype chain. The fallback
 * implementation retrieves metadata from the private storage, which defined directly
 * on the `target` or its prototype chain. Reflect and Fallback is aligned to get
 * prototype chain in same way.
 */
var _getMetadata = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function getMetadataFk(key, target, property) {
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