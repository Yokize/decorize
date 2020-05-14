"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwUsageError = exports.uniqueId = void 0;
/**
 * Unique decorator ID.
 */
exports.uniqueId = 'decorize:cache:@clear';
/**
 * Throw error in case the decorator used incorrectly.
 */
function throwUsageError() {
    throw new Error(exports.uniqueId + " must be applied to method or accessor");
}
exports.throwUsageError = throwUsageError;
//# sourceMappingURL=clear.js.map