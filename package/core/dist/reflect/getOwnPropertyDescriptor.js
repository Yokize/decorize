"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnPropertyDescriptor = void 0;
var tslib_1 = require("tslib");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getOwnPropertyDescriptor;
/**
 * Reflect and Object build-in function returns a descriptor of the given `property`
 * if it exists, otherwise undefined.
 */
var _getOwnPropertyDescriptor = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function getOwnPropertyDescriptorFk(target, property) {
    if (isObject_1.default(target))
        return Object.getOwnPropertyDescriptor(target, property);
    else
        throw new TypeError('Property descriptor can be retrieved only from the object');
};
/**
 * Get own `property` descriptor from the `target`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to retrieve a descriptor.
 * @return Property descriptor; undefined in case the property not defined.
 * @throws TypeError in case of target type violation.
 */
function getOwnPropertyDescriptor(target, property) {
    return _getOwnPropertyDescriptor(target, property);
}
exports.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
//# sourceMappingURL=getOwnPropertyDescriptor.js.map