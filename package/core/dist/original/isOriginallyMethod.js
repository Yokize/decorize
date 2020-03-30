"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getOriginalType_1 = require("./getOriginalType");
/**
 * Determine whether the property is originally described as method.
 * Decorator can change or define a completely new descriptor of the property
 * so in particular cases it is essential to determine the original type.
 * Logic working only with registered decorators.
 *
 * @param target Object which contain property.
 * @param property Property name.
 * @return True/false in case originally described as method; undefined in case
 * not determined original type.
 */
function isOriginallyMethod(target, property) {
    // Original type must be method type.
    return getOriginalType_1.getOriginalType(target, property) === getOriginalType_1.OriginalType.Method;
}
exports.isOriginallyMethod = isOriginallyMethod;
//# sourceMappingURL=isOriginallyMethod.js.map