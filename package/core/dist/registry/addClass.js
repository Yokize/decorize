"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClass = void 0;
var setClassRegistry_1 = require("./setClassRegistry");
var getClassRegistry_1 = require("./getClassRegistry");
/**
 * Register the decorator in the class registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param entry Decorator metadata.
 */
function addClass(target, entry) {
    // Get the registry or create the new one.
    var registry = getClassRegistry_1.getOrCreateClassRegistry(target);
    // Add directly to the registry.
    registry.decorator.push(entry);
    // Link registry with the class (prototype).
    setClassRegistry_1.setClassRegistry(target, registry);
}
exports.addClass = addClass;
//# sourceMappingURL=addClass.js.map