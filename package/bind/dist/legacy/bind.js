"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pick_1 = __importDefault(require("lodash/pick"));
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
var getOwnKeys_1 = require("@decorize/core/reflect/getOwnKeys");
var createSetter_1 = require("@decorize/core/accessor/createSetter");
var hasOwnProperty_1 = require("@decorize/core/reflect/hasOwnProperty");
var defineProperty_1 = require("@decorize/core/reflect/defineProperty");
var isOriginallyMethod_1 = require("@decorize/core/original/isOriginallyMethod");
var classLegacyDecorator_1 = require("@decorize/core/legacy/classLegacyDecorator");
var methodLegacyDecorator_1 = require("@decorize/core/legacy/methodLegacyDecorator");
var getOwnPropertyDescriptor_1 = require("@decorize/core/reflect/getOwnPropertyDescriptor");
var bind_1 = require("../bind");
/**
 * Decorate the method to make it context-bound.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @return Descriptor with bind logic.
 */
function decorateMethod(target, property, descriptor) {
    // Attributes used to create new behaviour.
    var get = descriptor.get, set = descriptor.set, value = descriptor.value;
    // New descriptor with predefined bind logic.
    var newDescriptor = pick_1.default(descriptor, ['configurable', 'enumerable']);
    // Create new setter or use from an existing descriptor.
    newDescriptor.set = isFunction_1.default(get) || isFunction_1.default(set) ? set : createSetter_1.createSetter(property);
    // Create new getter to bind the function on the fly or get it from the cache.
    newDescriptor.get = function bindLogic() {
        var _a;
        // Function which will be bound to the context.
        var fn = (_a = get === null || get === void 0 ? void 0 : get.call(this)) !== null && _a !== void 0 ? _a : value;
        // Verify that the function is the correct type.
        if (!isFunction_1.default(fn))
            bind_1.throwIncorrectUsage();
        // Return the original function in case its accessed from the prototype.
        if (hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            return fn;
        // Determine whether the bound function is already cached.
        if (!bind_1.hasBoundMethod(this, property))
            // Create the bound function and cache it.
            bind_1.setBoundMethod(this, property, fn.bind(this));
        // Get the bound function from the cache.
        return bind_1.getBoundMethod(this, property);
    };
    // Return new descriptor with bind logic.
    return newDescriptor;
}
/**
 * Decorate the class to make own methods context-bound.
 *
 * @param target Class to decorate.
 * @return Class with decorated methods.
 */
function decorateClass(target) {
    // Bind is limited to methods from the prototype.
    var prototype = target.prototype;
    // Iterate properties and determine which of them can be decorated.
    getOwnKeys_1.getOwnKeys(prototype).forEach(function (property) {
        // Ignore the built-in reserved property.
        if (property === 'constructor')
            return;
        // Descriptor to verify whether the property contains the function.
        var descriptor = getOwnPropertyDescriptor_1.getOwnPropertyDescriptor(prototype, property);
        // Proceed to decoration only in case property has been verified.
        if ((isPlainObject_1.default(descriptor) && isFunction_1.default(descriptor.value)) || isOriginallyMethod_1.isOriginallyMethod(prototype, property))
            // Redefining an existing value to the function with bind logic.
            defineProperty_1.defineProperty(prototype, property, decorateMethod(prototype, property, descriptor));
    });
    // Return the decorated class.
    return target;
}
/**
 * Universal decorator (without type checking).
 */
function decorateUniversal(args) {
    var _a, _b;
    if (args.length === 0)
        // Decorator is used as the factory.
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            return decorateUniversal(args2);
        };
    if (args.length === 1)
        // Decorator is applied to the class.
        return (_a = classLegacyDecorator_1.classLegacyDecorator(bind_1.getDecoratorId(), decorateClass)).call.apply(_a, __spreadArrays([null], args));
    // Destructuring of dynamic arguments.
    var target = args[0], property = args[1], descriptor = args[2];
    // Verify that the decorator is used correctly.
    if (!isPlainObject_1.default(descriptor))
        bind_1.throwIncorrectUsage();
    // Decorator is applied to the method.
    if (isFunction_1.default(descriptor.value) || isOriginallyMethod_1.isOriginallyMethod(target, property))
        return (_b = methodLegacyDecorator_1.methodLegacyDecorator(bind_1.getDecoratorId(), decorateMethod)).call.apply(_b, __spreadArrays([null], args));
    // Error in case the decorator used incorrectly.
    bind_1.throwIncorrectUsage();
}
function Bind() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return decorateUniversal(args);
}
exports.Bind = Bind;
function bind() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return decorateUniversal(args);
}
exports.bind = bind;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9sZWdhY3kvYmluZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBK0I7QUFDL0IsaUVBQTJDO0FBQzNDLHVFQUFpRDtBQUNqRCxnRUFBK0Q7QUFDL0QscUVBQW9FO0FBQ3BFLHdFQUF1RTtBQUN2RSx3RUFBdUU7QUFDdkUsaUZBQWdGO0FBQ2hGLG1GQUFrRjtBQUNsRixxRkFBb0Y7QUFDcEYsNEZBQTJGO0FBQzNGLGdDQUE4RztBQUU5Rzs7Ozs7OztHQU9HO0FBQ0gsU0FBUyxjQUFjLENBQUMsTUFBYyxFQUFFLFFBQXFCLEVBQUUsVUFBOEI7SUFDM0YsMkNBQTJDO0lBQ25DLElBQUEsb0JBQUcsRUFBRSxvQkFBRyxFQUFFLHdCQUFLLENBQW9DO0lBRTNELDZDQUE2QztJQUM3QyxJQUFNLGFBQWEsR0FBdUIsY0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBRTNGLHdEQUF3RDtJQUN4RCxhQUFhLENBQUMsR0FBRyxHQUFHLG9CQUFVLENBQUMsR0FBRyxDQUFDLElBQUksb0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXRGLDhFQUE4RTtJQUM5RSxhQUFhLENBQUMsR0FBRyxHQUFHLFNBQVMsU0FBUzs7UUFDcEMsK0NBQStDO1FBQy9DLElBQU0sRUFBRSxTQUFhLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxJQUFJLENBQUMsSUFBSSxvQ0FBSyxLQUFLLENBQUM7UUFFOUMsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxvQkFBVSxDQUFDLEVBQUUsQ0FBQztZQUFFLDBCQUFtQixFQUFFLENBQUM7UUFFM0Msd0VBQXdFO1FBQ3hFLElBQUksK0JBQWMsQ0FBQyxJQUFJLEVBQUUsYUFB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Q0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFGRCxvQkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC9waWNrJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC9pc1BsYWluT2JqZWN0JztcbmltcG9ydCB7IGdldE93bktleXMgfSBmcm9tICdAZGVjb3JpemUvY29yZS9yZWZsZWN0L2dldE93bktleXMnO1xuaW1wb3J0IHsgY3JlYXRlU2V0dGVyIH0gZnJvbSAnQGRlY29yaXplL2NvcmUvYWNjZXNzb3IvY3JlYXRlU2V0dGVyJztcbmltcG9ydCB7IGhhc093blByb3BlcnR5IH0gZnJvbSAnQGRlY29yaXplL2NvcmUvcmVmbGVjdC9oYXNPd25Qcm9wZXJ0eSc7XG5pbXBvcnQgeyBkZWZpbmVQcm9wZXJ0eSB9IGZyb20gJ0BkZWNvcml6ZS9jb3JlL3JlZmxlY3QvZGVmaW5lUHJvcGVydHknO1xuaW1wb3J0IHsgaXNPcmlnaW5hbGx5TWV0aG9kIH0gZnJvbSAnQGRlY29yaXplL2NvcmUvb3JpZ2luYWwvaXNPcmlnaW5hbGx5TWV0aG9kJztcbmltcG9ydCB7IGNsYXNzTGVnYWN5RGVjb3JhdG9yIH0gZnJvbSAnQGRlY29yaXplL2NvcmUvbGVnYWN5L2NsYXNzTGVnYWN5RGVjb3JhdG9yJztcbmltcG9ydCB7IG1ldGhvZExlZ2FjeURlY29yYXRvciB9IGZyb20gJ0BkZWNvcml6ZS9jb3JlL2xlZ2FjeS9tZXRob2RMZWdhY3lEZWNvcmF0b3InO1xuaW1wb3J0IHsgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIH0gZnJvbSAnQGRlY29yaXplL2NvcmUvcmVmbGVjdC9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InO1xuaW1wb3J0IHsgZ2V0RGVjb3JhdG9ySWQsIGhhc0JvdW5kTWV0aG9kLCBnZXRCb3VuZE1ldGhvZCwgc2V0Qm91bmRNZXRob2QsIHRocm93SW5jb3JyZWN0VXNhZ2UgfSBmcm9tICcuLi9iaW5kJztcblxuLyoqXG4gKiBEZWNvcmF0ZSB0aGUgbWV0aG9kIHRvIG1ha2UgaXQgY29udGV4dC1ib3VuZC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IE1ldGhvZCBuYW1lLlxuICogQHBhcmFtIGRlc2NyaXB0b3IgTWV0aG9kIGRlc2NyaXB0b3IuXG4gKiBAcmV0dXJuIERlc2NyaXB0b3Igd2l0aCBiaW5kIGxvZ2ljLlxuICovXG5mdW5jdGlvbiBkZWNvcmF0ZU1ldGhvZCh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBQcm9wZXJ0eURlc2NyaXB0b3Ige1xuICAvLyBBdHRyaWJ1dGVzIHVzZWQgdG8gY3JlYXRlIG5ldyBiZWhhdmlvdXIuXG4gIGNvbnN0IHsgZ2V0LCBzZXQsIHZhbHVlIH06IFByb3BlcnR5RGVzY3JpcHRvciA9IGRlc2NyaXB0b3I7XG5cbiAgLy8gTmV3IGRlc2NyaXB0b3Igd2l0aCBwcmVkZWZpbmVkIGJpbmQgbG9naWMuXG4gIGNvbnN0IG5ld0Rlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvciA9IHBpY2soZGVzY3JpcHRvciwgWydjb25maWd1cmFibGUnLCAnZW51bWVyYWJsZSddKTtcblxuICAvLyBDcmVhdGUgbmV3IHNldHRlciBvciB1c2UgZnJvbSBhbiBleGlzdGluZyBkZXNjcmlwdG9yLlxuICBuZXdEZXNjcmlwdG9yLnNldCA9IGlzRnVuY3Rpb24oZ2V0KSB8fCBpc0Z1bmN0aW9uKHNldCkgPyBzZXQgOiBjcmVhdGVTZXR0ZXIocHJvcGVydHkpO1xuXG4gIC8vIENyZWF0ZSBuZXcgZ2V0dGVyIHRvIGJpbmQgdGhlIGZ1bmN0aW9uIG9uIHRoZSBmbHkgb3IgZ2V0IGl0IGZyb20gdGhlIGNhY2hlLlxuICBuZXdEZXNjcmlwdG9yLmdldCA9IGZ1bmN0aW9uIGJpbmRMb2dpYyh0aGlzOiBvYmplY3QpOiBGdW5jdGlvbiB7XG4gICAgLy8gRnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBib3VuZCB0byB0aGUgY29udGV4dC5cbiAgICBjb25zdCBmbjogRnVuY3Rpb24gPSBnZXQ/LmNhbGwodGhpcykgPz8gdmFsdWU7XG5cbiAgICAvLyBWZXJpZnkgdGhhdCB0aGUgZnVuY3Rpb24gaXMgdGhlIGNvcnJlY3QgdHlwZS5cbiAgICBpZiAoIWlzRnVuY3Rpb24oZm4pKSB0aHJvd0luY29ycmVjdFVzYWdlKCk7XG5cbiAgICAvLyBSZXR1cm4gdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGluIGNhc2UgaXRzIGFjY2Vzc2VkIGZyb20gdGhlIHByb3RvdHlwZS5cbiAgICBpZiAoaGFzT3duUHJvcGVydHkodGhpcywgJ2NvbnN0cnVjdG9yJykpIHJldHVybiBmbjtcblxuICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBib3VuZCBmdW5jdGlvbiBpcyBhbHJlYWR5IGNhY2hlZC5cbiAgICBpZiAoIWhhc0JvdW5kTWV0aG9kKHRoaXMsIHByb3BlcnR5KSlcbiAgICAgIC8vIENyZWF0ZSB0aGUgYm91bmQgZnVuY3Rpb24gYW5kIGNhY2hlIGl0LlxuICAgICAgc2V0Qm91bmRNZXRob2QodGhpcywgcHJvcGVydHksIGZuLmJpbmQodGhpcykpO1xuXG4gICAgLy8gR2V0IHRoZSBib3VuZCBmdW5jdGlvbiBmcm9tIHRoZSBjYWNoZS5cbiAgICByZXR1cm4gZ2V0Qm91bmRNZXRob2QodGhpcywgcHJvcGVydHkpO1xuICB9O1xuXG4gIC8vIFJldHVybiBuZXcgZGVzY3JpcHRvciB3aXRoIGJpbmQgbG9naWMuXG4gIHJldHVybiBuZXdEZXNjcmlwdG9yO1xufVxuXG4vKipcbiAqIERlY29yYXRlIHRoZSBjbGFzcyB0byBtYWtlIG93biBtZXRob2RzIGNvbnRleHQtYm91bmQuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDbGFzcyB0byBkZWNvcmF0ZS5cbiAqIEByZXR1cm4gQ2xhc3Mgd2l0aCBkZWNvcmF0ZWQgbWV0aG9kcy5cbiAqL1xuZnVuY3Rpb24gZGVjb3JhdGVDbGFzcyh0YXJnZXQ6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAvLyBCaW5kIGlzIGxpbWl0ZWQgdG8gbWV0aG9kcyBmcm9tIHRoZSBwcm90b3R5cGUuXG4gIGNvbnN0IHsgcHJvdG90eXBlIH0gPSB0YXJnZXQ7XG5cbiAgLy8gSXRlcmF0ZSBwcm9wZXJ0aWVzIGFuZCBkZXRlcm1pbmUgd2hpY2ggb2YgdGhlbSBjYW4gYmUgZGVjb3JhdGVkLlxuICBnZXRPd25LZXlzKHByb3RvdHlwZSkuZm9yRWFjaCgocHJvcGVydHk6IFByb3BlcnR5S2V5KTogdm9pZCA9PiB7XG4gICAgLy8gSWdub3JlIHRoZSBidWlsdC1pbiByZXNlcnZlZCBwcm9wZXJ0eS5cbiAgICBpZiAocHJvcGVydHkgPT09ICdjb25zdHJ1Y3RvcicpIHJldHVybjtcblxuICAgIC8vIERlc2NyaXB0b3IgdG8gdmVyaWZ5IHdoZXRoZXIgdGhlIHByb3BlcnR5IGNvbnRhaW5zIHRoZSBmdW5jdGlvbi5cbiAgICBjb25zdCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBwcm9wZXJ0eSk7XG5cbiAgICAvLyBQcm9jZWVkIHRvIGRlY29yYXRpb24gb25seSBpbiBjYXNlIHByb3BlcnR5IGhhcyBiZWVuIHZlcmlmaWVkLlxuICAgIGlmICgoaXNQbGFpbk9iamVjdChkZXNjcmlwdG9yKSAmJiBpc0Z1bmN0aW9uKGRlc2NyaXB0b3IudmFsdWUpKSB8fCBpc09yaWdpbmFsbHlNZXRob2QocHJvdG90eXBlLCBwcm9wZXJ0eSkpXG4gICAgICAvLyBSZWRlZmluaW5nIGFuIGV4aXN0aW5nIHZhbHVlIHRvIHRoZSBmdW5jdGlvbiB3aXRoIGJpbmQgbG9naWMuXG4gICAgICBkZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsIHByb3BlcnR5LCBkZWNvcmF0ZU1ldGhvZChwcm90b3R5cGUsIHByb3BlcnR5LCBkZXNjcmlwdG9yKSk7XG4gIH0pO1xuXG4gIC8vIFJldHVybiB0aGUgZGVjb3JhdGVkIGNsYXNzLlxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIFVuaXZlcnNhbCBkZWNvcmF0b3IgKHdpdGhvdXQgdHlwZSBjaGVja2luZykuXG4gKi9cbmZ1bmN0aW9uIGRlY29yYXRlVW5pdmVyc2FsKGFyZ3M6IGFueVtdKTogYW55IHtcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKVxuICAgIC8vIERlY29yYXRvciBpcyB1c2VkIGFzIHRoZSBmYWN0b3J5LlxuICAgIHJldHVybiAoLi4uYXJnczI6IGFueVtdKTogYW55ID0+IGRlY29yYXRlVW5pdmVyc2FsKGFyZ3MyKTtcblxuICBpZiAoYXJncy5sZW5ndGggPT09IDEpXG4gICAgLy8gRGVjb3JhdG9yIGlzIGFwcGxpZWQgdG8gdGhlIGNsYXNzLlxuICAgIHJldHVybiBjbGFzc0xlZ2FjeURlY29yYXRvcihnZXREZWNvcmF0b3JJZCgpLCBkZWNvcmF0ZUNsYXNzKS5jYWxsKG51bGwsIC4uLmFyZ3MpO1xuXG4gIC8vIERlc3RydWN0dXJpbmcgb2YgZHluYW1pYyBhcmd1bWVudHMuXG4gIGNvbnN0IFt0YXJnZXQsIHByb3BlcnR5LCBkZXNjcmlwdG9yXSA9IGFyZ3M7XG5cbiAgLy8gVmVyaWZ5IHRoYXQgdGhlIGRlY29yYXRvciBpcyB1c2VkIGNvcnJlY3RseS5cbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRlc2NyaXB0b3IpKSB0aHJvd0luY29ycmVjdFVzYWdlKCk7XG5cbiAgLy8gRGVjb3JhdG9yIGlzIGFwcGxpZWQgdG8gdGhlIG1ldGhvZC5cbiAgaWYgKGlzRnVuY3Rpb24oZGVzY3JpcHRvci52YWx1ZSkgfHwgaXNPcmlnaW5hbGx5TWV0aG9kKHRhcmdldCwgcHJvcGVydHkpKVxuICAgIHJldHVybiBtZXRob2RMZWdhY3lEZWNvcmF0b3IoZ2V0RGVjb3JhdG9ySWQoKSwgZGVjb3JhdGVNZXRob2QpLmNhbGwobnVsbCwgLi4uYXJncyk7XG5cbiAgLy8gRXJyb3IgaW4gY2FzZSB0aGUgZGVjb3JhdG9yIHVzZWQgaW5jb3JyZWN0bHkuXG4gIHRocm93SW5jb3JyZWN0VXNhZ2UoKTtcbn1cblxuLyoqXG4gKiBCaW5kIGFsbCB0aGUgbWV0aG9kcyBvZiB0aGUgY2xhc3MgdG8gdGhlIGNvbnRleHQgdXNlZCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDbGFzcy5cbiAqIEByZXR1cm4gRGVjb3JhdGVkIGNsYXNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQmluZDxUIGV4dGVuZHMgRnVuY3Rpb24+KHRhcmdldDogVCk6IFQ7XG5cbi8qKlxuICogQmluZCB0aGUgbWV0aG9kIG9yIGFsbCBtZXRob2RzIG9mIHRoZSBjbGFzcyB0byB0aGUgY29udGV4dCB1c2VkIHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIENsYXNzIG9yIG1ldGhvZCBkZWNvcmF0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCaW5kKCk6IENsYXNzRGVjb3JhdG9yICYgTWV0aG9kRGVjb3JhdG9yO1xuXG4vKipcbiAqIEJpbmQgdGhlIG1ldGhvZCB0byB0aGUgY29udGV4dCB1c2VkIHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IE1ldGhvZCBuYW1lLlxuICogQHBhcmFtIGRlc2NyaXB0b3IgTWV0aG9kIGRlc2NyaXB0b3IuXG4gKiBAcmV0dXJuIERlc2NyaXB0b3Igd2l0aCBiaW5kIGxvZ2ljLlxuICovXG5leHBvcnQgZnVuY3Rpb24gQmluZCh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBQcm9wZXJ0eURlc2NyaXB0b3I7XG5leHBvcnQgZnVuY3Rpb24gQmluZCguLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBkZWNvcmF0ZVVuaXZlcnNhbChhcmdzKTtcbn1cblxuLyoqXG4gKiBCaW5kIGFsbCB0aGUgbWV0aG9kcyBvZiB0aGUgY2xhc3MgdG8gdGhlIGNvbnRleHQgdXNlZCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDbGFzcy5cbiAqIEByZXR1cm4gRGVjb3JhdGVkIGNsYXNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZDxUIGV4dGVuZHMgRnVuY3Rpb24+KHRhcmdldDogVCk6IFQ7XG5cbi8qKlxuICogQmluZCB0aGUgbWV0aG9kIG9yIGFsbCBtZXRob2RzIG9mIHRoZSBjbGFzcyB0byB0aGUgY29udGV4dCB1c2VkIHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIENsYXNzIG9yIG1ldGhvZCBkZWNvcmF0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kKCk6IENsYXNzRGVjb3JhdG9yICYgTWV0aG9kRGVjb3JhdG9yO1xuXG4vKipcbiAqIEJpbmQgdGhlIG1ldGhvZCB0byB0aGUgY29udGV4dCB1c2VkIHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IE1ldGhvZCBuYW1lLlxuICogQHBhcmFtIGRlc2NyaXB0b3IgTWV0aG9kIGRlc2NyaXB0b3IuXG4gKiBAcmV0dXJuIERlc2NyaXB0b3Igd2l0aCBiaW5kIGxvZ2ljLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZCh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBQcm9wZXJ0eURlc2NyaXB0b3I7XG5leHBvcnQgZnVuY3Rpb24gYmluZCguLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gIHJldHVybiBkZWNvcmF0ZVVuaXZlcnNhbChhcmdzKTtcbn1cbiJdfQ==