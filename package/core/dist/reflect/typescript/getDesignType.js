"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getOwnMetadata_1 = require("../getOwnMetadata");
/**
 * Get designed type of property.
 * Typescript support an experimental reflection feature which
 * emit metadata with parameter types.
 *
 * @param target Object associated with metadata.
 * @param property Property for which to get designed type.
 * @return Lexically designed property type.
 */
function getDesignType(target, property) {
    return getOwnMetadata_1.getOwnMetadata('design:type', target, property);
}
exports.getDesignType = getDesignType;
//# sourceMappingURL=getDesignType.js.map