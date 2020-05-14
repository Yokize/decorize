"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parameterLegacyDecorator = void 0;
var decorator_1 = require("../decorator");
var addParam_1 = require("../registry/addParam");
/**
 * Creates legacy parameter decorator that executes logic at runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created param decorator.
 */
function parameterLegacyDecorator(name, logic, metadata) {
    // Legacy parameter decorator.
    return function (target, property, paramIndex) {
        // Register parameter decorator.
        addParam_1.addParam(target, property, paramIndex, {
            name: name,
            metadata: metadata,
            spec: 'ts',
            type: decorator_1.Decorator.Parameter
        });
        // Execute decorator logic at runtime.
        logic(target, property, paramIndex, metadata);
    };
}
exports.parameterLegacyDecorator = parameterLegacyDecorator;
//# sourceMappingURL=parameterLegacyDecorator.js.map