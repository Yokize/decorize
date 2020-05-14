"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateParamRegistry = exports.getParamRegistry = void 0;
var getPropertyRegistry_1 = require("./getPropertyRegistry");
/**
 * Get the registry associated with the (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Registry in case it's defined; undefined otherwise.
 */
function getParamRegistry(target, method, paramIdx) {
    var _a;
    // Retrieve from the parameter registry in case it exists.
    return (_a = getPropertyRegistry_1.getPropertyRegistry(target, method)) === null || _a === void 0 ? void 0 : _a.parameter[paramIdx];
}
exports.getParamRegistry = getParamRegistry;
/**
 * Get or create the registry associated with the class (prototype), method & parameter.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @return Existing or newly created registry.
 */
function getOrCreateParamRegistry(target, method, paramIdx) {
    var _a;
    return (_a = getParamRegistry(target, method, paramIdx)) !== null && _a !== void 0 ? _a : { decorator: [] };
}
exports.getOrCreateParamRegistry = getOrCreateParamRegistry;
//# sourceMappingURL=getParamRegistry.js.map