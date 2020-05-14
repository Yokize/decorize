"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineMetadata = void 0;
var tslib_1 = require("tslib");
/// <reference types="reflect-metadata" />
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var define_1 = require("./fallback/define");
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.defineMetadata;
/**
 * The implementation of Reflect and Fallback differs in the way metadata is
 * stored. Reflect creates a separate map for each `target` and its `property`,
 * which stores the keys and corresponding metadata. The fallback implementation
 * stores metadata directly on the `target` under a special non-configurable
 * property.
 */
var _defineMetadata = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function defineMetadataFk(key, value, target, property) {
    if (isObject_1.default(target))
        define_1.defineInStorage(key, value, target, property);
    else
        throw new TypeError('Metadata can only be defined on the object');
};
function defineMetadata(key, value, target, property) {
    _defineMetadata(key, value, target, property);
}
exports.defineMetadata = defineMetadata;
//# sourceMappingURL=defineMetadata.js.map