"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrototypeOf = void 0;
var tslib_1 = require("tslib");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var ReflectBuiltIn = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getPrototypeOf;
/**
 * Reflect and Object built-in function returns the prototype of the `target`
 * (value of the internal [[Prototype]]).
 */
var _getPrototypeOf = ReflectBuiltIn !== null && ReflectBuiltIn !== void 0 ? ReflectBuiltIn : function getPrototypeOfFk(target) {
    if (isObject_1.default(target))
        return Object.getPrototypeOf(target);
    else
        throw new TypeError('Prototype can be retrieved only from the object');
};
/**
 * Get the prototype of the `target`.
 *
 * @param target The object referring to the prototype.
 * @return Prototype; null in case of missing prototype.
 * @throws TypeError in case of target type violation.
 */
function getPrototypeOf(target) {
    return _getPrototypeOf(target);
}
exports.getPrototypeOf = getPrototypeOf;
//# sourceMappingURL=getPrototypeOf.js.map