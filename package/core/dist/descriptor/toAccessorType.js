"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isBoolean_1 = __importDefault(require("lodash/isBoolean"));
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
/**
 * Create the property accessor type descriptor based on
 * existing attributes.
 *
 * @param property Property.
 * @param attributes Attributes.
 * @return Accessor descriptor.
 */
function toAccessorType(property, attributes) {
    // Create the new descriptor which contains `configurable` and `enumerable`
    // attributes.
    var get = attributes.get, set = attributes.set, value = attributes.value, writable = attributes.writable, newDescriptor = __rest(attributes, ["get", "set", "value", "writable"]);
    // Reuse the setter.
    newDescriptor.set = set;
    // Reuse the getter.
    newDescriptor.get = get;
    // Determine whether the `writable` is defined.
    if (isBoolean_1.default(writable)) {
        // Create the new getter which returns value.
        newDescriptor.get = function () { return value; };
        // Create the new setter which is undefined in case `writable` is false.
        newDescriptor.set = writable ? createSetter(property) : undefined;
    }
    // Returns the new descriptor.
    return newDescriptor;
}
exports.toAccessorType = toAccessorType;
//# sourceMappingURL=toAccessorType.js.map