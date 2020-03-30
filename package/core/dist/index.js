"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
__export(require("./decorator"));
__export(require("./registry/addClass"));
__export(require("./registry/addParam"));
__export(require("./registry/addProperty"));
__export(require("./registry/baseRegistry"));
__export(require("./registry/getClassRegistry"));
__export(require("./registry/getParamRegistry"));
__export(require("./registry/getPropertyRegistry"));
__export(require("./registry/setClassRegistry"));
__export(require("./registry/setParamRegistry"));
__export(require("./registry/setPropertyRegistry"));
__export(require("./context/contextType"));
__export(require("./context/getContextType"));
__export(require("./descriptor/toAccessorType"));
__export(require("./original/getOriginalType"));
__export(require("./original/isOriginallyMethod"));
__export(require("./original/isOriginallyAccessor"));
__export(require("./original/isOriginallyProperty"));
__export(require("./legacy/accessorLegacyDecorator"));
__export(require("./legacy/classLegacyDecorator"));
__export(require("./legacy/methodLegacyDecorator"));
__export(require("./legacy/parameterLegacyDecorator"));
__export(require("./legacy/propertyLegacyDecorator"));
__export(require("./reflect/typescript/getDesignParamTypes"));
__export(require("./reflect/typescript/getDesignReturnType"));
__export(require("./reflect/typescript/getDesignType"));
__export(require("./reflect/defineMetadata"));
__export(require("./reflect/defineProperty"));
__export(require("./reflect/deleteMetadata"));
__export(require("./reflect/deleteProperty"));
__export(require("./reflect/getMetadata"));
__export(require("./reflect/getOwnKeys"));
__export(require("./reflect/getOwnMetadata"));
__export(require("./reflect/getOwnProperty"));
__export(require("./reflect/getOwnPropertyDescriptor"));
__export(require("./reflect/getProperty"));
__export(require("./reflect/getPrototypeOf"));
__export(require("./reflect/hasMetadata"));
__export(require("./reflect/hasOwnMetadata"));
__export(require("./reflect/hasProperty"));
__export(require("./reflect/hasOwnProperty"));
//# sourceMappingURL=index.js.map