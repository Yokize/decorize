"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAccessorType = void 0;
var tslib_1 = require("tslib");
var isBoolean_1 = tslib_1.__importDefault(require("lodash/isBoolean"));
var createSetter_1 = require("./createSetter");
/**
 * Create the property accessor type descriptor based on
 * specified attributes.
 *
 * @param property Property name.
 * @param attributes Base descriptor attributes.
 * @return Newly created accessor descriptor.
 */
function toAccessorType(property, attributes) {
    // Create the new descriptor which contains `configurable` and `enumerable`.
    var get = attributes.get, set = attributes.set, value = attributes.value, writable = attributes.writable, newDescriptor = tslib_1.__rest(attributes, ["get", "set", "value", "writable"]);
    // Reuse the setter or undefined.
    newDescriptor.set = set;
    // Reuse the getter or undefined.
    newDescriptor.get = get;
    // Determine whether the `writable` is defined.
    if (isBoolean_1.default(writable) || !(get || set)) {
        // Create the new getter which returns value.
        newDescriptor.get = function () { return value; };
        // Create the new setter which is undefined in case `writable` is false.
        newDescriptor.set = writable ? createSetter_1.createSetter(property) : undefined;
    }
    // Returns the new descriptor.
    return newDescriptor;
}
exports.toAccessorType = toAccessorType;
//# sourceMappingURL=toAccessorType.js.map