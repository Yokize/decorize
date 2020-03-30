"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.ownKeys;
/**
 * Reflect already include extracting of own symbol keys from the object. Fallback
 * behave the same as Reflect and in case the Symbol is not supported get only own
 * string keys. Exceptional case is aligned and violation of target type throws
 * a TypeError.
 */
var _getOwnKeys = (builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : Object.getOwnPropertySymbols) ? function getOwnKeysWithSymbolsFk(target) {
    if (isObject_1.default(target))
        // Use built-in helpers to get own properties and symbols.
        return __spreadArrays(Object.getOwnPropertyNames(target), Object.getOwnPropertySymbols(target));
    else
        throw new TypeError('Own keys with symbols can be retrieved only from the object');
}
    : function getOwnKeysWithoutSymbolsFk(target) {
        if (isObject_1.default(target))
            // Use built-in helper to get own properties.
            return Object.getOwnPropertyNames(target);
        else
            throw new TypeError('Own keys without symbols can be retrieved only from the object');
    };
/**
 * Get the names and symbols of the object's own properties.
 *
 * @param target Object from which to get own keys.
 * @return Names or symbols of the own properties of an object.
 * @throws TypeError in case of non-object target.
 */
function getOwnKeys(target) {
    return _getOwnKeys(target);
}
exports.getOwnKeys = getOwnKeys;
//# sourceMappingURL=getOwnKeys.js.map