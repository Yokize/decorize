// Output warning message to console based on specified configuration.
describe('outputWarning', (): void => {
  // prettier-ignore
  beforeEach(async (): Promise<void> => {
    // Mock: helper to output error to console.
    jest.spyOn(console, 'error').mockReturnValue();

    // Mock: helper to output warning to console.
    jest.spyOn(console, 'warn').mockReturnValue();
  });

  // Case::
  test('should output warning based on configuration', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Opr: output warning via console.
    Global.outputWarning({ type: null, name: null, message: 'anyTxt' });

    // Exp: console.warn have been called.
    expect(console.warn).toHaveBeenCalledWith('anyTxt');
  });

  // Case::
  test('should output warning based on configuration (error)', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Opr: enable output of error.
    Global.error = true;

    // Opr: output warning via console.
    Global.outputWarning({ type: null, name: null, message: 'anyTxt' });

    // Exp: console.warn have been called.
    expect(console.error).toHaveBeenCalledWith('anyTxt');
  });

  // Case::
  test('should output warning based on configuration (no message)', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Opr: output warning via console.
    Global.outputWarning({ type: null, name: ['class', 'property'], message: null });

    // Exp: console.warn have been called.
    expect(console.warn).toHaveBeenCalledWith('[deprecated] class::property');
  });

  // Case::
  test('should output warning based on configuration (multi message)', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Opr: output warning via console.
    Global.outputWarning({ type: null, name: null, message: ['two', 'chunks'] });

    // Exp: console.warn have been called.
    expect(console.warn).toHaveBeenCalledWith('two chunks');
  });
});
