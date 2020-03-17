"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = require("../decorator");
var addProperty_1 = require("../registry/addProperty");
/**
 * Creates legacy property decorator which execute logic on runtime.
 *
 * @param name Decorator name.
 * @param logic Logic to execute.
 * @param metadata Configs & params.
 * @return Created property decorator.
 */
function propertyLegacyDecorator(name, logic, metadata) {
    // Legacy property decorator.
    return function (target, property) {
        // Register decorator at the property.
        addProperty_1.addProperty(target, property, {
            name: name,
            metadata: metadata,
            spec: 'legacy',
            type: decorator_1.Decorator.Property
        });
        // Execute decorator logic at runtime.
        logic(target, property, metadata);
    };
}
exports.propertyLegacyDecorator = propertyLegacyDecorator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlMZWdhY3lEZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvbGVnYWN5L3Byb3BlcnR5TGVnYWN5RGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXlDO0FBQ3pDLHVEQUFzRDtBQVd0RDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsdUJBQXVCLENBQUMsSUFBUyxFQUFFLEtBQW9CLEVBQUUsUUFBYztJQUNyRiw2QkFBNkI7SUFDN0IsT0FBTyxVQUFDLE1BQWMsRUFBRSxRQUFxQjtRQUMzQyxzQ0FBc0M7UUFDdEMseUJBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFO1lBQzVCLElBQUksTUFBQTtZQUNKLFFBQVEsVUFBQTtZQUNSLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFFLHFCQUFTLENBQUMsUUFBUTtTQUN6QixDQUFDLENBQUM7UUFFSCxzQ0FBc0M7UUFDdEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWRELDBEQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVjb3JhdG9yIH0gZnJvbSAnLi4vZGVjb3JhdG9yJztcbmltcG9ydCB7IGFkZFByb3BlcnR5IH0gZnJvbSAnLi4vcmVnaXN0cnkvYWRkUHJvcGVydHknO1xuXG4vKipcbiAqIERlY29yYXRvciBsb2dpYyB0byBiZSBleGVjdXRlZC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IENsYXNzIChwcm90b3R5cGUpLlxuICogQHBhcmFtIHByb3BlcnR5IFByb3BlcnR5IG5hbWUuXG4gKiBAcGFyYW0gbWV0YWRhdGEgQ29uZmlncyAmIHBhcmFtcy5cbiAqL1xuZXhwb3J0IHR5cGUgUHJvcGVydHlMb2dpYyA9ICh0YXJnZXQ6IGFueSwgcHJvcGVydHk6IFByb3BlcnR5S2V5LCBtZXRhZGF0YTogYW55KSA9PiB2b2lkO1xuXG4vKipcbiAqIENyZWF0ZXMgbGVnYWN5IHByb3BlcnR5IGRlY29yYXRvciB3aGljaCBleGVjdXRlIGxvZ2ljIG9uIHJ1bnRpbWUuXG4gKlxuICogQHBhcmFtIG5hbWUgRGVjb3JhdG9yIG5hbWUuXG4gKiBAcGFyYW0gbG9naWMgTG9naWMgdG8gZXhlY3V0ZS5cbiAqIEBwYXJhbSBtZXRhZGF0YSBDb25maWdzICYgcGFyYW1zLlxuICogQHJldHVybiBDcmVhdGVkIHByb3BlcnR5IGRlY29yYXRvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5TGVnYWN5RGVjb3JhdG9yKG5hbWU6IGFueSwgbG9naWM6IFByb3BlcnR5TG9naWMsIG1ldGFkYXRhPzogYW55KTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICAvLyBMZWdhY3kgcHJvcGVydHkgZGVjb3JhdG9yLlxuICByZXR1cm4gKHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eTogUHJvcGVydHlLZXkpOiB2b2lkID0+IHtcbiAgICAvLyBSZWdpc3RlciBkZWNvcmF0b3IgYXQgdGhlIHByb3BlcnR5LlxuICAgIGFkZFByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHtcbiAgICAgIG5hbWUsXG4gICAgICBtZXRhZGF0YSxcbiAgICAgIHNwZWM6ICdsZWdhY3knLFxuICAgICAgdHlwZTogRGVjb3JhdG9yLlByb3BlcnR5XG4gICAgfSk7XG5cbiAgICAvLyBFeGVjdXRlIGRlY29yYXRvciBsb2dpYyBhdCBydW50aW1lLlxuICAgIGxvZ2ljKHRhcmdldCwgcHJvcGVydHksIG1ldGFkYXRhKTtcbiAgfTtcbn1cbiJdfQ==