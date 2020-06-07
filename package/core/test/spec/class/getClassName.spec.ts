// Get the name of the class or its instance.
describe('getClassName', (): void => {
  // Case::
  test('should get the name of the class', async (): Promise<any> => {
    // Testing target.
    const { getClassName } = await import('~class/getClassName');

    // Var: testing class.
    class Test {}

    // Exp: name of the class.
    expect(getClassName(Test)).toBe('Test');
  });

  // Case::
  test('should get the name of the class (instance)', async (): Promise<any> => {
    // Testing target.
    const { getClassName } = await import('~class/getClassName');

    // Var: testing class.
    class Test {}

    // Exp: name of the class.
    expect(getClassName(new Test())).toBe('Test');
  });

  // Case::
  test('should use fallback in case name is not defined', async (): Promise<any> => {
    // Testing target.
    const { getClassName } = await import('~class/getClassName');

    // Var: testing class.
    class Test {}

    // Opr: redefine name property for class.
    Object.defineProperty(Test, 'name', { get: (): null => null });

    // Exp: name of the class retrieved by using fallback.
    expect(getClassName(Test)).toBe('Test');
  });

  // Case::
  test('should ignore operation in case target is undefined', async (): Promise<any> => {
    // Testing target.
    const { getClassName } = await import('~class/getClassName');

    // Exp: name of the class.
    expect(getClassName(null)).toBe(undefined);
  });
});
