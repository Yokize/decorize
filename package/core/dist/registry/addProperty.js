"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProperty = void 0;
var setPropertyRegistry_1 = require("./setPropertyRegistry");
var getPropertyRegistry_1 = require("./getPropertyRegistry");
/**
 * Register the decorator in the property registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param entry Decorator metadata.
 */
function addProperty(target, property, entry) {
    // Get the registry or create the new one.
    var registry = getPropertyRegistry_1.getOrCreatePropertyRegistry(target, property);
    // Add directly to the registry.
    registry.decorator.push(entry);
    // Link registry with the class (prototype) & property.
    setPropertyRegistry_1.setPropertyRegistry(target, property, registry);
}
exports.addProperty = addProperty;
//# sourceMappingURL=addProperty.js.map