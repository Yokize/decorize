"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = require("../decorator");
var addClass_1 = require("../registry/addClass");
/**
 * Creates legacy class decorator which execute logic on runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created class decorator.
 */
function classLegacyDecorator(name, logic, metadata) {
    // Legacy class decorator.
    return function (target) {
        // Register decorator at the class.
        addClass_1.addClass(target, {
            name: name,
            metadata: metadata,
            spec: 'legacy',
            type: decorator_1.Decorator.Class
        });
        // Execute decorator logic at runtime.
        return logic(target, metadata);
    };
}
exports.classLegacyDecorator = classLegacyDecorator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NMZWdhY3lEZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvbGVnYWN5L2NsYXNzTGVnYWN5RGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXlDO0FBQ3pDLGlEQUFnRDtBQVdoRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsSUFBUyxFQUFFLEtBQWlCLEVBQUUsUUFBYztJQUMvRSwwQkFBMEI7SUFDMUIsT0FBTyxVQUFDLE1BQVc7UUFDakIsbUNBQW1DO1FBQ25DLG1CQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxNQUFBO1lBQ0osUUFBUSxVQUFBO1lBQ1IsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxLQUFLO1NBQ3RCLENBQUMsQ0FBQztRQUVILHNDQUFzQztRQUN0QyxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWRELG9EQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVjb3JhdG9yIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IGFkZENsYXNzIH0gZnJvbSAnLi4vcmVnaXN0cnkvYWRkQ2xhc3MnO1xuXG4vKipcbiAqIERlY29yYXRvciBsb2dpYyB0byBiZSBleGVjdXRlZC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzLlxuICogQHBhcmFtIG1ldGFkYXRhIENvbmZpZ3MgJiBwYXJhbXMuXG4gKiBAcmV0dXJuIERlY29yYXRlZCBjbGFzczsgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgdHlwZSBDbGFzc0xvZ2ljID0gKHRhcmdldDogYW55LCBtZXRhZGF0YTogYW55KSA9PiBhbnkgfCB2b2lkO1xuXG4vKipcbiAqIENyZWF0ZXMgbGVnYWN5IGNsYXNzIGRlY29yYXRvciB3aGljaCBleGVjdXRlIGxvZ2ljIG9uIHJ1bnRpbWUuXG4gKlxuICogQHBhcmFtIG5hbWUgRGVjb3JhdG9yIG5hbWUuXG4gKiBAcGFyYW0gbG9naWMgTG9naWMgdG8gZXhlY3V0ZS5cbiAqIEBwYXJhbSBtZXRhZGF0YSBDb25maWdzICYgcGFyYW1zLlxuICogQHJldHVybiBDcmVhdGVkIGNsYXNzIGRlY29yYXRvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzTGVnYWN5RGVjb3JhdG9yKG5hbWU6IGFueSwgbG9naWM6IENsYXNzTG9naWMsIG1ldGFkYXRhPzogYW55KTogQ2xhc3NEZWNvcmF0b3Ige1xuICAvLyBMZWdhY3kgY2xhc3MgZGVjb3JhdG9yLlxuICByZXR1cm4gKHRhcmdldDogYW55KTogYW55IHwgdm9pZCA9PiB7XG4gICAgLy8gUmVnaXN0ZXIgZGVjb3JhdG9yIGF0IHRoZSBjbGFzcy5cbiAgICBhZGRDbGFzcyh0YXJnZXQsIHtcbiAgICAgIG5hbWUsXG4gICAgICBtZXRhZGF0YSxcbiAgICAgIHNwZWM6ICdsZWdhY3knLFxuICAgICAgdHlwZTogRGVjb3JhdG9yLkNsYXNzXG4gICAgfSk7XG5cbiAgICAvLyBFeGVjdXRlIGRlY29yYXRvciBsb2dpYyBhdCBydW50aW1lLlxuICAgIHJldHVybiBsb2dpYyh0YXJnZXQsIG1ldGFkYXRhKTtcbiAgfTtcbn1cbiJdfQ==