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
var isObject_1 = __importDefault(require("lodash/isObject"));
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var getOwnKeys_1 = require("@decorize/core/reflect/getOwnKeys");
var contextType_1 = require("@decorize/core/context/contextType");
var defineMetadata_1 = require("@decorize/core/reflect/defineMetadata");
var getOwnMetadata_1 = require("@decorize/core/reflect/getOwnMetadata");
var hasOwnProperty_1 = require("@decorize/core/reflect/hasOwnProperty");
var defineProperty_1 = require("@decorize/core/reflect/defineProperty");
var getPrototypeOf_1 = require("@decorize/core/reflect/getPrototypeOf");
var toAccessorType_1 = require("@decorize/core/descriptor/toAccessorType");
var isOriginallyMethod_1 = require("@decorize/core/original/isOriginallyMethod");
var classLegacyDecorator_1 = require("@decorize/core/legacy/classLegacyDecorator");
var methodLegacyDecorator_1 = require("@decorize/core/legacy/methodLegacyDecorator");
var getContextType_1 = require("@decorize/core/context/getContextType");
var getOwnPropertyDescriptor_1 = require("@decorize/core/reflect/getOwnPropertyDescriptor");
var bind_1 = require("../bind");
/**
 * Decorate the method to make it context-bound.
 *
 * @param target Prototype.
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @return Descriptor with bind logic.
 */
function methodDecoratorLogic(target, property, descriptor) {
    // Create the new accessor descriptor based on the existing `descriptor`
    // with respect to already assigned attributes.
    var _a = toAccessorType_1.toAccessorType(property, descriptor), get = _a.get, newDescriptor = __rest(_a, ["get"]);
    // Create the new getter with enhanced logic to wrap the original method
    // and bind it on the fly. The bound function is cached to avoid double
    // bindings and to increase performance on re-access.
    newDescriptor.get = function bindLogic() {
        var _a;
        // The function which should be bound can be obtained from the accessor
        // descriptor by executing `get` with context.
        var fn = get.call(this);
        // Ensure the result obtained from `get` is the correct type.
        if (!isFunction_1.default(fn))
            bind_1.throwUsageError();
        // In case the `constructor` property directly belongs to the context,
        // it is reasonable to conclude that the context is the prototype and
        // not an instance of the class.
        if (hasOwnProperty_1.hasOwnProperty(this, 'constructor'))
            // Returns the original function.
            return fn;
        // Binding is done only for the instance methods, so it is important to
        // determine whether an instance is initiated directly from the `target`
        // or the descendant class.
        var ctxType = getContextType_1.getInstanceContextType(this, target, property);
        // The ES2015+ specification defines `super` as the reference to the context
        // of the outer method. There is no need to bind an overridden method that
        // is accessed via `super` to support ES5 compatibility.
        if (ctxType === contextType_1.ContextType.Inheritor && hasOwnProperty_1.hasOwnProperty(getPrototypeOf_1.getPrototypeOf(this), property))
            // Returns the original function.
            return fn;
        // Binding the method to the context with unknown origin is not reasonable,
        // as it can lead to unexpected behavior, so developers must manage the
        // binding themselves.
        if (ctxType === contextType_1.ContextType.Unknown)
            // Returns the original function.
            return fn;
        // Create blank or get already existing own metadata that contains cached
        // context-dependent bound function.
        var bound = ((_a = getOwnMetadata_1.getOwnMetadata(bind_1.uniqueId, this, property)) !== null && _a !== void 0 ? _a : {}).bound;
        // Determine whether the bound function is missing in the metadata.
        if (isUndefined_1.default(bound)) {
            // Bind the original function to the context.
            bound = fn.bind(this);
            // Define the metadata with context-dependent bound function.
            defineMetadata_1.defineMetadata(bind_1.uniqueId, { bound: bound }, this, property);
        }
        // Returns the bound function.
        return bound;
    };
    // Returns the descriptor with the bind logic.
    return newDescriptor;
}
/**
 * Decorate the class to make own methods context-bound.
 *
 * @param target Class to decorate.
 * @return Class with decorated methods.
 */
function classDecoratorLogic(target) {
    // Binding is limited only to the instance methods, so its necessary
    // to get a `prototype` of the class.
    var prototype = target.prototype;
    // Iterate properties and determine which of them can be decorated.
    getOwnKeys_1.getOwnKeys(prototype).forEach(function (property) {
        // The property is already defined on the `prototype`, so can get
        // the descriptor to check its suitability for decoration.
        var descriptor = getOwnPropertyDescriptor_1.getOwnPropertyDescriptor(prototype, property);
        // Ignore built-in reserved or non-configurable properties.
        if (property === 'constructor' || !descriptor.configurable)
            return;
        // Proceed to decoration only in case the property has been verified
        // as the method. The easiest way to do this is just to check that the
        // value is a function type. The more complex case is when the property
        // is already decorated and the descriptor is modified, so the original
        // type must be checked.
        if (isFunction_1.default(descriptor.value) || isOriginallyMethod_1.isOriginallyMethod(prototype, property))
            // Override existing method to an enhanced function.
            defineProperty_1.defineProperty(prototype, property, methodDecoratorLogic(prototype, property, descriptor));
    });
    // Returns the decorated class.
    return target;
}
/**
 * Universal decoration (without type checking).
 */
function bindDecorator(args) {
    var _a, _b;
    if (args.length === 0)
        // If there are no arguments, the decorator was used as a factory.
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            return bindDecorator(args2);
        };
    if (args.length === 1 && args[0])
        // If there is one argument, the decorator was applied to the class.
        return (_a = classLegacyDecorator_1.classLegacyDecorator(bind_1.uniqueId, classDecoratorLogic)).call.apply(_a, __spreadArrays([null], args));
    // Destructuring of dynamic arguments.
    var target = args[0], property = args[1], descriptor = args[2];
    // Avoid decoration of static properties.
    if (isFunction_1.default(target))
        return;
    // Ensure the decorator is used correctly.
    if (!isObject_1.default(descriptor))
        bind_1.throwUsageError();
    // If there are three arguments, the decorator was applied to the method.
    if (isFunction_1.default(descriptor.value) || isOriginallyMethod_1.isOriginallyMethod(target, property))
        return (_b = methodLegacyDecorator_1.methodLegacyDecorator(bind_1.uniqueId, methodDecoratorLogic)).call.apply(_b, __spreadArrays([null], args));
    // Error in case the decorator used incorrectly.
    bind_1.throwUsageError();
}
function Bind() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return bindDecorator(args);
}
exports.Bind = Bind;
function bind() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return bindDecorator(args);
}
exports.bind = bind;
//# sourceMappingURL=bind.js.map