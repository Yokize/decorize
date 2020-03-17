"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="reflect-metadata" />
var isObject_1 = __importDefault(require("lodash/isObject"));
var proto_1 = require("./fallback/proto");
var has_1 = require("./fallback/has");
/* istanbul ignore next */
var builtInReflect = Reflect === null || Reflect === void 0 ? void 0 : Reflect.hasMetadata;
/**
 * Reflect check existence of a key at map related to object or property with
 * additional checking at prototype chain. Fallback check whether key is defined
 * in private storage directly on the object or its prototype chain. Reflect and
 * Fallback is aligned to get prototype chain in same way. Fallback approach have
 * limitation to check metadata existence on non-object target.
 */
var _hasMetadata = builtInReflect !== null && builtInReflect !== void 0 ? builtInReflect : function hasMetadataFk(key, target, property) {
    return isObject_1.default(target)
        ? has_1.hasInStorage(key, target, property) || _hasMetadata(key, proto_1.getProtoOf(target), property)
        : false;
};
function hasMetadata(key, target, property) {
    return _hasMetadata(key, target, property);
}
exports.hasMetadata = hasMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzTWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9oYXNNZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBDQUEwQztBQUMxQyw2REFBdUM7QUFDdkMsMENBQThDO0FBQzlDLHNDQUE4QztBQUU5QywwQkFBMEI7QUFDMUIsSUFBTSxjQUFjLEdBQVEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsQ0FBQztBQUVqRDs7Ozs7O0dBTUc7QUFDSCxJQUFNLFlBQVksR0FDaEIsY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQ2QsU0FBUyxhQUFhLENBQUMsR0FBUSxFQUFFLE1BQWMsRUFBRSxRQUFzQjtJQUNyRSxPQUFPLGtCQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxrQkFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQztRQUN4RixDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ1osQ0FBQyxDQUFDO0FBc0JKLFNBQWdCLFdBQVcsQ0FBQyxHQUFRLEVBQUUsTUFBYyxFQUFFLFFBQXNCO0lBQzFFLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUZELGtDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJyZWZsZWN0LW1ldGFkYXRhXCIgLz5cbmltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2gvaXNPYmplY3QnO1xuaW1wb3J0IHsgZ2V0UHJvdG9PZiB9IGZyb20gJy4vZmFsbGJhY2svcHJvdG8nO1xuaW1wb3J0IHsgaGFzSW5TdG9yYWdlIH0gZnJvbSAnLi9mYWxsYmFjay9oYXMnO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuY29uc3QgYnVpbHRJblJlZmxlY3Q6IGFueSA9IFJlZmxlY3Q/Lmhhc01ldGFkYXRhO1xuXG4vKipcbiAqIFJlZmxlY3QgY2hlY2sgZXhpc3RlbmNlIG9mIGEga2V5IGF0IG1hcCByZWxhdGVkIHRvIG9iamVjdCBvciBwcm9wZXJ0eSB3aXRoXG4gKiBhZGRpdGlvbmFsIGNoZWNraW5nIGF0IHByb3RvdHlwZSBjaGFpbi4gRmFsbGJhY2sgY2hlY2sgd2hldGhlciBrZXkgaXMgZGVmaW5lZFxuICogaW4gcHJpdmF0ZSBzdG9yYWdlIGRpcmVjdGx5IG9uIHRoZSBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbi4gUmVmbGVjdCBhbmRcbiAqIEZhbGxiYWNrIGlzIGFsaWduZWQgdG8gZ2V0IHByb3RvdHlwZSBjaGFpbiBpbiBzYW1lIHdheS4gRmFsbGJhY2sgYXBwcm9hY2ggaGF2ZVxuICogbGltaXRhdGlvbiB0byBjaGVjayBtZXRhZGF0YSBleGlzdGVuY2Ugb24gbm9uLW9iamVjdCB0YXJnZXQuXG4gKi9cbmNvbnN0IF9oYXNNZXRhZGF0YTogKGtleTogYW55LCB0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHk/OiBQcm9wZXJ0eUtleSkgPT4gYm9vbGVhbiA9XG4gIGJ1aWx0SW5SZWZsZWN0ID8/XG4gIGZ1bmN0aW9uIGhhc01ldGFkYXRhRmsoa2V5OiBhbnksIHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eT86IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHRhcmdldClcbiAgICAgID8gaGFzSW5TdG9yYWdlKGtleSwgdGFyZ2V0LCBwcm9wZXJ0eSkgfHwgX2hhc01ldGFkYXRhKGtleSwgZ2V0UHJvdG9PZih0YXJnZXQpLCBwcm9wZXJ0eSlcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIG1ldGFkYXRhIGFzc29jaWF0ZWQgd2l0aCBvYmplY3Qgb3IgaXRzXG4gKiBwcm90b3R5cGUgY2hhaW4gaXMgZGVmaW5lZC5cbiAqXG4gKiBAcGFyYW0ga2V5IEtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAqIEBwYXJhbSB0YXJnZXQgT2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBtZXRhZGF0YS5cbiAqIEByZXR1cm4gVHJ1ZSBpbiBjYXNlIHRoZSBtZXRhZGF0YSBkZWZpbmVkOyBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNNZXRhZGF0YShrZXk6IGFueSwgdGFyZ2V0OiBvYmplY3QpOiBib29sZWFuO1xuXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggcHJvcGVydHkgb3IgaXRzXG4gKiBwcm90b3R5cGUgY2hhaW4gaXMgZGVmaW5lZC5cbiAqXG4gKiBAcGFyYW0ga2V5IEtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAqIEBwYXJhbSB0YXJnZXQgT2JqZWN0IHdoaWNoIGNvbnRhaW5zIHByb3BlcnR5LlxuICogQHBhcmFtIHByb3BlcnR5IFByb3BlcnR5IGFzc29jaWF0ZWQgd2l0aCBtZXRhZGF0YS5cbiAqIEByZXR1cm4gVHJ1ZSBpbiBjYXNlIHRoZSBtZXRhZGF0YSBkZWZpbmVkOyBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNNZXRhZGF0YShrZXk6IGFueSwgdGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5OiBQcm9wZXJ0eUtleSk6IGJvb2xlYW47XG5leHBvcnQgZnVuY3Rpb24gaGFzTWV0YWRhdGEoa2V5OiBhbnksIHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eT86IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG4gIHJldHVybiBfaGFzTWV0YWRhdGEoa2V5LCB0YXJnZXQsIHByb3BlcnR5KTtcbn1cbiJdfQ==