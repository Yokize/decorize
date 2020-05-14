"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.Cache = void 0;
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
var cache_1 = require("../cache");
var global_1 = require("../global");
/**
 * Decorate the method to cache its result.
 *
 * @param target Class (prototype).
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @param configuration Configuration.
 * @return The descriptor with the cache logic.
 * @ignore
 */
function methodDecoratorLogic(target, property, descriptor, configuration) {
    // Create the new accessor descriptor based on the existing `descriptor`
    // with respect to already assigned attributes.
    var _a = toAccessorType_1.toAccessorType(property, descriptor), get = _a.get, newDescriptor = tslib_1.__rest(_a, ["get"]);
    // Create the new getter with enhanced logic to wrap the original method
    // and cache its results on the fly.
    newDescriptor.get = function cacheGetter() {
        // The function whose result has to be cached can be obtained from the
        // accessor descriptor by executing `get` with context.
        var fn = get.call(this);
        // Ensure the result obtained from `get` is the correct type.
        if (!isFunction_1.default(fn))
            cache_1.throwUsageError();
        // In case the `constructor` property directly belongs to the context,
        // it is reasonable to conclude that the context is the prototype and
        // not the class or its instance.
        if (!this || hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            // Returns the original function.
            return fn;
        // The ES2015+ specification defines `super` as the reference to the
        // context of the outer method, and there is no need to cache result in
        // case is accessed via `super` to support ES5 compatibility. In case
        // the class (constructor) of the context and the decorator target are
        // different and the context has its own method with same name, it can
        // be concluded that the access to the method was done via `super`.
        if (!isEqualClass_1.isEqualClass(this, target) && hasOwnProperty_1.hasOwnProperty(getPrototypeOf_1.getPrototypeOf(this), property))
            // Returns the original function.
            return fn;
        // Create the wrapper with the logic to cache the result of the
        // original method.
        return function cacheLogic() {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Execute without cache in case the context is nil.
            if (isNil_1.default(this))
                return fn.apply(this, args);
            // Create the key using the global or custom resolver with arguments
            // that are passed to the wrapper.
            var cacheKey = ((_a = configuration === null || configuration === void 0 ? void 0 : configuration.resolver) !== null && _a !== void 0 ? _a : global_1.Global.resolver).apply(void 0, args);
            // Check expiration of the cache entry.
            cache_1.checkExpiration(this, property, cacheKey, configuration);
            // Determine whether the entry is missing in the cache.
            if (!global_1.Global.has(this, property, cacheKey)) {
                // Entry with the result and additional configs.
                var cacheEntry = {
                    value: fn.apply(this, args),
                    maxAge: configuration === null || configuration === void 0 ? void 0 : configuration.maxAge,
                    timestamp: Date.now()
                };
                // Store the entry to the global cache.
                global_1.Global.set(this, property, cacheKey, cacheEntry);
            }
            // Retrieve the cached result.
            return global_1.Global.get(this, property, cacheKey).value;
        };
    };
    // Returns the descriptor with the cache logic.
    return newDescriptor;
}
/**
 * Decorate the getter to cache its result.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param descriptor Property descriptor.
 * @param configuration Configuration.
 * @return The descriptor with the cache logic.
 * @ignore
 */
function getterDecoratorLogic(target, property, descriptor, configuration) {
    // Create the new accessor descriptor based on the existing `descriptor`
    // with respect to already assigned attributes.
    var _a = toAccessorType_1.toAccessorType(property, descriptor), get = _a.get, newDescriptor = tslib_1.__rest(_a, ["get"]);
    // Create the new getter with enhanced logic to wrap the original getter
    // and cache its result on the fly.
    newDescriptor.get = function cacheLogic() {
        var _a;
        // In case the `constructor` property directly belongs to the context,
        // it is reasonable to conclude that the context is the prototype and
        // not the class or its instance.
        if (!this || hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            // Returns the result of the original getter.
            return get.call(this);
        // The ES2015+ specification defines `super` as the reference to the
        // context of the outer method, and there is no need to cache result in
        // case is accessed via `super` to support ES5 compatibility. In case
        // the class (constructor) of the context and the decorator target are
        // different and the context has its own method with same name, it can
        // be concluded that the access to the method was done via `super`.
        if (!isEqualClass_1.isEqualClass(this, target) && hasOwnProperty_1.hasOwnProperty(getPrototypeOf_1.getPrototypeOf(this), property))
            // Returns the result of the original getter.
            return get.call(this);
        // Create the key using the global or custom resolver without arguments.
        var cacheKey = ((_a = configuration === null || configuration === void 0 ? void 0 : configuration.resolver) !== null && _a !== void 0 ? _a : global_1.Global.resolver)();
        // Check expiration of the cache entry.
        cache_1.checkExpiration(this, property, cacheKey, configuration);
        // Determine whether the entry is missing in the cache.
        if (!global_1.Global.has(this, property, cacheKey)) {
            // Entry with the result and additional configs.
            var cacheEntry = {
                value: get.call(this),
                maxAge: configuration === null || configuration === void 0 ? void 0 : configuration.maxAge,
                timestamp: Date.now()
            };
            // Store the entry to the global cache.
            global_1.Global.set(this, property, cacheKey, cacheEntry);
        }
        // Retrieve the cached result.
        return global_1.Global.get(this, property, cacheKey).value;
    };
    // Returns the descriptor with the cache logic.
    return newDescriptor;
}
/**
 * Universal decoration (without type checking).
 *
 * @param args Dynamic arguments.
 * @ignore
 */
function cacheDecorator(args) {
    if (args.length === 0)
        // If there are no arguments, the decorator was used as a factory.
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            return cacheDecorator(args2);
        };
    if (args.length === 1)
        // If there is one argument, the decorator was applied with config.
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            return cacheDecorator(tslib_1.__spreadArrays(args2, args));
        };
    // Destructuring the dynamic arguments.
    var target = args[0], property = args[1], descriptor = args[2], configuration = args[3];
    // Ensure the decorator is used correctly.
    if (!isObject_1.default(descriptor))
        cache_1.throwUsageError();
    // If there are three arguments, the decorator was applied to the method or getter.
    var newlyCreatedDecorator = isFunction_1.default(descriptor.value) || isOriginallyMethod_1.isOriginallyMethod(target, property)
        ? methodLegacyDecorator_1.methodLegacyDecorator(cache_1.uniqueId, methodDecoratorLogic, configuration)
        : isFunction_1.default(descriptor.get)
            ? accessorLegacyDecorator_1.accessorLegacyDecorator(cache_1.uniqueId, getterDecoratorLogic, configuration)
            : cache_1.throwUsageError();
    // Execute newly created decorator.
    return newlyCreatedDecorator(target, property, descriptor);
}
function Cache() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return cacheDecorator.call(null, args);
}
exports.Cache = Cache;
function cache() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return cacheDecorator.call(null, args);
}
exports.cache = cache;
//# sourceMappingURL=cache.js.map