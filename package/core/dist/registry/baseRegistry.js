"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore next */
exports._registryKey = Symbol
    ? // Private symbol.
        Symbol.for('Decorize: Registry')
    : // Namespaced key.
        '__decorize::registry__';
//# sourceMappingURL=baseRegistry.js.map