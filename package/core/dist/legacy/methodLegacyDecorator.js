"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodLegacyDecorator = void 0;
var decorator_1 = require("../decorator");
var addProperty_1 = require("../registry/addProperty");
/**
 * Creates legacy method decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created method decorator.
 */
function methodLegacyDecorator(name, logic, metadata) {
    // Legacy method decorator.
    return function (target, property, descriptor) {
        // Register method decorator.
        addProperty_1.addProperty(target, property, {
            name: name,
            metadata: metadata,
            spec: 'legacy',
            type: decorator_1.Decorator.Method
        });
        // Execute decorator logic at runtime.
        return logic(target, property, descriptor, metadata);
    };
}
exports.methodLegacyDecorator = methodLegacyDecorator;
//# sourceMappingURL=methodLegacyDecorator.js.map