// Determine whether the descriptor contains at least one accessor.
describe('isAccessorType', (): void => {
  // Case::
  test('should verify as descriptor with accessor', async (): Promise<void> => {
    // Testing target.
    const { isAccessorType }: any = await import('~descriptor/isAccessorType');

    // Exp: true as setter is ok.
    expect(isAccessorType({ set: jest.fn() })).toBe(true);

    // Exp: true as getter is ok.
    expect(isAccessorType({ get: jest.fn() })).toBe(true);
  });

  // Case::
  test('should verify as descriptor without accessor in case its data descriptor', async (): Promise<void> => {
    // Testing target.
    const { isAccessorType }: any = await import('~descriptor/isAccessorType');

    // Exp: false as descriptor is data type.
    expect(isAccessorType({ value: '' })).toBe(false);
  });

  // Case::
  test('should verify as descriptor without accessor in case its empty descriptor', async (): Promise<void> => {
    // Testing target.
    const { isAccessorType }: any = await import('~descriptor/isAccessorType');

    // Exp: false as descriptor is empty.
    expect(isAccessorType({})).toBe(false);
  });

  // Case::
  test('should verify as descriptor without accessor in case its invalid descriptor', async (): Promise<void> => {
    // Testing target.
    const { isAccessorType }: any = await import('~descriptor/isAccessorType');

    // Exp: false as descriptor is not valid.
    expect(isAccessorType(<any>1)).toBe(false);

    // Exp: false as descriptor is null.
    expect(isAccessorType(null)).toBe(false);

    // Exp: false as descriptor is undefined.
    expect(isAccessorType(undefined)).toBe(false);
  });

  // Case::
  test('should verify as descriptor without accessor in case invalid getter and setter', async (): Promise<void> => {
    // Testing target.
    const { isAccessorType }: any = await import('~descriptor/isAccessorType');

    // Exp: false as getter is not valid.
    expect(isAccessorType({ get: 1 })).toBe(false);

    // Exp: false as setter is not valid.
    expect(isAccessorType({ set: 1 })).toBe(false);
  });
});
