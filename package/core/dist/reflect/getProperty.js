"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.get;
/**
 * Reflect function works like getting a property from the object.
 */
var _getProperty = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function getPropertyFk(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Get from object or prototype chain.
        return target[property];
    else
        throw new TypeError('Property can be retrieved only from the object');
};
/**
 * Get value under the property from the object or its prototype chain.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find.
 * @return Retrieved property value; undefined otherwise.
 */
function getProperty(target, property) {
    return _getProperty(target, property);
}
exports.getProperty = getProperty;
//# sourceMappingURL=getProperty.js.map