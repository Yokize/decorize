"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setClassRegistry_1 = require("./setClassRegistry");
var getClassRegistry_1 = require("./getClassRegistry");
/**
 * Register the decorator in the class registry for advanced
 * decoration and inspection.
 *
 * @param target Class (prototype).
 * @param entry Decorator data.
 */
function addClass(target, entry) {
    // Get the registry or create new.
    var registry = getClassRegistry_1.getOrCreateClassRegistry(target);
    // Add directly to the registry.
    registry.decorator.push(entry);
    // Link registry with the class (prototype).
    setClassRegistry_1.setClassRegistry(target, registry);
}
exports.addClass = addClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVnaXN0cnkvYWRkQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBc0Q7QUFDdEQsdURBQThEO0FBRzlEOzs7Ozs7R0FNRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxNQUFjLEVBQUUsS0FBeUI7SUFDaEUsa0NBQWtDO0lBQ2xDLElBQU0sUUFBUSxHQUFrQiwyQ0FBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqRSxnQ0FBZ0M7SUFDaEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFL0IsNENBQTRDO0lBQzVDLG1DQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBVEQsNEJBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXRDbGFzc1JlZ2lzdHJ5IH0gZnJvbSAnLi9zZXRDbGFzc1JlZ2lzdHJ5JztcbmltcG9ydCB7IGdldE9yQ3JlYXRlQ2xhc3NSZWdpc3RyeSB9IGZyb20gJy4vZ2V0Q2xhc3NSZWdpc3RyeSc7XG5pbXBvcnQgeyBDbGFzc1JlZ2lzdHJ5LCBDbGFzc1JlZ2lzdHJ5RW50cnkgfSBmcm9tICcuL2NsYXNzUmVnaXN0cnknO1xuXG4vKipcbiAqIFJlZ2lzdGVyIHRoZSBkZWNvcmF0b3IgaW4gdGhlIGNsYXNzIHJlZ2lzdHJ5IGZvciBhZHZhbmNlZFxuICogZGVjb3JhdGlvbiBhbmQgaW5zcGVjdGlvbi5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIGVudHJ5IERlY29yYXRvciBkYXRhLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3ModGFyZ2V0OiBvYmplY3QsIGVudHJ5OiBDbGFzc1JlZ2lzdHJ5RW50cnkpOiB2b2lkIHtcbiAgLy8gR2V0IHRoZSByZWdpc3RyeSBvciBjcmVhdGUgbmV3LlxuICBjb25zdCByZWdpc3RyeTogQ2xhc3NSZWdpc3RyeSA9IGdldE9yQ3JlYXRlQ2xhc3NSZWdpc3RyeSh0YXJnZXQpO1xuXG4gIC8vIEFkZCBkaXJlY3RseSB0byB0aGUgcmVnaXN0cnkuXG4gIHJlZ2lzdHJ5LmRlY29yYXRvci5wdXNoKGVudHJ5KTtcblxuICAvLyBMaW5rIHJlZ2lzdHJ5IHdpdGggdGhlIGNsYXNzIChwcm90b3R5cGUpLlxuICBzZXRDbGFzc1JlZ2lzdHJ5KHRhcmdldCwgcmVnaXN0cnkpO1xufVxuIl19