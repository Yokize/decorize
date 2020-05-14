"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSetter = void 0;
/**
 * Create the default setter for the `property`.
 *
 * @param property Property name.
 * @return Newly created setter of the property.
 */
function createSetter(property) {
    // Create setter for the property.
    return function set(value) {
        // Re-define the property on set.
        Object.defineProperty(this, property, {
            value: value,
            configurable: true,
            enumerable: true,
            writable: true
        });
    };
}
exports.createSetter = createSetter;
//# sourceMappingURL=createSetter.js.map