"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setParamRegistry = void 0;
var setPropertyRegistry_1 = require("./setPropertyRegistry");
var getPropertyRegistry_1 = require("./getPropertyRegistry");
/**
 * Link the registry with the class (prototype), method & param.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @param registry Registry to link.
 */
function setParamRegistry(target, method, paramIdx, registry) {
    // Receive or create the registry associated with the method.
    var propertyRegistry = getPropertyRegistry_1.getOrCreatePropertyRegistry(target, method);
    // Assign the registry into the parameter section.
    propertyRegistry.parameter[paramIdx] = registry;
    // Link the registry with the class (prototype) and method.
    setPropertyRegistry_1.setPropertyRegistry(target, method, propertyRegistry);
}
exports.setParamRegistry = setParamRegistry;
//# sourceMappingURL=setParamRegistry.js.map