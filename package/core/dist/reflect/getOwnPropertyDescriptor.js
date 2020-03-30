"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getOwnPropertyDescriptor;
/**
 * Reflect and Object build-in function returns a descriptor of the given property
 * if it exists, undefined otherwise. Exceptional case is aligned and violation of
 * target type throws a TypeError.
 */
var _getOwnPropertyDescriptor = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function getOwnPropertyDescriptorFk(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Use built-in helper to get own property descriptor.
        return Object.getOwnPropertyDescriptor(target, property);
    else
        throw new TypeError('Property descriptor can be retrieved only from the object');
};
/**
 * Get own property descriptor of the object.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find and retrieve descriptor.
 * @return Descriptor for the property; undefined in case property not defined.
 * @throws TypeError in case of non-object target.
 */
function getOwnPropertyDescriptor(target, property) {
    return _getOwnPropertyDescriptor(target, property);
}
exports.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
//# sourceMappingURL=getOwnPropertyDescriptor.js.map