/**
 * Get unique identifier of the decorator.
 */
export function getDecoratorId(): string {
  return 'decorize:cache:@clear';
}

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
export function throwIncorrectUsage(): never {
  throw new Error(`${getDecoratorId()} must be applied to method or accessor`);
}
