"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyLegacyDecorator = void 0;
var decorator_1 = require("../decorator");
var addProperty_1 = require("../registry/addProperty");
/**
 * Creates legacy property decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created property decorator.
 */
function propertyLegacyDecorator(name, logic, metadata) {
    // Legacy property decorator.
    return function (target, property) {
        // Register property decorator.
        addProperty_1.addProperty(target, property, {
            name: name,
            metadata: metadata,
            spec: 'legacy',
            type: decorator_1.Decorator.Property
        });
        // Execute decorator logic at runtime.
        logic(target, property, metadata);
    };
}
exports.propertyLegacyDecorator = propertyLegacyDecorator;
//# sourceMappingURL=propertyLegacyDecorator.js.map