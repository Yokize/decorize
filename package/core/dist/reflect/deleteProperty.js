"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.deleteProperty;
/**
 * Reflect deletes the property from the object and behave identical to
 * non-strict delete operator. Exceptional case is aligned and violation
 * of target type throws a TypeError.
 */
var _deleteProperty = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function deletePropertyFk(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        try {
            return Object.hasOwnProperty.call(target, property) ? delete target[property] : false;
        }
        catch (_a) {
            return false;
        }
    else
        throw new TypeError('Property can be deleted only from the object');
};
/**
 * Removes a given property from an object.
 *
 * @param target Object from which to delete the property.
 * @param property Name of the property to be deleted.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of non-object target.
 */
function deleteProperty(target, property) {
    return _deleteProperty(target, property);
}
exports.deleteProperty = deleteProperty;
//# sourceMappingURL=deleteProperty.js.map