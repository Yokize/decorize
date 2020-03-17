"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_1 = __importDefault(require("lodash/isObject"));
var getProperty_1 = require("./getProperty");
var hasOwnProperty_1 = require("./hasOwnProperty");
/**
 * Get value under own property from the object.
 *
 * @param target Object in which to look for the property.
 * @param property Name of the property to find.
 * @return Retrieved property value; undefined otherwise.
 * @throws TypeError in case of non-object target.
 */
function getOwnProperty(target, property) {
    // Verify whether target is object.
    if (isObject_1.default(target))
        // Get only in case it's defined directly on object.
        return hasOwnProperty_1.hasOwnProperty(target, property) ? getProperty_1.getProperty(target, property) : undefined;
    else
        throw new TypeError('Own property can be retrieved only from the object');
}
exports.getOwnProperty = getOwnProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0T3duUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVmbGVjdC9nZXRPd25Qcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUF1QztBQUN2Qyw2Q0FBNEM7QUFDNUMsbURBQWtEO0FBRWxEOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQixjQUFjLENBQUMsTUFBYyxFQUFFLFFBQXFCO0lBQ2xFLG1DQUFtQztJQUNuQyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO1FBQ2xCLG9EQUFvRDtRQUNwRCxPQUFPLCtCQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDOztRQUNqRixNQUFNLElBQUksU0FBUyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7QUFDakYsQ0FBQztBQU5ELHdDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XG5pbXBvcnQgeyBnZXRQcm9wZXJ0eSB9IGZyb20gJy4vZ2V0UHJvcGVydHknO1xuaW1wb3J0IHsgaGFzT3duUHJvcGVydHkgfSBmcm9tICcuL2hhc093blByb3BlcnR5JztcblxuLyoqXG4gKiBHZXQgdmFsdWUgdW5kZXIgb3duIHByb3BlcnR5IGZyb20gdGhlIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IE9iamVjdCBpbiB3aGljaCB0byBsb29rIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcGFyYW0gcHJvcGVydHkgTmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZmluZC5cbiAqIEByZXR1cm4gUmV0cmlldmVkIHByb3BlcnR5IHZhbHVlOyB1bmRlZmluZWQgb3RoZXJ3aXNlLlxuICogQHRocm93cyBUeXBlRXJyb3IgaW4gY2FzZSBvZiBub24tb2JqZWN0IHRhcmdldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE93blByb3BlcnR5KHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eTogUHJvcGVydHlLZXkpOiBhbnkge1xuICAvLyBWZXJpZnkgd2hldGhlciB0YXJnZXQgaXMgb2JqZWN0LlxuICBpZiAoaXNPYmplY3QodGFyZ2V0KSlcbiAgICAvLyBHZXQgb25seSBpbiBjYXNlIGl0J3MgZGVmaW5lZCBkaXJlY3RseSBvbiBvYmplY3QuXG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5KHRhcmdldCwgcHJvcGVydHkpID8gZ2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkgOiB1bmRlZmluZWQ7XG4gIGVsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcignT3duIHByb3BlcnR5IGNhbiBiZSByZXRyaWV2ZWQgb25seSBmcm9tIHRoZSBvYmplY3QnKTtcbn1cbiJdfQ==