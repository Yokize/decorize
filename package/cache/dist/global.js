"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global = void 0;
var tslib_1 = require("tslib");
var isNil_1 = tslib_1.__importDefault(require("lodash/isNil"));
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var defineMetadata_1 = require("@decorize/core/reflect/defineMetadata");
var getOwnMetadata_1 = require("@decorize/core/reflect/getOwnMetadata");
var hasOwnProperty_1 = require("@decorize/core/reflect/hasOwnProperty");
var getOwnProperty_1 = require("@decorize/core/reflect/getOwnProperty");
var deleteMetadata_1 = require("@decorize/core/reflect/deleteMetadata");
var deleteProperty_1 = require("@decorize/core/reflect/deleteProperty");
var resolver_1 = require("./resolver");
/* istanbul ignore next */
var _globalKey = Symbol
    ? // Private symbol.
        Symbol.for('Decorize: Cache')
    : // Namespaced key.
        '__decorize::cache__';
/**
 * Determine whether there's an entry in the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key The key used to store and retrieve the entry.
 * @return True in case the entry is stored; false otherwise.
 */
function has(target, property, key) {
    // Get the cache that's associated with the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Ensure the cache exist and has the entry associated with the key.
    return isObject_1.default(cache === null || cache === void 0 ? void 0 : cache[property]) ? hasOwnProperty_1.hasOwnProperty(cache[property], key) : false;
}
/**
 * Get the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key The key used to retrieve the entry.
 * @return Stored entry; undefined otherwise.
 */
function get(target, property, key) {
    // Get the cache that's associated with the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Ensure the cache exist and retrieve the entry associated with the key.
    return isObject_1.default(cache === null || cache === void 0 ? void 0 : cache[property]) ? getOwnProperty_1.getOwnProperty(cache[property], key) : undefined;
}
/**
 * Set the entry to the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key The key used to store entry.
 * @param entry Entry to be added to cache.
 */
function set(target, property, key, entry) {
    // Get the cache that's associated with the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Defaulting general cache.
    if (isNil_1.default(cache))
        cache = {};
    // Defaulting property cache.
    if (isNil_1.default(cache[property]))
        cache[property] = {};
    // Assign the entry under the key.
    cache[property][key] = entry;
    // Link the cache to the target.
    defineMetadata_1.defineMetadata(_globalKey, cache, target);
}
/**
 * Remove the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key The key used to retrieve the entry.
 */
function remove(target, property, key) {
    // Get the cache that's associated with the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Ensure the cache exist and remove the entry associated with the key.
    if (isObject_1.default(cache === null || cache === void 0 ? void 0 : cache[property]))
        deleteProperty_1.deleteProperty(cache[property], key);
}
/**
 * Clear the whole or property cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 */
function clear(target, property) {
    // Get the cache that's associated with the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Remove the cache in case it's exists.
    isNil_1.default(property)
        ? // Remove the whole cache.
            deleteMetadata_1.deleteMetadata(_globalKey, target)
        : // Remove the property cache.
            isObject_1.default(cache === null || cache === void 0 ? void 0 : cache[property]) && deleteProperty_1.deleteProperty(cache, property);
}
/**
 * The exposed and overridable helpers used by `@cache` and `@cacheClear`
 * decorators to manage cache.
 */
exports.Global = { resolver: resolver_1.resolver, has: has, get: get, set: set, remove: remove, clear: clear };
//# sourceMappingURL=global.js.map