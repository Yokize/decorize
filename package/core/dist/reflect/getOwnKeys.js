"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnKeys = void 0;
var tslib_1 = require("tslib");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.ownKeys;
/**
 * Reflect already include extracting of own symbol keys from the object. The fallback
 * implementation behaves the same as Reflect and in case the Symbol is not supported
 * get only own string keys.
 */
var _getOwnKeys = (ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : Object.getOwnPropertySymbols) ? function getOwnKeysWithSymbolsFk(target) {
    if (isObject_1.default(target))
        return tslib_1.__spreadArrays(Object.getOwnPropertyNames(target), Object.getOwnPropertySymbols(target));
    else
        throw new TypeError('Own keys with symbols can be retrieved only from the object');
}
    : function getOwnKeysWithoutSymbolsFk(target) {
        if (isObject_1.default(target))
            return Object.getOwnPropertyNames(target);
        else
            throw new TypeError('Own keys without symbols can be retrieved only from the object');
    };
/**
 * Get the names and symbols of the `target` own properties.
 *
 * @param target The object from which to get own keys.
 * @return Names or symbols of the own properties of the object.
 * @throws TypeError in case of target type violation.
 */
function getOwnKeys(target) {
    return _getOwnKeys(target);
}
exports.getOwnKeys = getOwnKeys;
//# sourceMappingURL=getOwnKeys.js.map