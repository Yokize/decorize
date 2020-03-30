import isFunction from 'lodash/isFunction';
import { ContextType } from './contextType';
import { hasProperty } from '../reflect/hasProperty';

export function getClassContextType(context: any, clazz: Function, prop: PropertyKey): ContextType {
  return context !== clazz
    ? hasProperty(context, prop)
      ? ContextType.Inheritor
      : ContextType.Unknown
    : ContextType.Original;
}

export function getInstanceContextType(context: any, proto: any, prop: PropertyKey): ContextType {
  return context.constructor !== proto.constructor
    ? hasProperty(context, prop)
      ? ContextType.Inheritor
      : ContextType.Unknown
    : ContextType.Original;
}

export function getContextType(context: any, base: any, property: PropertyKey): ContextType {
  return isFunction(context) && isFunction(base)
    ? getClassContextType(context, base, property)
    : getInstanceContextType(context, base, property);
}
