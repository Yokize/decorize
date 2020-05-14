"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccessorType = void 0;
var tslib_1 = require("tslib");
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
/**
 * Determine whether the descriptor contains at least one accessor.
 *
 * @param descriptor The descriptor to check.
 * @return True in case getter or setter is defined; false otherwise.
 */
function isAccessorType(descriptor) {
    return isFunction_1.default(descriptor === null || descriptor === void 0 ? void 0 : descriptor.get) || isFunction_1.default(descriptor === null || descriptor === void 0 ? void 0 : descriptor.set);
}
exports.isAccessorType = isAccessorType;
//# sourceMappingURL=isAccessorType.js.map