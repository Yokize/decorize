"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.defineProperty;
/**
 * Reflect and Object built-in is differ in return value of operation. Object
 * built-in function returns the target object when its successful, otherwise
 * it throws a TypeError. Reflect returns the operation status. Fallback is
 * aligned to return boolean, which determine whether the execution is successful.
 * Exceptional case is aligned and violation of target type throws a TypeError.
 */
var _defineProperty = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function definePropertyFk(target, property, descriptor) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        try {
            Object.defineProperty(target, property, descriptor);
            return true;
        }
        catch (_a) {
            return false;
        }
    else
        throw new TypeError('Property can be defined only on the object');
};
/**
 * Add property to an object or change the attributes of existing property.
 *
 * @param target Object in which to add or modify the property.
 * @param property Name of the property to be added or modified.
 * @param descriptor Descriptor for the property.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of non-object target.
 */
function defineProperty(target, property, descriptor) {
    return _defineProperty(target, property, descriptor);
}
exports.defineProperty = defineProperty;
//# sourceMappingURL=defineProperty.js.map