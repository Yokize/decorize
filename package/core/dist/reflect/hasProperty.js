"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.has;
/**
 * Reflect works like the built-in `in` operator. Exceptional case is
 * aligned and violation of target type throws a TypeError.
 */
var _hasProperty = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function hasPropertyFk(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Check on object or prototype chain.
        return property in target;
    else
        throw new TypeError('Existence of the property can be checked only on the object');
};
/**
 * Determine whether the object or its prototype chain has the property.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to check.
 * @return True in case has the property; false otherwise.
 */
function hasProperty(target, property) {
    return _hasProperty(target, property);
}
exports.hasProperty = hasProperty;
//# sourceMappingURL=hasProperty.js.map