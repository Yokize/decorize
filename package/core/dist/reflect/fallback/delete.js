"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var deleteProperty_1 = require("../deleteProperty");
var storage_1 = require("./storage");
function deleteFromStorage(key, target, property) {
    // Get existing storage from the object.
    var storage = storage_1.getStorage(target);
    // Delete the metadata from the storage.
    return isUndefined_1.default(property)
        ? deleteProperty_1.deleteProperty(storage.root, key)
        : !isUndefined_1.default(storage.prop[property]) && deleteProperty_1.deleteProperty(storage.prop[property], key);
}
exports.deleteFromStorage = deleteFromStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JlZmxlY3QvZmFsbGJhY2svZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUVBQTZDO0FBQzdDLG9EQUFtRDtBQUNuRCxxQ0FBZ0Q7QUF3QmhELFNBQWdCLGlCQUFpQixDQUFDLEdBQVEsRUFBRSxNQUFjLEVBQUUsUUFBc0I7SUFDaEYsd0NBQXdDO0lBQ3hDLElBQU0sT0FBTyxHQUFZLG9CQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFNUMsd0NBQXdDO0lBQ3hDLE9BQU8scUJBQVcsQ0FBQyxRQUFRLENBQUM7UUFDMUIsQ0FBQyxDQUFDLCtCQUFjLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUMscUJBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksK0JBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFGLENBQUM7QUFSRCw4Q0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1VuZGVmaW5lZCBmcm9tICdsb2Rhc2gvaXNVbmRlZmluZWQnO1xuaW1wb3J0IHsgZGVsZXRlUHJvcGVydHkgfSBmcm9tICcuLi9kZWxldGVQcm9wZXJ0eSc7XG5pbXBvcnQgeyBnZXRTdG9yYWdlLCBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcblxuLyoqXG4gKiBDdXN0b20gbG9naWMgdG8gZGVsZXRlIHRoZSBtZXRhZGF0YSBmcm9tIHRoZSBvYmplY3QuXG4gKiBOb3QgaW5jbHVkZWQgYW55IG1ldGFkYXRhIGV4aXN0ZW5jZSBjaGVja2luZyBhcyBpdHMgZG9uZSBvbiBoaWdoZXIgbGV2ZWxcbiAqIHdpdGggYXBwcm9wcmlhdGUgaGFuZGxpbmcuXG4gKlxuICogQHBhcmFtIGtleSBLZXkgdXNlZCB0byBmaW5kIGFuZCByZW1vdmUgbWV0YWRhdGEuXG4gKiBAcGFyYW0gdGFyZ2V0IE9iamVjdCBmcm9tIHdoaWNoIHRvIHJlbW92ZSBtZXRhZGF0YS5cbiAqIEByZXR1cm4gVHJ1ZSBpbiBjYXNlIHRoZSBtZXRhZGF0YSBoYXMgYmVlbiBmb3VuZCBhbmQgZGVsZXRlZDsgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlRnJvbVN0b3JhZ2Uoa2V5OiBhbnksIHRhcmdldDogb2JqZWN0KTogYm9vbGVhbjtcblxuLyoqXG4gKiBDdXN0b20gbG9naWMgdG8gZGVsZXRlIHRoZSBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggcHJvcGVydHkgZnJvbSB0aGUgb2JqZWN0LlxuICogTm90IGluY2x1ZGVkIGFueSBtZXRhZGF0YSBleGlzdGVuY2UgY2hlY2tpbmcgYXMgaXRzIGRvbmUgb24gaGlnaGVyIGxldmVsXG4gKiB3aXRoIGFwcHJvcHJpYXRlIGhhbmRsaW5nLlxuICpcbiAqIEBwYXJhbSBrZXkgS2V5IHVzZWQgdG8gZmluZCBhbmQgcmVtb3ZlIG1ldGFkYXRhLlxuICogQHBhcmFtIHRhcmdldCBPYmplY3QgZnJvbSB3aGljaCB0byByZW1vdmUgbWV0YWRhdGEuXG4gKiBAcGFyYW0gcHJvcGVydHkgUHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIG1ldGFkYXRhLlxuICogQHJldHVybiBUcnVlIGluIGNhc2UgdGhlIG1ldGFkYXRhIGhhcyBiZWVuIGZvdW5kIGFuZCBkZWxldGVkOyBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVGcm9tU3RvcmFnZShrZXk6IGFueSwgdGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eUtleSk6IGJvb2xlYW47XG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlRnJvbVN0b3JhZ2Uoa2V5OiBhbnksIHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eT86IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gIC8vIEdldCBleGlzdGluZyBzdG9yYWdlIGZyb20gdGhlIG9iamVjdC5cbiAgY29uc3Qgc3RvcmFnZTogU3RvcmFnZSA9IGdldFN0b3JhZ2UodGFyZ2V0KTtcblxuICAvLyBEZWxldGUgdGhlIG1ldGFkYXRhIGZyb20gdGhlIHN0b3JhZ2UuXG4gIHJldHVybiBpc1VuZGVmaW5lZChwcm9wZXJ0eSlcbiAgICA/IGRlbGV0ZVByb3BlcnR5KHN0b3JhZ2Uucm9vdCwga2V5KVxuICAgIDogIWlzVW5kZWZpbmVkKHN0b3JhZ2UucHJvcFtwcm9wZXJ0eV0pICYmIGRlbGV0ZVByb3BlcnR5KHN0b3JhZ2UucHJvcFtwcm9wZXJ0eV0sIGtleSk7XG59XG4iXX0=