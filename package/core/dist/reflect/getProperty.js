"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = void 0;
var tslib_1 = require("tslib");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.get;
/**
 * Reflect function works the same as directly accessing the `property`
 * from the `target`.
 */
var _getProperty = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function getPropertyFk(target, property) {
    if (isObject_1.default(target))
        return target[property];
    else
        throw new TypeError('Property can be retrieved only from the object');
};
/**
 * Get the value under the `property` from the `target` or its prototype chain.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to look up.
 * @return The retrieved value; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
function getProperty(target, property) {
    return _getProperty(target, property);
}
exports.getProperty = getProperty;
//# sourceMappingURL=getProperty.js.map