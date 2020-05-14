"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateClassRegistry = exports.getClassRegistry = void 0;
var getOwnMetadata_1 = require("../reflect/getOwnMetadata");
var baseRegistry_1 = require("./baseRegistry");
/**
 * Get the registry associated with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Registry in case it's defined; undefined otherwise.
 */
function getClassRegistry(target) {
    return getOwnMetadata_1.getOwnMetadata(baseRegistry_1._registryKey, target);
}
exports.getClassRegistry = getClassRegistry;
/**
 * Get or create the registry associated with the class (prototype).
 *
 * @param target Class (prototype).
 * @return Existing or newly created registry.
 */
function getOrCreateClassRegistry(target) {
    var _a;
    return (_a = getClassRegistry(target)) !== null && _a !== void 0 ? _a : { decorator: [], property: {} };
}
exports.getOrCreateClassRegistry = getOrCreateClassRegistry;
//# sourceMappingURL=getClassRegistry.js.map