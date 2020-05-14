"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClassRegistry = void 0;
var defineMetadata_1 = require("../reflect/defineMetadata");
var baseRegistry_1 = require("./baseRegistry");
/**
 * Link the registry with the class (prototype).
 *
 * @param target Class (prototype).
 * @param registry Registry to link.
 */
function setClassRegistry(target, registry) {
    defineMetadata_1.defineMetadata(baseRegistry_1._registryKey, registry, target);
}
exports.setClassRegistry = setClassRegistry;
//# sourceMappingURL=setClassRegistry.js.map