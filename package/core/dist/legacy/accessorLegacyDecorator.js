"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessorLegacyDecorator = void 0;
var decorator_1 = require("../decorator");
var addProperty_1 = require("../registry/addProperty");
/**
 * Creates legacy accessor decorator that executes logic at runtime.
 * There is no separate type for accessor decorator in lib.es5.d.ts
 * so used MethodDecorator as it's have same signature.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created accessor decorator.
 */
function accessorLegacyDecorator(name, logic, metadata) {
    // Legacy accessor decorator.
    return function (target, property, descriptor) {
        // Register accessor decorator.
        addProperty_1.addProperty(target, property, {
            name: name,
            metadata: metadata,
            spec: 'legacy',
            type: decorator_1.Decorator.Accessor
        });
        // Execute decorator logic at runtime.
        return logic(target, property, descriptor, metadata);
    };
}
exports.accessorLegacyDecorator = accessorLegacyDecorator;
//# sourceMappingURL=accessorLegacyDecorator.js.map