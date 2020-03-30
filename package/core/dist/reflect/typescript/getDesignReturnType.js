"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getOwnMetadata_1 = require("../getOwnMetadata");
/**
 * Get designed type of method return.
 * Typescript support an experimental reflection feature which
 * emit metadata with parameter types.
 *
 * @param target Object associated with metadata.
 * @param method Method for which to get designed return type.
 * @return Lexically designed return type.
 */
function getDesignReturnType(target, method) {
    return getOwnMetadata_1.getOwnMetadata('design:returntype', target, method);
}
exports.getDesignReturnType = getDesignReturnType;
//# sourceMappingURL=getDesignReturnType.js.map