"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="reflect-metadata" />
var isObject_1 = __importDefault(require("lodash/isObject"));
var define_1 = require("./fallback/define");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.defineMetadata;
/**
 * Reflect and Fallback differs in a way how metadata is stored. Reflect creates
 * for each object and property separate map to store keys and corresponding
 * metadata. Fallback store metadata directly on the object under special non
 * configurable property. Fallback have limitation to define metadata at
 * non-object target.
 */
var _defineMetadata = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function defineMetadataFk(key, value, target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Define metadata associated with target or property.
        define_1.defineInStorage(key, value, target, property);
    else
        throw new TypeError('Metadata can be defined only on the object');
};
function defineMetadata(key, value, target, property) {
    _defineMetadata(key, value, target, property);
}
exports.defineMetadata = defineMetadata;
//# sourceMappingURL=defineMetadata.js.map