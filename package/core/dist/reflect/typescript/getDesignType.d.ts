/**
 * Get designed type of property.
 * Typescript support an experimental reflection feature which
 * emit metadata with parameter types.
 *
 * @param target Object associated with metadata.
 * @param property Property for which to get designed type.
 * @return Lexically designed property type.
 */
export declare function getDesignType(target: object, property: PropertyKey): any;
