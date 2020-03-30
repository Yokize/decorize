"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Based on whether the context is original class (instance) or its
 * inheritors, the decorator determines how it should proceed with
 * decoration.
 */
var ContextType;
(function (ContextType) {
    ContextType["Unknown"] = "Unknown";
    ContextType["Original"] = "Original";
    ContextType["Inheritor"] = "Inheritor";
})(ContextType = exports.ContextType || (exports.ContextType = {}));
//# sourceMappingURL=contextType.js.map