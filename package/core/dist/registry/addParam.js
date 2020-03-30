"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setParamRegistry_1 = require("./setParamRegistry");
var getParamRegistry_1 = require("./getParamRegistry");
/**
 * Register the decorator in the param registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param method Method name.
 * @param paramIdx Parameter index.
 * @param entry Decorator data.
 */
function addParam(target, method, paramIdx, entry) {
    // Get the register or create a new one.
    var registry = getParamRegistry_1.getOrCreateParamRegistry(target, method, paramIdx);
    // Add directly to the registry.
    registry.decorator.push(entry);
    // Link registry with the class (prototype), method & param index.
    setParamRegistry_1.setParamRegistry(target, method, paramIdx, registry);
}
exports.addParam = addParam;
//# sourceMappingURL=addParam.js.map