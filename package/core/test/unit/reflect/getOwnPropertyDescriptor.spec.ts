// Get own property descriptor of the object.
describe('getOwnDescriptor', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'getOwnPropertyDescriptor', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should get own property descriptor of the object', async (): Promise<void> => {
    // Testing target.
    const { getOwnPropertyDescriptor } = await import('~reflect/getOwnPropertyDescriptor');

    // Var: object with property.
    const object: any = { test: 'txt' };

    // Exp: descriptor of the property.
    expect(getOwnPropertyDescriptor(object, 'test')).toEqual({
      value: 'txt',
      writable: true,
      enumerable: true,
      configurable: true
    });
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { getOwnPropertyDescriptor } = await import('~reflect/getOwnPropertyDescriptor');

    // Exp: throw an error as target is not an object.
    expect(() => getOwnPropertyDescriptor(<any>0, 'test')).toThrow(TypeError);

    // Exp: throw an error as target is not an object.
    expect(() => getOwnPropertyDescriptor(<any>null, 'test')).toThrow(TypeError);
  });
});
