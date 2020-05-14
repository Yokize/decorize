"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDesignParamTypes = void 0;
var getOwnMetadata_1 = require("../getOwnMetadata");
/**
 * Get the designed type of constructor or method parameters.
 * TypeScript supports an experimental reflection feature that
 * emits metadata with params types.
 *
 * @param target The object associated with metadata.
 * @param method The method that contains parameters.
 * @return Lexically designed params types.
 */
function getDesignParamTypes(target, method) {
    return getOwnMetadata_1.getOwnMetadata('design:paramtypes', target, method);
}
exports.getDesignParamTypes = getDesignParamTypes;
//# sourceMappingURL=getDesignParamTypes.js.map