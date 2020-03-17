/**
 * Get unique identifier of the decorator.
 */
export declare function getDecoratorId(): string;
/**
 * Structure of the clear config.
 */
export interface ClearConfig {
    /**
     * Before execution.
     */
    before?: boolean;
    /**
     * After execution.
     */
    after?: boolean;
    /**
     * On getter execution.
     */
    getter?: boolean;
    /**
     * On setter execution.
     */
    setter?: boolean;
}
/**
 * Throw error in case the decorator used incorrectly.
 */
export declare function throwIncorrectUsage(): never;
