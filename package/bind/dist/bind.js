"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwUsageError = exports.uniqueId = void 0;
/**
 * Unique decorator ID.
 */
exports.uniqueId = 'decorize:@bind';
/**
 * Throw error in case the decorator used incorrectly.
 */
function throwUsageError() {
    throw new Error(exports.uniqueId + " must be applied to the class or method");
}
exports.throwUsageError = throwUsageError;
//# sourceMappingURL=bind.js.map