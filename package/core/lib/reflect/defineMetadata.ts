/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { defineInStorage } from './fallback/define';

/* istanbul ignore next */
const ReflectBuiltIn: any = Reflect?.defineMetadata;

/**
 * The implementation of Reflect and Fallback differs in the way metadata is
 * stored. Reflect creates a separate map for each `target` and its `property`,
 * which stores the keys and corresponding metadata. The fallback implementation
 * stores metadata directly on the `target` under a special non-configurable
 * property.
 */
const _defineMetadata: (key: any, value: any, target: object, property?: PropertyKey) => void =
  ReflectBuiltIn ??
  function defineMetadataFk(key: any, value: any, target: object, property?: PropertyKey): void {
    if (isObject(target)) defineInStorage(key, value, target, property);
    else throw new TypeError('Metadata can only be defined on the object');
  };

/**
 * Define the metadata associated with the `target`.
 *
 * @param key The key used to store metadata.
 * @param value The value that contains metadata.
 * @param target The object to be associated with metadata.
 * @throws TypeError in case of target type violation.
 */
export function defineMetadata(key: any, value: any, target: object): void;

/**
 * Define the metadata associated with the `target` and `property`.
 *
 * @param key The key used to store metadata.
 * @param value The value that contains metadata.
 * @param target The object to be associated with metadata.
 * @param property The property to be associated with metadata.
 * @throws TypeError in case of target type violation.
 */
export function defineMetadata(key: any, value: any, target: object, property: PropertyKey): void;
export function defineMetadata(key: any, value: any, target: object, property?: PropertyKey): void {
  _defineMetadata(key, value, target, property);
}
