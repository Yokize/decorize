"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnProperty = void 0;
var tslib_1 = require("tslib");
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
/**
 * Determine whether the `target` has own `property` (opposed to inheriting it).
 *
 * @param target The object in which to look for the property.
 * @param property The name of the property to check.
 * @return True in case has own property; false otherwise.
 * @throws TypeError in case of target type violation.
 */
function hasOwnProperty(target, property) {
    if (isObject_1.default(target))
        return Object.hasOwnProperty.call(target, property);
    else
        throw new TypeError('Existence of the own property can be checked only at the object');
}
exports.hasOwnProperty = hasOwnProperty;
//# sourceMappingURL=hasOwnProperty.js.map