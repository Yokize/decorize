"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var contextType_1 = require("./contextType");
var hasProperty_1 = require("../reflect/hasProperty");
function getClassContextType(context, clazz, prop) {
    return context !== clazz
        ? hasProperty_1.hasProperty(context, prop)
            ? contextType_1.ContextType.Inheritor
            : contextType_1.ContextType.Unknown
        : contextType_1.ContextType.Original;
}
exports.getClassContextType = getClassContextType;
function getInstanceContextType(context, proto, prop) {
    return context.constructor !== proto.constructor
        ? hasProperty_1.hasProperty(context, prop)
            ? contextType_1.ContextType.Inheritor
            : contextType_1.ContextType.Unknown
        : contextType_1.ContextType.Original;
}
exports.getInstanceContextType = getInstanceContextType;
function getContextType(context, base, property) {
    return isFunction_1.default(context) && isFunction_1.default(base)
        ? getClassContextType(context, base, property)
        : getInstanceContextType(context, base, property);
}
exports.getContextType = getContextType;
//# sourceMappingURL=getContextType.js.map