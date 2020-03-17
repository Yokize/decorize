// Determine whether an object has own property (opposed to inheriting it).
describe('hasOwnProperty', (): void => {
  // Case::
  test('should check whether object has own property', async (): Promise<void> => {
    jest
      // Manually mock implementation to Object.getOwnPropertyDescriptor.
      .spyOn(await import('~reflect/getOwnPropertyDescriptor'), 'getOwnPropertyDescriptor')
      .mockImplementation(Object.getOwnPropertyDescriptor);

    // Testing target.
    const { hasOwnProperty } = await import('~reflect/hasOwnProperty');

    // Var: object with property.
    const object1: any = { test: 'txt' };

    // Var: inherited from the existing object.
    const object2: any = Object.create(object1);

    // Exp: true as its own property.
    expect(hasOwnProperty(object1, 'test')).toBe(true);

    // Exp: false as property accessible only thought prototype chain.
    expect(hasOwnProperty(object2, 'test')).toBe(false);

    // Exp: false as own property not found directly at object.
    expect(hasOwnProperty(object1, 'non-exist')).toBe(false);
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { hasOwnProperty } = await import('~reflect/hasOwnProperty');

    // Exp: throw an error as target is not an object.
    expect(() => hasOwnProperty(<any>0, 'test')).toThrow(TypeError);

    // Exp: throw an error as target is not an object.
    expect(() => hasOwnProperty(null, 'test')).toThrow(TypeError);
  });
});
