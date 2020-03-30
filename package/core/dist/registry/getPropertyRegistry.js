"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getClassRegistry_1 = require("./getClassRegistry");
/**
 * Get registry linked with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Registry in case is defined; undefined otherwise.
 */
function getPropertyRegistry(target, property) {
    var _a;
    // Retrieve from the property registry in case it's exist.
    return (_a = getClassRegistry_1.getClassRegistry(target)) === null || _a === void 0 ? void 0 : _a.property[property];
}
exports.getPropertyRegistry = getPropertyRegistry;
/**
 * Get or create registry linked with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @return Existing or newly created registry.
 */
function getOrCreatePropertyRegistry(target, property) {
    var _a;
    return (_a = getPropertyRegistry(target, property)) !== null && _a !== void 0 ? _a : { decorator: [], parameter: {} };
}
exports.getOrCreatePropertyRegistry = getOrCreatePropertyRegistry;
//# sourceMappingURL=getPropertyRegistry.js.map