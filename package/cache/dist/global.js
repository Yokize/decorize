"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isNil_1 = __importDefault(require("lodash/isNil"));
var isObject_1 = __importDefault(require("lodash/isObject"));
var defineMetadata_1 = require("@decorize/core/reflect/defineMetadata");
var getOwnMetadata_1 = require("@decorize/core/reflect/getOwnMetadata");
var hasOwnProperty_1 = require("@decorize/core/reflect/hasOwnProperty");
var getOwnProperty_1 = require("@decorize/core/reflect/getOwnProperty");
var deleteMetadata_1 = require("@decorize/core/reflect/deleteMetadata");
var deleteProperty_1 = require("@decorize/core/reflect/deleteProperty");
var resolver_1 = require("./resolver");
/* istanbul ignore next */
var _globalKey = Symbol
    ? // Private symbol.
        Symbol.for('Decorize: Cache')
    : // Namespaced key.
        '__decorize::cache__';
/**
 * Determine whether there is an entry.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store and retrieve the entry.
 * @return True in case the entry is stored; false otherwise.
 */
function has(target, property, key) {
    // Get the cache linked to the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Ensure the cache exist and has the entry associated with the key.
    return isObject_1.default(cache === null || cache === void 0 ? void 0 : cache[property]) ? hasOwnProperty_1.hasOwnProperty(cache[property], key) : false;
}
/**
 * Get the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to retrieve the entry.
 * @return Stored entry; undefined otherwise.
 */
function get(target, property, key) {
    // Get the cache linked to the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Ensure the cache exist and retrieve the entry associated with the key.
    return isObject_1.default(cache === null || cache === void 0 ? void 0 : cache[property]) ? getOwnProperty_1.getOwnProperty(cache[property], key) : undefined;
}
/**
 * Set the entry to the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store entry.
 * @param entry Entry to store.
 */
function set(target, property, key, entry) {
    // Get the cache linked to the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Defaulting general cache.
    if (isNil_1.default(cache))
        cache = {};
    // Defaulting property cache.
    if (isNil_1.default(cache[property]))
        cache[property] = {};
    // Assign the entry under the key.
    cache[property][key] = entry;
    // Link the cache to the target.
    defineMetadata_1.defineMetadata(_globalKey, cache, target);
}
/**
 * Remove the entry from the cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 * @param key Key used to store and retrieve the entry.
 */
function remove(target, property, key) {
    // Get the cache linked to the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Ensure the cache exist and remove the entry associated with the key.
    if (isObject_1.default(cache === null || cache === void 0 ? void 0 : cache[property]))
        deleteProperty_1.deleteProperty(cache[property], key);
}
/**
 * Clear the whole or property cache.
 *
 * @param target Class (prototype).
 * @param property Property name.
 */
function clear(target, property) {
    // Get the cache linked to the target.
    var cache = getOwnMetadata_1.getOwnMetadata(_globalKey, target);
    // Remove the cache in case it's exists.
    isNil_1.default(property)
        ? // Remove the whole cache.
            deleteMetadata_1.deleteMetadata(_globalKey, target)
        : // Remove the property cache.
            isObject_1.default(cache === null || cache === void 0 ? void 0 : cache[property]) && deleteProperty_1.deleteProperty(cache, property);
}
/**
 * Global cache manager used by decorators.
 */
exports.Global = { resolver: resolver_1.resolver, has: has, get: get, set: set, remove: remove, clear: clear };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2dsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVEQUFpQztBQUNqQyw2REFBdUM7QUFDdkMsd0VBQXVFO0FBQ3ZFLHdFQUF1RTtBQUN2RSx3RUFBdUU7QUFDdkUsd0VBQXVFO0FBQ3ZFLHdFQUF1RTtBQUN2RSx3RUFBdUU7QUFDdkUsdUNBQXNDO0FBRXRDLDBCQUEwQjtBQUMxQixJQUFNLFVBQVUsR0FBb0IsTUFBTTtJQUN4QyxDQUFDLENBQUMsa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7SUFDL0IsQ0FBQyxDQUFDLGtCQUFrQjtRQUNsQixxQkFBcUIsQ0FBQztBQUUxQjs7Ozs7OztHQU9HO0FBQ0gsU0FBUyxHQUFHLENBQUMsTUFBYyxFQUFFLFFBQXFCLEVBQUUsR0FBUTtJQUMxRCxzQ0FBc0M7SUFDdEMsSUFBTSxLQUFLLEdBQVEsK0JBQWMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFdEQsb0VBQW9FO0lBQ3BFLE9BQU8sa0JBQVEsQ0FBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLCtCQUFjLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDcEYsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFTLEdBQUcsQ0FBQyxNQUFjLEVBQUUsUUFBcUIsRUFBRSxHQUFRO0lBQzFELHNDQUFzQztJQUN0QyxJQUFNLEtBQUssR0FBUSwrQkFBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV0RCx5RUFBeUU7SUFDekUsT0FBTyxrQkFBUSxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsK0JBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUN4RixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQVMsR0FBRyxDQUFDLE1BQWMsRUFBRSxRQUFxQixFQUFFLEdBQVEsRUFBRSxLQUFVO0lBQ3RFLHNDQUFzQztJQUN0QyxJQUFJLEtBQUssR0FBUSwrQkFBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVwRCw0QkFBNEI7SUFDNUIsSUFBSSxlQUFLLENBQUMsS0FBSyxDQUFDO1FBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUU3Qiw2QkFBNkI7SUFDN0IsSUFBSSxlQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVqRCxrQ0FBa0M7SUFDbEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUU3QixnQ0FBZ0M7SUFDaEMsK0JBQWMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxNQUFjLEVBQUUsUUFBcUIsRUFBRSxHQUFRO0lBQzdELHNDQUFzQztJQUN0QyxJQUFNLEtBQUssR0FBUSwrQkFBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV0RCx1RUFBdUU7SUFDdkUsSUFBSSxrQkFBUSxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxRQUFRLEVBQUU7UUFBRSwrQkFBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLEtBQUssQ0FBQyxNQUFXLEVBQUUsUUFBc0I7SUFDaEQsc0NBQXNDO0lBQ3RDLElBQU0sS0FBSyxHQUFRLCtCQUFjLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXRELHdDQUF3QztJQUN4QyxlQUFLLENBQUMsUUFBUSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLDBCQUEwQjtZQUMxQiwrQkFBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUM7UUFDcEMsQ0FBQyxDQUFDLDZCQUE2QjtZQUM3QixrQkFBUSxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxRQUFRLEVBQUUsSUFBSSwrQkFBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLE1BQU0sR0FBRyxFQUFFLFFBQVEscUJBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzTmlsIGZyb20gJ2xvZGFzaC9pc05pbCc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2lzT2JqZWN0JztcbmltcG9ydCB7IGRlZmluZU1ldGFkYXRhIH0gZnJvbSAnQGRlY29yaXplL2NvcmUvcmVmbGVjdC9kZWZpbmVNZXRhZGF0YSc7XG5pbXBvcnQgeyBnZXRPd25NZXRhZGF0YSB9IGZyb20gJ0BkZWNvcml6ZS9jb3JlL3JlZmxlY3QvZ2V0T3duTWV0YWRhdGEnO1xuaW1wb3J0IHsgaGFzT3duUHJvcGVydHkgfSBmcm9tICdAZGVjb3JpemUvY29yZS9yZWZsZWN0L2hhc093blByb3BlcnR5JztcbmltcG9ydCB7IGdldE93blByb3BlcnR5IH0gZnJvbSAnQGRlY29yaXplL2NvcmUvcmVmbGVjdC9nZXRPd25Qcm9wZXJ0eSc7XG5pbXBvcnQgeyBkZWxldGVNZXRhZGF0YSB9IGZyb20gJ0BkZWNvcml6ZS9jb3JlL3JlZmxlY3QvZGVsZXRlTWV0YWRhdGEnO1xuaW1wb3J0IHsgZGVsZXRlUHJvcGVydHkgfSBmcm9tICdAZGVjb3JpemUvY29yZS9yZWZsZWN0L2RlbGV0ZVByb3BlcnR5JztcbmltcG9ydCB7IHJlc29sdmVyIH0gZnJvbSAnLi9yZXNvbHZlcic7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5jb25zdCBfZ2xvYmFsS2V5OiBzdHJpbmcgfCBzeW1ib2wgPSBTeW1ib2xcbiAgPyAvLyBQcml2YXRlIHN5bWJvbC5cbiAgICBTeW1ib2wuZm9yKCdEZWNvcml6ZTogQ2FjaGUnKVxuICA6IC8vIE5hbWVzcGFjZWQga2V5LlxuICAgICdfX2RlY29yaXplOjpjYWNoZV9fJztcblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGVyZSBpcyBhbiBlbnRyeS5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IFByb3BlcnR5IG5hbWUuXG4gKiBAcGFyYW0ga2V5IEtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSB0aGUgZW50cnkuXG4gKiBAcmV0dXJuIFRydWUgaW4gY2FzZSB0aGUgZW50cnkgaXMgc3RvcmVkOyBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmZ1bmN0aW9uIGhhcyh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBrZXk6IGFueSk6IGJvb2xlYW4ge1xuICAvLyBHZXQgdGhlIGNhY2hlIGxpbmtlZCB0byB0aGUgdGFyZ2V0LlxuICBjb25zdCBjYWNoZTogYW55ID0gZ2V0T3duTWV0YWRhdGEoX2dsb2JhbEtleSwgdGFyZ2V0KTtcblxuICAvLyBFbnN1cmUgdGhlIGNhY2hlIGV4aXN0IGFuZCBoYXMgdGhlIGVudHJ5IGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5LlxuICByZXR1cm4gaXNPYmplY3QoY2FjaGU/Lltwcm9wZXJ0eV0pID8gaGFzT3duUHJvcGVydHkoY2FjaGVbcHJvcGVydHldLCBrZXkpIDogZmFsc2U7XG59XG5cbi8qKlxuICogR2V0IHRoZSBlbnRyeSBmcm9tIHRoZSBjYWNoZS5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IFByb3BlcnR5IG5hbWUuXG4gKiBAcGFyYW0ga2V5IEtleSB1c2VkIHRvIHJldHJpZXZlIHRoZSBlbnRyeS5cbiAqIEByZXR1cm4gU3RvcmVkIGVudHJ5OyB1bmRlZmluZWQgb3RoZXJ3aXNlLlxuICovXG5mdW5jdGlvbiBnZXQodGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eUtleSwga2V5OiBhbnkpOiBhbnkgfCB1bmRlZmluZWQge1xuICAvLyBHZXQgdGhlIGNhY2hlIGxpbmtlZCB0byB0aGUgdGFyZ2V0LlxuICBjb25zdCBjYWNoZTogYW55ID0gZ2V0T3duTWV0YWRhdGEoX2dsb2JhbEtleSwgdGFyZ2V0KTtcblxuICAvLyBFbnN1cmUgdGhlIGNhY2hlIGV4aXN0IGFuZCByZXRyaWV2ZSB0aGUgZW50cnkgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkuXG4gIHJldHVybiBpc09iamVjdChjYWNoZT8uW3Byb3BlcnR5XSkgPyBnZXRPd25Qcm9wZXJ0eShjYWNoZVtwcm9wZXJ0eV0sIGtleSkgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogU2V0IHRoZSBlbnRyeSB0byB0aGUgY2FjaGUuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDbGFzcyAocHJvdG90eXBlKS5cbiAqIEBwYXJhbSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lLlxuICogQHBhcmFtIGtleSBLZXkgdXNlZCB0byBzdG9yZSBlbnRyeS5cbiAqIEBwYXJhbSBlbnRyeSBFbnRyeSB0byBzdG9yZS5cbiAqL1xuZnVuY3Rpb24gc2V0KHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eTogUHJvcGVydHlLZXksIGtleTogYW55LCBlbnRyeTogYW55KTogdm9pZCB7XG4gIC8vIEdldCB0aGUgY2FjaGUgbGlua2VkIHRvIHRoZSB0YXJnZXQuXG4gIGxldCBjYWNoZTogYW55ID0gZ2V0T3duTWV0YWRhdGEoX2dsb2JhbEtleSwgdGFyZ2V0KTtcblxuICAvLyBEZWZhdWx0aW5nIGdlbmVyYWwgY2FjaGUuXG4gIGlmIChpc05pbChjYWNoZSkpIGNhY2hlID0ge307XG5cbiAgLy8gRGVmYXVsdGluZyBwcm9wZXJ0eSBjYWNoZS5cbiAgaWYgKGlzTmlsKGNhY2hlW3Byb3BlcnR5XSkpIGNhY2hlW3Byb3BlcnR5XSA9IHt9O1xuXG4gIC8vIEFzc2lnbiB0aGUgZW50cnkgdW5kZXIgdGhlIGtleS5cbiAgY2FjaGVbcHJvcGVydHldW2tleV0gPSBlbnRyeTtcblxuICAvLyBMaW5rIHRoZSBjYWNoZSB0byB0aGUgdGFyZ2V0LlxuICBkZWZpbmVNZXRhZGF0YShfZ2xvYmFsS2V5LCBjYWNoZSwgdGFyZ2V0KTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGVudHJ5IGZyb20gdGhlIGNhY2hlLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQ2xhc3MgKHByb3RvdHlwZSkuXG4gKiBAcGFyYW0gcHJvcGVydHkgUHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSBrZXkgS2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIHRoZSBlbnRyeS5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eTogUHJvcGVydHlLZXksIGtleTogYW55KTogdm9pZCB7XG4gIC8vIEdldCB0aGUgY2FjaGUgbGlua2VkIHRvIHRoZSB0YXJnZXQuXG4gIGNvbnN0IGNhY2hlOiBhbnkgPSBnZXRPd25NZXRhZGF0YShfZ2xvYmFsS2V5LCB0YXJnZXQpO1xuXG4gIC8vIEVuc3VyZSB0aGUgY2FjaGUgZXhpc3QgYW5kIHJlbW92ZSB0aGUgZW50cnkgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkuXG4gIGlmIChpc09iamVjdChjYWNoZT8uW3Byb3BlcnR5XSkpIGRlbGV0ZVByb3BlcnR5KGNhY2hlW3Byb3BlcnR5XSwga2V5KTtcbn1cblxuLyoqXG4gKiBDbGVhciB0aGUgd2hvbGUgb3IgcHJvcGVydHkgY2FjaGUuXG4gKlxuICogQHBhcmFtIHRhcmdldCBDbGFzcyAocHJvdG90eXBlKS5cbiAqIEBwYXJhbSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lLlxuICovXG5mdW5jdGlvbiBjbGVhcih0YXJnZXQ6IGFueSwgcHJvcGVydHk/OiBQcm9wZXJ0eUtleSk6IHZvaWQge1xuICAvLyBHZXQgdGhlIGNhY2hlIGxpbmtlZCB0byB0aGUgdGFyZ2V0LlxuICBjb25zdCBjYWNoZTogYW55ID0gZ2V0T3duTWV0YWRhdGEoX2dsb2JhbEtleSwgdGFyZ2V0KTtcblxuICAvLyBSZW1vdmUgdGhlIGNhY2hlIGluIGNhc2UgaXQncyBleGlzdHMuXG4gIGlzTmlsKHByb3BlcnR5KVxuICAgID8gLy8gUmVtb3ZlIHRoZSB3aG9sZSBjYWNoZS5cbiAgICAgIGRlbGV0ZU1ldGFkYXRhKF9nbG9iYWxLZXksIHRhcmdldClcbiAgICA6IC8vIFJlbW92ZSB0aGUgcHJvcGVydHkgY2FjaGUuXG4gICAgICBpc09iamVjdChjYWNoZT8uW3Byb3BlcnR5XSkgJiYgZGVsZXRlUHJvcGVydHkoY2FjaGUsIHByb3BlcnR5KTtcbn1cblxuLyoqXG4gKiBHbG9iYWwgY2FjaGUgbWFuYWdlciB1c2VkIGJ5IGRlY29yYXRvcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBHbG9iYWwgPSB7IHJlc29sdmVyLCBoYXMsIGdldCwgc2V0LCByZW1vdmUsIGNsZWFyIH07XG4iXX0=