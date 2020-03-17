// Get value under the property from the object or its prototype chain.
describe('getProperty', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'get', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should get value under the property from an object or its prototype chain', async (): Promise<void> => {
    // Testing target.
    const { getProperty } = await import('~reflect/getProperty');

    // Var: object with own property.
    const object1: any = { test: 'txt' };

    // Var: inherited from the existing object.
    const object2: any = Object.create(object1);

    // Exp: property value as its directly belongs to object.
    expect(getProperty(object1, 'test')).toBe('txt');

    // Exp: property value as its accessible thought prototype chain.
    expect(getProperty(object2, 'test')).toBe('txt');
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { getProperty } = await import('~reflect/getProperty');

    // Exp: throw an error as target is not an object.
    expect(() => getProperty(<any>0, 'test')).toThrow();

    // Exp: throw an error as target is not an object.
    expect(() => getProperty(null, 'test')).toThrow();
  });
});
