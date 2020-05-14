"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnProperty = void 0;
var tslib_1 = require("tslib");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
/**
 * Get the value under own `property` from the `target`.
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property used to look up.
 * @return The retrieved value; undefined otherwise.
 * @throws TypeError in case of target type violation.
 */
function getOwnProperty(target, property) {
    if (isObject_1.default(target))
        return Object.hasOwnProperty.call(target, property) ? target[property] : undefined;
    else
        throw new TypeError('Own property can be retrieved only from the object');
}
exports.getOwnProperty = getOwnProperty;
//# sourceMappingURL=getOwnProperty.js.map