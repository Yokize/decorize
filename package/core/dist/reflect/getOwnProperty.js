"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
/**
 * Get value under own property from the object.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find.
 * @return Retrieved property value; undefined otherwise.
 * @throws TypeError in case of non-object target.
 */
function getOwnProperty(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Get only in case it's defined directly on object.
        return Object.hasOwnProperty.call(target, property) ? target[property] : undefined;
    else
        throw new TypeError('Own property can be retrieved only from the object');
}
exports.getOwnProperty = getOwnProperty;
//# sourceMappingURL=getOwnProperty.js.map