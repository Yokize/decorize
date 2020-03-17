"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var getOwnPropertyDescriptor_1 = require("./getOwnPropertyDescriptor");
/**
 * Determine whether an object has own property (opposed to inheriting it).
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to check.
 * @return True in case has own property; false otherwise.
 */
function hasOwnProperty(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Check whether own property descriptor exist.
        return !isUndefined_1.default(getOwnPropertyDescriptor_1.getOwnPropertyDescriptor(target, property));
    else
        throw new TypeError('Existence of the own property can be checked only on the object');
}
exports.hasOwnProperty = hasOwnProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzT3duUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9oYXNPd25Qcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUF1QztBQUN2QyxtRUFBNkM7QUFDN0MsdUVBQXNFO0FBRXRFOzs7Ozs7R0FNRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxNQUFjLEVBQUUsUUFBcUI7SUFDbEUsbUNBQW1DO0lBQ25DLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7UUFDbEIsK0NBQStDO1FBQy9DLE9BQU8sQ0FBQyxxQkFBVyxDQUFDLG1EQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDOztRQUM3RCxNQUFNLElBQUksU0FBUyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7QUFDOUYsQ0FBQztBQU5ELHdDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XG5pbXBvcnQgaXNVbmRlZmluZWQgZnJvbSAnbG9kYXNoL2lzVW5kZWZpbmVkJztcbmltcG9ydCB7IGdldE93blByb3BlcnR5RGVzY3JpcHRvciB9IGZyb20gJy4vZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJztcblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciBhbiBvYmplY3QgaGFzIG93biBwcm9wZXJ0eSAob3Bwb3NlZCB0byBpbmhlcml0aW5nIGl0KS5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IE9iamVjdCBpbiB3aGljaCB0byBsb29rIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0gcHJvcGVydHkgTmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY2hlY2suXG4gKiBAcmV0dXJuIFRydWUgaW4gY2FzZSBoYXMgb3duIHByb3BlcnR5OyBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gIC8vIFZlcmlmeSB3aGV0aGVyIHRhcmdldCBpcyBvYmplY3QuXG4gIGlmIChpc09iamVjdCh0YXJnZXQpKVxuICAgIC8vIENoZWNrIHdoZXRoZXIgb3duIHByb3BlcnR5IGRlc2NyaXB0b3IgZXhpc3QuXG4gICAgcmV0dXJuICFpc1VuZGVmaW5lZChnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wZXJ0eSkpO1xuICBlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4aXN0ZW5jZSBvZiB0aGUgb3duIHByb3BlcnR5IGNhbiBiZSBjaGVja2VkIG9ubHkgb24gdGhlIG9iamVjdCcpO1xufVxuIl19