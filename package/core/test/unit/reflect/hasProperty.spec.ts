// Determine whether the object or its prototype chain has the property.
describe('hasProperty', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'has', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should check whether the object has the property', async (): Promise<void> => {
    // Testing target.
    const { hasProperty } = await import('~reflect/hasProperty');

    // Var: object with property.
    const object1: object = { test: 'txt' };

    // Var: inherited from the existing object.
    const object2: object = Object.create(object1);

    // Exp: true as its own property.
    expect(hasProperty(object1, 'test')).toBe(true);

    // Exp: true as property accessible thought prototype chain.
    expect(hasProperty(object2, 'test')).toBe(true);

    // Exp: false as own property not found directly at object.
    expect(hasProperty(object2, 'non-exist')).toBe(false);
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { hasProperty } = await import('~reflect/hasProperty');

    // Exp: throw an error as target is not an object.
    expect(() => hasProperty(<any>0, 'test')).toThrow();

    // Exp: throw an error as target is not an object.
    expect(() => hasProperty(null, 'test')).toThrow();
  });
});
