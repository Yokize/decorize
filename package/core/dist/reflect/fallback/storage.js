"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getOwnProperty_1 = require("../getOwnProperty");
/**
 * Unique storage key.
 */
/* istanbul ignore next */
var _storageKey = Symbol
    ? // Private symbol.
        Symbol.for('Decorize: Reflect')
    : // Namespaced key.
        '__decorize::reflect__';
/**
 * Create storage and assign it directly to the object.
 *
 * @param target Object to which assign storage.
 * @return Created and assigned storage.
 */
function createStorage(target) {
    // Newly created storage.
    var storage = { root: {}, prop: {} };
    // Define as non configurable internal property.
    Object.defineProperty(target, _storageKey, {
        value: storage
    });
    // Newly assigned storage.
    return storage;
}
exports.createStorage = createStorage;
/**
 * Get storage which directly defined on the object.
 *
 * @param target Object from which to get storage.
 * @return Storage; null in case non exist.
 */
function getStorage(target) {
    return getOwnProperty_1.getOwnProperty(target, _storageKey);
}
exports.getStorage = getStorage;
/**
 * Get or create storage directly on the object.
 *
 * @param target Object which contains storage.
 * @return Storage defined at the object.
 */
function getOrCreateStorage(target) {
    var _a;
    return (_a = getStorage(target)) !== null && _a !== void 0 ? _a : createStorage(target);
}
exports.getOrCreateStorage = getOrCreateStorage;
//# sourceMappingURL=storage.js.map