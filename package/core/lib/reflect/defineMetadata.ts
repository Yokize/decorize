/// <reference types="reflect-metadata" />
import isObject from 'lodash/isObject';
import { defineInStorage } from './fallback/define';

/* istanbul ignore next */
const builtInReflect: any = Reflect?.defineMetadata;

/**
 * Reflect and Fallback differs in a way how metadata is stored. Reflect creates
 * for each object and property separate map to store keys and corresponding
 * metadata. Fallback store metadata directly on the object under special non
 * configurable property. Fallback have limitation to define metadata at
 * non-object target.
 */
const _defineMetadata: (key: any, value: any, target: object, property?: PropertyKey) => void =
  builtInReflect ??
  function defineMetadataFk(key: any, value: any, target: object, property?: PropertyKey): void {
    // Verify whether target is object.
    if (isObject(target))
      // Define metadata associated with target or property.
      defineInStorage(key, value, target, property);
    else throw new TypeError('Metadata can be defined only on the object');
  };

/**
 * Define the metadata associated with object.
 *
 * @param key Key used to store and retrieve metadata.
 * @param value Value which contains metadata.
 * @param target Object to be associated with metadata.
 * @throws TypeError in case of non-object target.
 */
export function defineMetadata(key: any, value: any, target: object): void;

/**
 * Define the metadata associated with property.
 *
 * @param key Key used to store and retrieve metadata.
 * @param value Value which contains metadata.
 * @param target Object which contains property.
 * @param property Property to be associated with metadata.
 * @throws TypeError in case of non-object target.
 */
export function defineMetadata(key: any, value: any, target: object, property: PropertyKey): void;
export function defineMetadata(key: any, value: any, target: object, property?: PropertyKey): void {
  _defineMetadata(key, value, target, property);
}
