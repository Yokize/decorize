import isArray from 'lodash/isArray';
import { Decorator } from '@decorize/core/decorator';

/**
 * The exposed and overridable configs used by `@deprecate`.
 */
export const Global = {
  error: false,
  createWarning,
  outputWarning
};

/**
 * The interface describes the structure of configuration used to
 * create and output message, which includes type of decorator,
 * message and name (class with property).
 */
export interface WarningConfig {
  type: Decorator;
  name: [string, PropertyKey?];
  message: string | string[] | any;
}

/**
 * Create warning message using defined configuration.
 *
 * @param configuration Warning configuration.
 * @return Created or defaulted message.
 */
function createWarning({ name, message }: WarningConfig): string {
  return message ? (isArray(message) ? message.join(' ') : message) : `[deprecated] ${name.join('::')}`;
}

/**
 * Output warning message to console based on specified configuration.
 *
 * @param configuration Warning configuration.
 */
function outputWarning(configuration: WarningConfig): void {
  // Create or get default message.
  const message: string = Global.createWarning(configuration);

  // Output error or warning based on global config.
  Global.error ? console.error(message) : console.warn(message);
}
