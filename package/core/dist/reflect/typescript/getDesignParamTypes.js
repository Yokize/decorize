"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getOwnMetadata_1 = require("../getOwnMetadata");
/**
 * Get designed type of constructor or method parameters.
 * Typescript support an experimental reflection feature which
 * emit metadata with parameter types.
 *
 * @param target Object associated with metadata.
 * @param method Method for which to get designed param types.
 * @return Lexically designed param types.
 */
function getDesignParamTypes(target, method) {
    return getOwnMetadata_1.getOwnMetadata('design:paramtypes', target, method);
}
exports.getDesignParamTypes = getDesignParamTypes;
//# sourceMappingURL=getDesignParamTypes.js.map