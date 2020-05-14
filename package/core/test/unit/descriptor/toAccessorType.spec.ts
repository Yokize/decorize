// Create the property accessor type descriptor based on specified attributes.
describe('toAccessorType', (): void => {
  // Case::
  test('should create the accessor descriptor', async (): Promise<any> => {
    // Testing target.
    const { toAccessorType } = await import('~descriptor/toAccessorType');

    // Var: base descriptor attributes.
    const baseDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get: (): null => null,
      set(_: any): void {}
    };

    // Opr: create new accessor descriptor.
    const newDescriptor: PropertyDescriptor = toAccessorType('any', baseDescriptor);

    // Exp: same base properties.
    expect(newDescriptor).toEqual(baseDescriptor);

    // Exp: different objects as its new descriptor.
    expect(newDescriptor).not.toBe(baseDescriptor);
  });

  // Case::
  test('should create the writable accessor descriptor', async (): Promise<any> => {
    // Testing target.
    const { toAccessorType } = await import('~descriptor/toAccessorType');

    // Var: base descriptor attributes.
    const baseDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      writable: true,
      value: null
    };

    // Exp: getter is defined at new descriptor
    expect(typeof toAccessorType('any', baseDescriptor).get).toBe('function');

    // Exp: setter is defined at new descriptor
    expect(typeof toAccessorType('any', baseDescriptor).set).toBe('function');
  });

  // Case::
  test('should create the readonly accessor descriptor', async (): Promise<any> => {
    // Testing target.
    const { toAccessorType } = await import('~descriptor/toAccessorType');

    // Var: base descriptor attributes.
    const baseDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      value: 'anyTxt'
    };

    // Exp: getter is defined at new descriptor.
    expect(toAccessorType('any', baseDescriptor).get()).toBe('anyTxt');

    // Exp: setter is not defined at new descriptor.
    expect(toAccessorType('any', baseDescriptor).set).toBeUndefined();
  });
});
