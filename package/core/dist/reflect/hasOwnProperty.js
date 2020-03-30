"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/**
 * Determine whether an object has own property (opposed to inheriting it).
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to check.
 * @return True in case has own property; false otherwise.
 */
function hasOwnProperty(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Check whether own property descriptor exist.
        return Object.hasOwnProperty.call(target, property);
    else
        throw new TypeError('Existence of the own property can be checked only on the object');
}
exports.hasOwnProperty = hasOwnProperty;
//# sourceMappingURL=hasOwnProperty.js.map