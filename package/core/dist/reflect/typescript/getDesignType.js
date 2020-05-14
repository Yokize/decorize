"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDesignType = void 0;
var getOwnMetadata_1 = require("../getOwnMetadata");
/**
 * Get the designed type of property.
 * TypeScript supports an experimental reflection feature that
 * emits metadata with parameters types.
 *
 * @param target The object associated with metadata.
 * @param property The property for which to get the type.
 * @return Lexically designed property type.
 */
function getDesignType(target, property) {
    return getOwnMetadata_1.getOwnMetadata('design:type', target, property);
}
exports.getDesignType = getDesignType;
//# sourceMappingURL=getDesignType.js.map