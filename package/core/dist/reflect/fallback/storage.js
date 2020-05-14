"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateStorage = exports.getStorage = exports.createStorage = void 0;
var getOwnProperty_1 = require("../getOwnProperty");
/* istanbul ignore next */
var _storageKey = Symbol
    ? // Private symbol.
        Symbol.for('Decorize: Reflect')
    : // Namespaced key.
        '__decorize::reflect__';
/**
 * Create the storage and assign it directly to the object.
 *
 * @param target The object to which the storage should be assigned.
 * @return The storage is created and assigned to the object.
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
 * Get the storage which directly defined on the object.
 *
 * @param target The object from which to get the storage.
 * @return The storage; null in case non exist.
 */
function getStorage(target) {
    return getOwnProperty_1.getOwnProperty(target, _storageKey);
}
exports.getStorage = getStorage;
/**
 * Get or create the storage directly on the object.
 *
 * @param target The object from which to get the storage.
 * @return The storage defined at the object.
 */
function getOrCreateStorage(target) {
    var _a;
    return (_a = getStorage(target)) !== null && _a !== void 0 ? _a : createStorage(target);
}
exports.getOrCreateStorage = getOrCreateStorage;
//# sourceMappingURL=storage.js.map