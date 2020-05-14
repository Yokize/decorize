"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasProperty = void 0;
var tslib_1 = require("tslib");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.has;
/**
 * Reflect works as a built-in operator `in`.
 */
var _hasProperty = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function hasPropertyFk(target, property) {
    if (isObject_1.default(target))
        return property in target;
    else
        throw new TypeError('Existence of the property can be checked only at the object');
};
/**
 * Determine whether the `target` or its prototype chain has the `property`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property to check.
 * @return True in case has the property; false otherwise.
 * @throws TypeError in case of target type violation.
 */
function hasProperty(target, property) {
    return _hasProperty(target, property);
}
exports.hasProperty = hasProperty;
//# sourceMappingURL=hasProperty.js.map