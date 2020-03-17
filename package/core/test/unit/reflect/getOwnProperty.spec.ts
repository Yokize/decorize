// Get value under own property from the object.
describe('getOwnProperty', (): void => {
  // Case::
  test('should get value under own property of the object', async (): Promise<void> => {
    // Testing target.
    const { getOwnProperty } = await import('~reflect/getOwnProperty');

    // Var: object with own property.
    const object1: any = { test1: 'txt' };

    // Var: inherited from the existing object.
    const object2: any = Object.create(object1);

    // Opr: assign own property.
    object2.test2 = 'txt';

    // Exp: property value as its directly belongs to object.
    expect(getOwnProperty(object2, 'test2')).toBe('txt');

    // Exp: undefined as property accessible only thought prototype chain.
    expect(getOwnProperty(object2, 'test1')).toBe(undefined);
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { getOwnProperty } = await import('~reflect/getOwnProperty');

    // Exp: throw an error as target is not an object.
    expect(() => getOwnProperty(<any>0, 'test')).toThrow(TypeError);

    // Exp: throw an error as target is not an object.
    expect(() => getOwnProperty(null, 'test')).toThrow(TypeError);
  });
});
