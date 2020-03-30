import { ContextType } from './contextType';
export declare function getClassContextType(context: any, clazz: Function, prop: PropertyKey): ContextType;
export declare function getInstanceContextType(context: any, proto: any, prop: PropertyKey): ContextType;
export declare function getContextType(context: any, base: any, property: PropertyKey): ContextType;
