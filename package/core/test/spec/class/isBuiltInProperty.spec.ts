// Determine whether is built-in property of the class or prototype.
describe('isBuiltInProperty', (): void => {
  // Case::
  test('should determine whether is built-in property of the class', async (): Promise<any> => {
    // Testing target.
    const { isBuiltInProperty } = await import('~class/isBuiltInProperty');

    // Var: testing class.
    class Test {}

    // Exp: name is built-in property of the class.
    expect(isBuiltInProperty(Test, 'name')).toBe(true);

    // Exp: prototype is built-in property of the class.
    expect(isBuiltInProperty(Test, 'prototype')).toBe(true);
  });

  // Case::
  test('should determine whether is built-in property of the prototype', async (): Promise<any> => {
    // Testing target.
    const { isBuiltInProperty } = await import('~class/isBuiltInProperty');

    // Var: testing class.
    class Test {}

    // Exp: constructor is built-in property of the class.
    expect(isBuiltInProperty(Test.prototype, 'constructor')).toBe(true);
  });
});
