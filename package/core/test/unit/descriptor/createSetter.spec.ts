// Create the default setter for the property.
describe('createSetter', (): void => {
  // Case::
  test('should create setter for the property', async (): Promise<any> => {
    // Testing target.
    const { createSetter } = await import('~descriptor/createSetter');

    // Var: object with the newly defined setter.
    const object: any = Object.defineProperty({}, 'test', {
      set: createSetter('test')
    });

    // Exp: contains the correct setter.
    expect(typeof Object.getOwnPropertyDescriptor(object, 'test')?.set).toBe('function');
  });

  // Case::
  test('should change the property in case assigned via setter', async (): Promise<any> => {
    // Testing target.
    const { createSetter } = await import('~descriptor/createSetter');

    // Var: object with the newly defined setter.
    const object: any = Object.defineProperty({}, 'test', {
      configurable: true,
      set: createSetter('test')
    });

    // Opr: assign new value to accessor property.
    object.test = 'txt';

    // Exp: contains the assigned value.
    expect(Object.getOwnPropertyDescriptor(object, 'test')?.value).toBe('txt');
  });
});
