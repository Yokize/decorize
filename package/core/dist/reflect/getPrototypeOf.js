"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.getPrototypeOf;
/**
 * Reflect and Object built-in function returns the prototype of the object
 * (value of the internal [[Prototype]]). Exceptional case is aligned and
 * violation of target type throws a TypeError.
 */
var _getPrototypeOf = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function getPrototypeOfFk(target) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Use built-in helper to get prototype.
        return Object.getPrototypeOf(target);
    else
        throw new TypeError('Prototype can be retrieved only from the object');
};
/**
 * Get the prototype of the object.
 *
 * @param target Object referring to the prototype.
 * @return Prototype; null in case of missing prototype.
 * @throws TypeError in case of non-object target.
 */
function getPrototypeOf(target) {
    return _getPrototypeOf(target);
}
exports.getPrototypeOf = getPrototypeOf;
//# sourceMappingURL=getPrototypeOf.js.map