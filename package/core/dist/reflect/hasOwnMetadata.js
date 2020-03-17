"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="reflect-metadata" />
var isObject_1 = __importDefault(require("lodash/isObject"));
var has_1 = require("./fallback/has");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.hasOwnMetadata;
/**
 * Reflect check existence of key at map related to object and property. Fallback
 * is checking whether the key is defined at private storage directly on the object.
 * Fallback approach have limitation to check metadata existence on non-object target.
 */
var _hasOwnMetadata = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function hasOwnMetadataFk(key, target, property) {
    return isObject_1.default(target) ? has_1.hasInStorage(key, target, property) : false;
};
function hasOwnMetadata(key, target, property) {
    return _hasOwnMetadata(key, target, property);
}
exports.hasOwnMetadata = hasOwnMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzT3duTWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9oYXNPd25NZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBDQUEwQztBQUMxQyw2REFBdUM7QUFDdkMsc0NBQThDO0FBRTlDLDBCQUEwQjtBQUMxQixJQUFNLGNBQWMsR0FBUSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsY0FBYyxDQUFDO0FBRXBEOzs7O0dBSUc7QUFDSCxJQUFNLGVBQWUsR0FDbkIsY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQ2QsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFRLEVBQUUsTUFBYyxFQUFFLFFBQXNCO0lBQ3hFLE9BQU8sa0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDeEUsQ0FBQyxDQUFDO0FBb0JKLFNBQWdCLGNBQWMsQ0FBQyxHQUFRLEVBQUUsTUFBYyxFQUFFLFFBQXNCO0lBQzdFLE9BQU8sZUFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUZELHdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJyZWZsZWN0LW1ldGFkYXRhXCIgLz5cbmltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2gvaXNPYmplY3QnO1xuaW1wb3J0IHsgaGFzSW5TdG9yYWdlIH0gZnJvbSAnLi9mYWxsYmFjay9oYXMnO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuY29uc3QgYnVpbHRJblJlZmxlY3Q6IGFueSA9IFJlZmxlY3Q/Lmhhc093bk1ldGFkYXRhO1xuXG4vKipcbiAqIFJlZmxlY3QgY2hlY2sgZXhpc3RlbmNlIG9mIGtleSBhdCBtYXAgcmVsYXRlZCB0byBvYmplY3QgYW5kIHByb3BlcnR5LiBGYWxsYmFja1xuICogaXMgY2hlY2tpbmcgd2hldGhlciB0aGUga2V5IGlzIGRlZmluZWQgYXQgcHJpdmF0ZSBzdG9yYWdlIGRpcmVjdGx5IG9uIHRoZSBvYmplY3QuXG4gKiBGYWxsYmFjayBhcHByb2FjaCBoYXZlIGxpbWl0YXRpb24gdG8gY2hlY2sgbWV0YWRhdGEgZXhpc3RlbmNlIG9uIG5vbi1vYmplY3QgdGFyZ2V0LlxuICovXG5jb25zdCBfaGFzT3duTWV0YWRhdGE6IChrZXk6IGFueSwgdGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5PzogUHJvcGVydHlLZXkpID0+IGJvb2xlYW4gPVxuICBidWlsdEluUmVmbGVjdCA/P1xuICBmdW5jdGlvbiBoYXNPd25NZXRhZGF0YUZrKGtleTogYW55LCB0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk/OiBQcm9wZXJ0eUtleSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc09iamVjdCh0YXJnZXQpID8gaGFzSW5TdG9yYWdlKGtleSwgdGFyZ2V0LCBwcm9wZXJ0eSkgOiBmYWxzZTtcbiAgfTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIG9iamVjdCBpcyBkZWZpbmVkLlxuICpcbiAqIEBwYXJhbSBrZXkgS2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICogQHBhcmFtIHRhcmdldCBPYmplY3QgYXNzb2NpYXRlZCB3aXRoIG1ldGFkYXRhLlxuICogQHJldHVybiBUcnVlIGluIGNhc2UgdGhlIG1ldGFkYXRhIGRlZmluZWQ7IGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc093bk1ldGFkYXRhKGtleTogYW55LCB0YXJnZXQ6IG9iamVjdCk6IGJvb2xlYW47XG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCBwcm9wZXJ0eSBpcyBkZWZpbmVkLlxuICpcbiAqIEBwYXJhbSBrZXkgS2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICogQHBhcmFtIHRhcmdldCBPYmplY3Qgd2hpY2ggY29udGFpbnMgcHJvcGVydHkuXG4gKiBAcGFyYW0gcHJvcGVydHkgUHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIG1ldGFkYXRhLlxuICogQHJldHVybiBUcnVlIGluIGNhc2UgdGhlIG1ldGFkYXRhIGRlZmluZWQ7IGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc093bk1ldGFkYXRhKGtleTogYW55LCB0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk6IFByb3BlcnR5S2V5KTogYm9vbGVhbjtcbmV4cG9ydCBmdW5jdGlvbiBoYXNPd25NZXRhZGF0YShrZXk6IGFueSwgdGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5PzogUHJvcGVydHlLZXkpOiBib29sZWFuIHtcbiAgcmV0dXJuIF9oYXNPd25NZXRhZGF0YShrZXksIHRhcmdldCwgcHJvcGVydHkpO1xufVxuIl19