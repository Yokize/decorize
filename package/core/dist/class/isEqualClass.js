"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualClass = void 0;
var tslib_1 = require("tslib");
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
/**
 * Determine whether the classes or classes of instances are equal.
 *
 * @param class1 Class or instance to be checked.
 * @param class2 Class or instance to be checked.
 * @return True in case are equal; false otherwise.
 */
function isEqualClass(class1, class2) {
    return isFunction_1.default(class1)
        ? isFunction_1.default(class2)
            ? class1 === class2
            : class1 === class2.constructor
        : isFunction_1.default(class2)
            ? class1.constructor === class2
            : class1.constructor === class2.constructor;
}
exports.isEqualClass = isEqualClass;
//# sourceMappingURL=isEqualClass.js.map