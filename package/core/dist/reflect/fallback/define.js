"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var storage_1 = require("./storage");
function defineInStorage(key, value, target, property) {
    var _a;
    // Create new or get existing storage from the target object.
    var storage = storage_1.getOrCreateStorage(target);
    // Determine where to store value.
    isUndefined_1.default(property)
        ? (storage.root[key] = value)
        : isUndefined_1.default(storage.prop[property])
            ? (storage.prop[property] = (_a = {}, _a[key] = value, _a))
            : (storage.prop[property][key] = value);
}
exports.defineInStorage = defineInStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JlZmxlY3QvZmFsbGJhY2svZGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUVBQTZDO0FBQzdDLHFDQUF3RDtBQW9CeEQsU0FBZ0IsZUFBZSxDQUFDLEdBQVEsRUFBRSxLQUFVLEVBQUUsTUFBYyxFQUFFLFFBQXNCOztJQUMxRiw2REFBNkQ7SUFDN0QsSUFBTSxPQUFPLEdBQVksNEJBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEQsa0NBQWtDO0lBQ2xDLHFCQUFXLENBQUMsUUFBUSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxxQkFBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBSyxHQUFDLEdBQUcsSUFBRyxLQUFLLEtBQUUsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFWRCwwQ0FVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1VuZGVmaW5lZCBmcm9tICdsb2Rhc2gvaXNVbmRlZmluZWQnO1xuaW1wb3J0IHsgZ2V0T3JDcmVhdGVTdG9yYWdlLCBTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlJztcblxuLyoqXG4gKiBDdXN0b20gbG9naWMgdG8gZGVmaW5lIHRoZSBtZXRhZGF0YSBvbiB0aGUgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSBrZXkgS2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICogQHBhcmFtIHZhbHVlIFZhbHVlIHdoaWNoIGNvbnRhaW5zIG1ldGFkYXRhLlxuICogQHBhcmFtIHRhcmdldCBPYmplY3Qgb24gd2hpY2ggdG8gZGVmaW5lIG1ldGFkYXRhLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lSW5TdG9yYWdlKGtleTogYW55LCB2YWx1ZTogYW55LCB0YXJnZXQ6IG9iamVjdCk6IHZvaWQ7XG5cbi8qKlxuICogQ3VzdG9tIGxvZ2ljIHRvIGRlZmluZSB0aGUgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHByb3BlcnR5IG9uIHRoZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIGtleSBLZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gKiBAcGFyYW0gdmFsdWUgVmFsdWUgd2hpY2ggY29udGFpbnMgbWV0YWRhdGEuXG4gKiBAcGFyYW0gdGFyZ2V0IE9iamVjdCBvbiB3aGljaCB0byBkZWZpbmUgbWV0YWRhdGEuXG4gKiBAcGFyYW0gcHJvcGVydHkgUHJvcGVydHkgdG8gYmUgYXNzb2NpYXRlZCB3aXRoIG1ldGFkYXRhLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lSW5TdG9yYWdlKGtleTogYW55LCB2YWx1ZTogYW55LCB0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVJblN0b3JhZ2Uoa2V5OiBhbnksIHZhbHVlOiBhbnksIHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eT86IFByb3BlcnR5S2V5KTogdm9pZCB7XG4gIC8vIENyZWF0ZSBuZXcgb3IgZ2V0IGV4aXN0aW5nIHN0b3JhZ2UgZnJvbSB0aGUgdGFyZ2V0IG9iamVjdC5cbiAgY29uc3Qgc3RvcmFnZTogU3RvcmFnZSA9IGdldE9yQ3JlYXRlU3RvcmFnZSh0YXJnZXQpO1xuXG4gIC8vIERldGVybWluZSB3aGVyZSB0byBzdG9yZSB2YWx1ZS5cbiAgaXNVbmRlZmluZWQocHJvcGVydHkpXG4gICAgPyAoc3RvcmFnZS5yb290W2tleV0gPSB2YWx1ZSlcbiAgICA6IGlzVW5kZWZpbmVkKHN0b3JhZ2UucHJvcFtwcm9wZXJ0eV0pXG4gICAgPyAoc3RvcmFnZS5wcm9wW3Byb3BlcnR5XSA9IHsgW2tleV06IHZhbHVlIH0pXG4gICAgOiAoc3RvcmFnZS5wcm9wW3Byb3BlcnR5XVtrZXldID0gdmFsdWUpO1xufVxuIl19