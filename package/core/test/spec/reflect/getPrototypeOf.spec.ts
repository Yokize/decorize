// Get the prototype of the object.
describe('getPrototypeOf', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'getPrototypeOf', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should get the prototype of an object', async (): Promise<void> => {
    // Testing target.
    const { getPrototypeOf } = await import('~reflect/getPrototypeOf');

    // Var: plain object.
    const object: any = {};

    // Exp: native Object prototype.
    expect(getPrototypeOf(object)).toBe(Object.prototype);
  });

  // Case::
  test('should get the prototype of an class', async (): Promise<void> => {
    // Testing target.
    const { getPrototypeOf } = await import('~reflect/getPrototypeOf');

    // Var: parent class.
    class Parent {}

    // Var: child class.
    class Child extends Parent {}

    // Exp: parent class.
    expect(getPrototypeOf(Child)).toBe(Parent);
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { getPrototypeOf } = await import('~reflect/getPrototypeOf');

    // Exp: throw an error as target is not an object.
    expect(() => getPrototypeOf(<any>0)).toThrow(TypeError);

    // Exp: throw an error as target is not an object.
    expect(() => getPrototypeOf(<any>null)).toThrow(TypeError);
  });
});
