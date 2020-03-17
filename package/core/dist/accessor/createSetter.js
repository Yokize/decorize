"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create setter for the property.
 *
 * @param property Property name.
 * @return Newly created setter.
 */
function createSetter(property) {
    // Property setter.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlU2V0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2FjY2Vzc29yL2NyZWF0ZVNldHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7OztHQUtHO0FBQ0gsU0FBZ0IsWUFBWSxDQUFJLFFBQXFCO0lBQ25ELG1CQUFtQjtJQUNuQixPQUFPLFNBQVMsR0FBRyxDQUFZLEtBQVE7UUFDckMsaUNBQWlDO1FBQ2pDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNwQyxLQUFLLE9BQUE7WUFDTCxZQUFZLEVBQUUsSUFBSTtZQUNsQixVQUFVLEVBQUUsSUFBSTtZQUNoQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUM7QUFYRCxvQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlIHNldHRlciBmb3IgdGhlIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lLlxuICogQHJldHVybiBOZXdseSBjcmVhdGVkIHNldHRlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNldHRlcjxUPihwcm9wZXJ0eTogUHJvcGVydHlLZXkpOiAodmFsdWU6IFQpID0+IHZvaWQge1xuICAvLyBQcm9wZXJ0eSBzZXR0ZXIuXG4gIHJldHVybiBmdW5jdGlvbiBzZXQodGhpczogYW55LCB2YWx1ZTogVCk6IHZvaWQge1xuICAgIC8vIFJlLWRlZmluZSB0aGUgcHJvcGVydHkgb24gc2V0LlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wZXJ0eSwge1xuICAgICAgdmFsdWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==