"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheClear = exports.CacheClear = void 0;
var tslib_1 = require("tslib");
var isNil_1 = tslib_1.__importDefault(require("lodash/isNil"));
var isObject_1 = tslib_1.__importDefault(require("lodash/isObject"));
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
var isEqualClass_1 = require("@decorize/core/class/isEqualClass");
var hasOwnProperty_1 = require("@decorize/core/reflect/hasOwnProperty");
var getPrototypeOf_1 = require("@decorize/core/reflect/getPrototypeOf");
var toAccessorType_1 = require("@decorize/core/descriptor/toAccessorType");
var isOriginallyMethod_1 = require("@decorize/core/original/isOriginallyMethod");
var methodLegacyDecorator_1 = require("@decorize/core/legacy/methodLegacyDecorator");
var accessorLegacyDecorator_1 = require("@decorize/core/legacy/accessorLegacyDecorator");
var clear_1 = require("../clear");
var global_1 = require("../global");
/**
 * Decorate the method to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param configuration Configuration.
 * @return The descriptor with the clear logic.
 * @ignore
 */
function methodDecoratorLogic(target, property, descriptor, configuration) {
    // Create the new accessor descriptor based on the existing `descriptor`
    // with respect to already assigned attributes.
    var _a = toAccessorType_1.toAccessorType(property, descriptor), get = _a.get, newDescriptor = tslib_1.__rest(_a, ["get"]);
    // Create the new getter with enhanced logic to wrap the original method
    // and clear the cache.
    newDescriptor.get = function clearCacheGetter() {
        // The original function can be obtained from the accessor descriptor
        // by executing `get` with context.
        var fn = get.call(this);
        // Ensure the result obtained from `get` is the correct type.
        if (!isFunction_1.default(fn))
            clear_1.throwUsageError();
        // In case the `constructor` property directly belongs to the context,
        // it is reasonable to conclude that the context is the prototype and
        // not the class or its instance.
        if (!this || hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            // Returns the original function.
            return fn;
        // The ES2015+ specification defines `super` as the reference to the
        // context of the outer method, and there is no need to clear result in
        // case is accessed via `super` to support ES5 compatibility. In case
        // the class (constructor) of the context and the decorator target are
        // different and the context has its own method with same name, it can
        // be concluded that the access to the method was done via `super`.
        if (!isEqualClass_1.isEqualClass(this, target) && hasOwnProperty_1.hasOwnProperty(getPrototypeOf_1.getPrototypeOf(this), property))
            // Returns the original function.
            return fn;
        // Create the wrapper with the logic to clear the cache.
        return function cacheLogic() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Execute without cache in case the context is nil.
            if (isNil_1.default(this))
                return fn.apply(this, args);
            // Clear the cache before executing the method.
            if (configuration === null || configuration === void 0 ? void 0 : configuration.before)
                global_1.Global.clear(this);
            // The result of the method.
            var result = fn.apply(this, args);
            //  Clear the cache after executing the method.
            if ((configuration === null || configuration === void 0 ? void 0 : configuration.after) || !(configuration === null || configuration === void 0 ? void 0 : configuration.before))
                global_1.Global.clear(this);
            // Returns the result of the method.
            return result;
        };
    };
    // Returns the descriptor with the clear logic.
    return newDescriptor;
}
/**
 * Decorate the getter to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return The descriptor with the clear logic.
 * @ignore
 */
function getterDecoratorLogic(target, property, descriptor, configuration) {
    // Create the new accessor descriptor based on the existing `descriptor`
    // with respect to already assigned attributes.
    var _a = toAccessorType_1.toAccessorType(property, descriptor), get = _a.get, newDescriptor = tslib_1.__rest(_a, ["get"]);
    // Create the new getter with enhanced logic to wrap the original getter
    // and clear the cache.
    newDescriptor.get = function getterClearCacheLogic() {
        // In case the `constructor` property directly belongs to the context,
        // it is reasonable to conclude that the context is the prototype and
        // not the class or its instance.
        if (!this || hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            // Returns the result of the original getter.
            return get.call(this);
        // The ES2015+ specification defines `super` as the reference to the
        // context of the outer method, and there is no need to clear result in
        // case is accessed via `super` to support ES5 compatibility. In case
        // the class (constructor) of the context and the decorator target are
        // different and the context has its own method with same name, it can
        // be concluded that the access to the method was done via `super`.
        if (!isEqualClass_1.isEqualClass(this, target) && hasOwnProperty_1.hasOwnProperty(getPrototypeOf_1.getPrototypeOf(this), property))
            // Returns the result of the original getter.
            return get.call(this);
        // Clear the cache before executing the getter.
        if (configuration === null || configuration === void 0 ? void 0 : configuration.before)
            global_1.Global.clear(this);
        // The result of the getter.
        var result = get.call(this);
        // Clear the cache after executing the getter.
        if ((configuration === null || configuration === void 0 ? void 0 : configuration.after) || !(configuration === null || configuration === void 0 ? void 0 : configuration.before))
            global_1.Global.clear(this);
        // Returns the result of the getter.
        return result;
    };
    // Returns the descriptor with the clear logic.
    return newDescriptor;
}
/**
 * Decorate the setter to clear the cache on execution.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return The descriptor with the clear logic.
 */
function setterDecoratorLogic(target, property, descriptor, configuration) {
    // Create the new accessor descriptor based on the existing `descriptor`
    // with respect to already assigned attributes.
    var _a = toAccessorType_1.toAccessorType(property, descriptor), set = _a.set, newDescriptor = tslib_1.__rest(_a, ["set"]);
    // Create the new setter with enhanced logic to wrap the original setter
    // and clear the cache.
    newDescriptor.set = function setterClearCacheLogic() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // In case the `constructor` property directly belongs to the context,
        // it is reasonable to conclude that the context is the prototype and
        // not the class or its instance.
        if (!this || hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            return set.call.apply(set, tslib_1.__spreadArrays([this], args));
        // The ES2015+ specification defines `super` as the reference to the
        // context of the outer method, and there is no need to clear result in
        // case is accessed via `super` to support ES5 compatibility. In case
        // the class (constructor) of the context and the decorator target are
        // different and the context has its own method with same name, it can
        // be concluded that the access to the method was done via `super`.
        if (!isEqualClass_1.isEqualClass(this, target) && hasOwnProperty_1.hasOwnProperty(getPrototypeOf_1.getPrototypeOf(this), property))
            // Execute the original setter.
            return set.call.apply(set, tslib_1.__spreadArrays([this], args));
        // Clear the cache before executing the setter.
        if (configuration === null || configuration === void 0 ? void 0 : configuration.before)
            global_1.Global.clear(this);
        // Execute the original setter.
        set.call.apply(set, tslib_1.__spreadArrays([this], args));
        // Clear the cache after executing the setter.
        if ((configuration === null || configuration === void 0 ? void 0 : configuration.after) || !(configuration === null || configuration === void 0 ? void 0 : configuration.before))
            global_1.Global.clear(this);
    };
    // Returns the descriptor with the clear logic.
    return newDescriptor;
}
/**
 * Universal decoration (without type checking).
 *
 * @param args Dynamic arguments.
 * @ignore
 */
function cacheClearDecorator(args) {
    if (args.length <= 1)
        // If there are one or less arguments, the decorator was used as a factory
        // or applied with config.
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            return cacheClearDecorator(tslib_1.__spreadArrays(args2, args));
        };
    // Destructuring the dynamic arguments.
    var target = args[0], property = args[1], descriptor = args[2], configuration = args[3];
    // Ensure the decorator is used correctly.
    if (!isObject_1.default(descriptor))
        clear_1.throwUsageError();
    // If there are three arguments, the decorator was applied to the method or accessor.
    var newlyCreatedDecorator = isFunction_1.default(descriptor.value) || isOriginallyMethod_1.isOriginallyMethod(target, property)
        ? methodLegacyDecorator_1.methodLegacyDecorator(clear_1.uniqueId, methodDecoratorLogic, configuration)
        : isFunction_1.default(descriptor.get) || isFunction_1.default(descriptor.set)
            ? (configuration === null || configuration === void 0 ? void 0 : configuration.setter) || (descriptor.set && !descriptor.get)
                ? accessorLegacyDecorator_1.accessorLegacyDecorator(clear_1.uniqueId, setterDecoratorLogic, configuration)
                : accessorLegacyDecorator_1.accessorLegacyDecorator(clear_1.uniqueId, getterDecoratorLogic, configuration)
            : clear_1.throwUsageError();
    // Execute newly created decorator.
    return newlyCreatedDecorator(target, property, descriptor);
}
function CacheClear() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return cacheClearDecorator.call(null, args);
}
exports.CacheClear = CacheClear;
function cacheClear() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return cacheClearDecorator.call(null, args);
}
exports.cacheClear = cacheClear;
//# sourceMappingURL=cacheClear.js.map