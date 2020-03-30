"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = require("../decorator");
var getPropertyRegistry_1 = require("../registry/getPropertyRegistry");
/**
 * Decorator can change or define a completely new descriptor of the
 * property so sometimes its important to determine original type.
 * Original type used for flexible and accurate decoration.
 */
var OriginalType;
(function (OriginalType) {
    OriginalType["Method"] = "method";
    OriginalType["Property"] = "property";
    OriginalType["Accessor"] = "accessor";
})(OriginalType = exports.OriginalType || (exports.OriginalType = {}));
/**
 * Original type directly depends on Decorator type so mapping
 * can be used to determine it.
 */
var originalTypeMapping = (_a = {},
    _a[decorator_1.Decorator.Accessor] = OriginalType.Accessor,
    _a[decorator_1.Decorator.Property] = OriginalType.Property,
    _a[decorator_1.Decorator.Method] = OriginalType.Method,
    _a);
/**
 * Determine original type based on already registered decorators.
 * In case decorator change descriptor without registering itself
 * its not possible to determine original type.
 *
 * @param target Class on which decorators registered.
 * @param property Property for which to get the original type.
 * @return Original type; undefined otherwise.
 */
function getOriginalType(target, property) {
    var _a;
    // Retrieve registry which contain records with registered decorators.
    var registry = getPropertyRegistry_1.getPropertyRegistry(target, property);
    // Use mapping to get original type.
    return ((_a = registry === null || registry === void 0 ? void 0 : registry.decorator) === null || _a === void 0 ? void 0 : _a[0]) ? originalTypeMapping[registry.decorator[0].type] : undefined;
}
exports.getOriginalType = getOriginalType;
//# sourceMappingURL=getOriginalType.js.map