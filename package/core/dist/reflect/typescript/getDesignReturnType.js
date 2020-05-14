"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDesignReturnType = void 0;
var getOwnMetadata_1 = require("../getOwnMetadata");
/**
 * Get the designed type of method return.
 * TypeScript supports an experimental reflection feature that
 * emits metadata with return value type.
 *
 * @param target The object associated with metadata.
 * @param method The method for which to get the return type.
 * @return Lexically designed return type.
 */
function getDesignReturnType(target, method) {
    return getOwnMetadata_1.getOwnMetadata('design:returntype', target, method);
}
exports.getDesignReturnType = getDesignReturnType;
//# sourceMappingURL=getDesignReturnType.js.map