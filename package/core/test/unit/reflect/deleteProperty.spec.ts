// Removes a given property from an object.
describe('deleteProperty', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'deleteProperty', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should remove property from the object', async (): Promise<void> => {
    // Testing target.
    const { deleteProperty } = await import('~reflect/deleteProperty');

    // Var: object with property.
    const object: any = { test: 'value' };

    // Opr: delete property from the object.
    const result: boolean = deleteProperty(object, 'test');

    // Exp: true as operation is successful.
    expect(result).toBe(true);

    // Exp: property is removed from the object.
    expect(Object.getOwnPropertyDescriptor(object, 'test')).toBe(undefined);
  });

  // Case::
  test('should ignore in case property cannot be deleted', async (): Promise<void> => {
    // Testing target.
    const { deleteProperty } = await import('~reflect/deleteProperty');

    // Var: object with non configurable property.
    const object: any = Object.defineProperty({}, 'test', {
      configurable: false,
      value: 'txt'
    });

    // Opr: delete non-configurable property.
    const result: boolean = deleteProperty(object, 'test');

    // Exp: false as property cannot be deleted.
    expect(result).toBe(false);

    // Exp: property not deleted and have previous value.
    expect(object.test).toBe('txt');
  });

  // Case::
  test('should ignore in case property not exist', async (): Promise<void> => {
    // Testing target.
    const { deleteProperty } = await import('~reflect/deleteProperty');

    // Var: empty object.
    const object: any = {};

    // Opr: delete non-existing property.
    const result: boolean = deleteProperty(object, 'non-exist');

    // Exp: false as property not exist.
    expect(result).toBe(false);
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { deleteProperty } = await import('~reflect/deleteProperty');

    // Exp: throw an error as target is not an object.
    expect(() => deleteProperty(<any>0, 'test')).toThrow(TypeError);

    // Exp: throw an error as target is not an object.
    expect(() => deleteProperty(<any>null, 'test')).toThrow(TypeError);
  });
});
