"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOriginallyProperty = void 0;
var getOriginalType_1 = require("./getOriginalType");
/**
 * Determine whether the property is originally described as simple property w/o value.
 * Decorator can change or define a completely new descriptor of the property
 * so in particular cases it is essential to determine the original type.
 * Logic working only with registered decorators.
 *
 * @param target The object which contains the property.
 * @param property The name of the property to check.
 * @return True/false in case originally described as method; undefined in case not
 * determined original type.
 */
function isOriginallyProperty(target, property) {
    // Original type must be property type.
    return getOriginalType_1.getOriginalType(target, property) === getOriginalType_1.OriginalType.Property;
}
exports.isOriginallyProperty = isOriginallyProperty;
//# sourceMappingURL=isOriginallyProperty.js.map