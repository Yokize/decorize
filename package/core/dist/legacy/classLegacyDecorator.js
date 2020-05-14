"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classLegacyDecorator = void 0;
var decorator_1 = require("../decorator");
var addClass_1 = require("../registry/addClass");
/**
 * Creates legacy class decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created class decorator.
 */
function classLegacyDecorator(name, logic, metadata) {
    // Legacy class decorator.
    return function (target) {
        // Register class decorator.
        addClass_1.addClass(target, {
            name: name,
            metadata: metadata,
            spec: 'legacy',
            type: decorator_1.Decorator.Class
        });
        // Execute decorator logic at runtime.
        return logic(target, metadata);
    };
}
exports.classLegacyDecorator = classLegacyDecorator;
//# sourceMappingURL=classLegacyDecorator.js.map