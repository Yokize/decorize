"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwUsageError = exports.checkExpiration = exports.uniqueId = void 0;
var tslib_1 = require("tslib");
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
var global_1 = require("./global");
/**
 * Unique decorator ID.
 */
exports.uniqueId = 'decorize:@cache';
/**
 * Check the expiration of the cache entry by comparing max age against
 * current date or executing manual expire logic. In case entry is expired
 * its directly removed from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param cacheKey Cache key.
 * @param cacheConfig Cache config.
 */
function checkExpiration(target, property, cacheKey, cacheConfig) {
    // In case maxAge is specified, the expiration must be checked.
    if ((cacheConfig === null || cacheConfig === void 0 ? void 0 : cacheConfig.maxAge) >= 0 && global_1.Global.has(target, property, cacheKey))
        if (global_1.Global.get(target, property, cacheKey).timestamp + cacheConfig.maxAge <= Date.now())
            global_1.Global.remove(target, property, cacheKey);
    // In case manual logic is specified, the expiration must be checked.
    if (isFunction_1.default(cacheConfig === null || cacheConfig === void 0 ? void 0 : cacheConfig.expire) && global_1.Global.has(target, property, cacheKey))
        if (cacheConfig.expire.call(target, global_1.Global.get(target, property, cacheKey), target))
            global_1.Global.remove(target, property, cacheKey);
}
exports.checkExpiration = checkExpiration;
/**
 * Throw error in case the decorator used incorrectly.
 */
function throwUsageError() {
    throw new Error(exports.uniqueId + " must be applied to method or getter");
}
exports.throwUsageError = throwUsageError;
//# sourceMappingURL=cache.js.map