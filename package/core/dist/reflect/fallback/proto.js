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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVmbGVjdC9mYWxsYmFjay9wcm90by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlFQUEyQztBQUMzQyxvREFBbUQ7QUFFbkQ7Ozs7O0dBS0c7QUFDSCxTQUFTLHFCQUFxQixDQUFDLEtBQVU7SUFDdkMseURBQXlEO0lBQ3pELElBQU0sVUFBVSxHQUFvQiwrQkFBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVwRSxpREFBaUQ7SUFDakQsMEJBQTBCO0lBQzFCLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxLQUFLLE1BQU0sQ0FBQyxTQUFTO1FBQUUsT0FBTywrQkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWpGLHFEQUFxRDtJQUNyRCwwQkFBMEI7SUFDMUIsSUFBSSxDQUFDLG9CQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEtBQUssS0FBSztRQUFFLE9BQU8sK0JBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUxRyw0Q0FBNEM7SUFDNUMsT0FBTyxVQUFVLENBQUMsV0FBVyxDQUFDO0FBQ2hDLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLE1BQVc7SUFDcEMsa0RBQWtEO0lBQ2xELElBQU0sU0FBUyxHQUFRLCtCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUMsMERBQTBEO0lBQzFELDZDQUE2QztJQUM3QyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLFNBQVM7UUFBRSxPQUFPLFNBQVMsQ0FBQztJQUUzRSw4Q0FBOEM7SUFDOUMsSUFBSSxTQUFTLEtBQUssUUFBUSxDQUFDLFNBQVM7UUFBRSxPQUFPLFNBQVMsQ0FBQztJQUV2RCxrREFBa0Q7SUFDbEQsT0FBTyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBYkQsZ0NBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBnZXRQcm90b3R5cGVPZiB9IGZyb20gJy4uL2dldFByb3RvdHlwZU9mJztcblxuLyoqXG4gKiBHdWVzcyBjbGFzcyBpbmhlcml0YW5jZSBieSBkZWVwZXIgYW5hbHl6ZSBvZiBzdXBlci5cbiAqXG4gKiBAcGFyYW0gY2xhenogQ2xhc3MgdG8gYmUgYW5hbHl6ZWQuXG4gKiBAcmV0dXJuIFByb3RvdHlwZTsgbnVsbCBpbiBjYXNlIG9mIG5vbiBleGlzdGluZyBwYXJlbnQuXG4gKi9cbmZ1bmN0aW9uIGd1ZXNzQ2xhc3NJbmhlcml0YW5jZShjbGF6ejogYW55KTogb2JqZWN0IHwgdW5kZWZpbmVkIHtcbiAgLy8gVHJ5IHRvIGRldGVybWluZSBoZXJpdGFnZSBieSBjaGVja2luZyBzdXBlciBwcm90b3R5cGUuXG4gIGNvbnN0IHN1cGVyUHJvdG86IGFueSB8IHVuZGVmaW5lZCA9IGdldFByb3RvdHlwZU9mKGNsYXp6LnByb3RvdHlwZSk7XG5cbiAgLy8gSW4gY2FzZSBwcm90b3R5cGUgaXMgZW1wdHkgb3IgT2JqZWN0LnByb3RvdHlwZVxuICAvLyBpbmhlcml0YW5jZSBpcyB1bmNsZWFyLlxuICBpZiAoIXN1cGVyUHJvdG8gfHwgc3VwZXJQcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSkgcmV0dXJuIGdldFByb3RvdHlwZU9mKGNsYXp6KTtcblxuICAvLyBJbiBjYXNlIGNvbnN0cnVjdG9yIG5vdCBmdW5jdGlvbiBvciBzZWxmIHJlZmVyZW5jZVxuICAvLyBpbmhlcml0YW5jZSBpcyB1bmNsZWFyLlxuICBpZiAoIWlzRnVuY3Rpb24oc3VwZXJQcm90by5jb25zdHJ1Y3RvcikgfHwgc3VwZXJQcm90by5jb25zdHJ1Y3RvciA9PT0gY2xhenopIHJldHVybiBnZXRQcm90b3R5cGVPZihjbGF6eik7XG5cbiAgLy8gR3Vlc3NpbmcgY2FuIGJlIGRvbmUgb25seSBieSBjb25zdHJ1Y3Rvci5cbiAgcmV0dXJuIHN1cGVyUHJvdG8uY29uc3RydWN0b3I7XG59XG5cbi8qKlxuICogR2V0IHByb3RvIG9mIHRoZSBvYmplY3QgdG8gc3VwcG9ydCBmZWF0dXJlIHRvIGFjY2VzcyBtZXRhZGF0YSBieSBjaGFpbi5cbiAqIFVzaW5nIGJ1aWx0LWluIGdldFByb3RvdHlwZU9mIG9yIGN1c3RvbSBsb2dpYyB0byBnZXQgdGhlIHByb3RvIG9mIHRoZSBvYmplY3QuXG4gKiBDdXN0b20gbG9naWMgYWxpZ25lZCB3aXRoIFJlZmxlY3QgcG9seWZpbGwgd2F5IG9mIGdldHRpbmcgcHJvdG90eXBlLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgT2JqZWN0IHVzZWQgdG8gZ2V0IHRoZSBwcm90by5cbiAqIEByZXR1cm4gUHJvdG90eXBlOyBudWxsIGluIGNhc2Ugb2Ygbm9uIGV4aXN0aW5nIHByb3RvdHlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3RvT2YodGFyZ2V0OiBhbnkpOiBvYmplY3QgfCB1bmRlZmluZWQge1xuICAvLyBSZXRyaWV2ZSBwcm90b3R5cGUgdXNpbmcgbmF0aXZlIGdldFByb3RvdHlwZU9mLlxuICBjb25zdCBwcm90b3R5cGU6IGFueSA9IGdldFByb3RvdHlwZU9mKHRhcmdldCk7XG5cbiAgLy8gQ2FuIHJlbHkgcHVyZWx5IG9uIG5hdGl2ZSBnZXRQcm90b3R5cGVPZiBpbiBjYXNlIHRhcmdldFxuICAvLyBpcyBub3QgYSBjbGFzcyBvciBhbHJlYWR5IG9uIHRvcCBvZiBjaGFpbi5cbiAgaWYgKCFpc0Z1bmN0aW9uKHRhcmdldCkgfHwgdGFyZ2V0ID09PSBGdW5jdGlvbi5wcm90b3R5cGUpIHJldHVybiBwcm90b3R5cGU7XG5cbiAgLy8gSW4gY2FzZSByZXRyaWV2ZWQgcHJvdG90eXBlIGlzIHN1cGVyIGNsYXNzLlxuICBpZiAocHJvdG90eXBlICE9PSBGdW5jdGlvbi5wcm90b3R5cGUpIHJldHVybiBwcm90b3R5cGU7XG5cbiAgLy8gVHJ5IHRvIGd1ZXNzIGNsYXNzIGluaGVyaXRhbmNlIGJ5IGRlZXAgYW5hbHl6ZS5cbiAgcmV0dXJuIGd1ZXNzQ2xhc3NJbmhlcml0YW5jZSh0YXJnZXQpO1xufVxuIl19