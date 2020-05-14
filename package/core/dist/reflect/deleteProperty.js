"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = void 0;
var tslib_1 = require("tslib");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.deleteProperty;
/**
 * Reflect deletes the property from the `target` and behave identical to the
 * non-strict delete operator.
 */
var _deleteProperty = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function deletePropertyFk(target, property) {
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
 * Removes the given `property` from the `target`.
 *
 * @param target The object from which to delete the property.
 * @param property The name of the property to be deleted.
 * @return True in case operation is successful; false otherwise.
 * @throws TypeError in case of target type violation.
 */
function deleteProperty(target, property) {
    return _deleteProperty(target, property);
}
exports.deleteProperty = deleteProperty;
//# sourceMappingURL=deleteProperty.js.map