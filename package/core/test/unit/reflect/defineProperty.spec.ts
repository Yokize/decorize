// Add property to an object or change the attributes of existing property.
describe('defineProperty', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'defineProperty', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should add property to the object', async (): Promise<void> => {
    // Testing target.
    const { defineProperty } = await import('~reflect/defineProperty');

    // Var: empty object.
    const object: any = {};

    // Var: descriptor for new property.
    const descriptor: PropertyDescriptor = { value: 'txt' };

    // Opr: define new property at the object.
    const result: boolean = defineProperty(object, 'test', descriptor);

    // Exp: true as operation is successful.
    expect(result).toBe(true);

    // Exp: property is defined at the object.
    expect(object.test).toBe('txt');
  });

  // Case::
  test('should ignore in case property cannot be defined', async (): Promise<void> => {
    // Testing target.
    const { defineProperty } = await import('~reflect/defineProperty');

    // Var: object with non-configurable property.
    const object: any = Object.defineProperty({}, 'test', {
      configurable: false,
      value: 'txt'
    });

    // Var: descriptor to change property.
    const descriptor: PropertyDescriptor = { value: 'txt-changed' };

    // Opr: re-define property at the object.
    const result: boolean = defineProperty(object, 'test', descriptor);

    // Exp: false as property cannot be changed.
    expect(result).toBe(false);

    // Exp: property not be changed and have previous value.
    expect(object.test).toBe('txt');
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { defineProperty } = await import('~reflect/defineProperty');

    // Exp: throw an error as target is not an object.
    expect(() => defineProperty(<any>0, 'test', {})).toThrow(TypeError);

    // Exp: throw an error as target is not an object.
    expect(() => defineProperty(<any>null, 'test', {})).toThrow(TypeError);
  });
});
