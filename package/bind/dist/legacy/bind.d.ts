/**
 * Bind all the methods of the class to the context used to access it.
 *
 * @param target Class.
 * @return Decorated class.
 */
export declare function Bind<T extends Function>(target: T): T;
/**
 * Bind the method or all methods of the class to the context used to access it.
 *
 * @return Class or method decorator.
 */
export declare function Bind(): ClassDecorator & MethodDecorator;
/**
 * Bind the method to the context used to access it.
 *
 * @param target Prototype.
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @return The descriptor with the bind logic.
 */
export declare function Bind(target: object, property: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor;
/**
 * Bind all the methods of the class to the context used to access it.
 *
 * @param target Class.
 * @return Decorated class.
 */
export declare function bind<T extends Function>(target: T): T;
/**
 * Bind the method or all methods of the class to the context used to access it.
 *
 * @return Class or method decorator.
 */
export declare function bind(): ClassDecorator & MethodDecorator;
/**
 * Bind the method to the context used to access it.
 *
 * @param target Prototype.
 * @param property Method name.
 * @param descriptor Method descriptor.
 * @return The descriptor with the bind logic.
 */
export declare function bind(target: object, property: PropertyKey, descriptor: PropertyDescriptor): any;
