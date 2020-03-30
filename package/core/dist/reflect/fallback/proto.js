"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var getPrototypeOf_1 = require("../getPrototypeOf");
/**
 * Guess class inheritance by deeper analyze of super.
 *
 * @param clazz Class to be analyzed.
 * @return Prototype; null in case of non existing parent.
 */
function guessClassInheritance(clazz) {
    // Try to determine heritage by checking super prototype.
    var superProto = getPrototypeOf_1.getPrototypeOf(clazz.prototype);
    // In case prototype is empty or Object.prototype
    // inheritance is unclear.
    if (!superProto || superProto === Object.prototype)
        return getPrototypeOf_1.getPrototypeOf(clazz);
    // In case constructor not function or self reference
    // inheritance is unclear.
    if (!isFunction_1.default(superProto.constructor) || superProto.constructor === clazz)
        return getPrototypeOf_1.getPrototypeOf(clazz);
    // Guessing can be done only by constructor.
    return superProto.constructor;
}
/**
 * Get proto of the object to support feature to access metadata by chain.
 * Using built-in getPrototypeOf or custom logic to get the proto of the object.
 * Custom logic aligned with Reflect polyfill way of getting prototype.
 *
 * @param target Object used to get the proto.
 * @return Prototype; null in case of non existing prototype.
 */
function getProtoOf(target) {
    // Retrieve prototype using native getPrototypeOf.
    var prototype = getPrototypeOf_1.getPrototypeOf(target);
    // Can rely purely on native getPrototypeOf in case target
    // is not a class or already on top of chain.
    if (!isFunction_1.default(target) || target === Function.prototype)
        return prototype;
    // In case retrieved prototype is super class.
    if (prototype !== Function.prototype)
        return prototype;
    // Try to guess class inheritance by deep analyze.
    return guessClassInheritance(target);
}
exports.getProtoOf = getProtoOf;
//# sourceMappingURL=proto.js.map