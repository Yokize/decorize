"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPropertyRegistry = void 0;
var setClassRegistry_1 = require("./setClassRegistry");
var getClassRegistry_1 = require("./getClassRegistry");
/**
 * Link the registry with the class (prototype) & property.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param registry Registry to link.
 */
function setPropertyRegistry(target, property, registry) {
    // Receive or create the registry associated with the class.
    var classRegistry = getClassRegistry_1.getOrCreateClassRegistry(target);
    // Assign the registry into the property section.
    classRegistry.property[property] = registry;
    // Link the registry with the class (prototype).
    setClassRegistry_1.setClassRegistry(target, classRegistry);
}
exports.setPropertyRegistry = setPropertyRegistry;
//# sourceMappingURL=setPropertyRegistry.js.map