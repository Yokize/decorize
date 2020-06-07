// Determine whether the metadata associated with object or
// its property (with prototype chain) is defined.
describe('hasMetadata', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'hasMetadata', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should check existence of the metadata associated with object', async (): Promise<void> => {
    // Testing target.
    const { hasMetadata } = await import('~reflect/hasMetadata');

    // Var: testing class.
    class Test {}

    // Mock: fallback to get metadata.
    const hasInStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/has'), 'hasInStorage')
      .mockReturnValue(true);

    // Exp: true as has own metadata.
    expect(hasMetadata('key', Test)).toBe(true);

    // Exp: fallback to get metadata have been called with correct args.
    expect(hasInStorage).toHaveBeenCalledWith('key', Test, undefined);
  });

  // Case::
  test('should check existence of the metadata associated with property', async (): Promise<void> => {
    // Testing target.
    const { hasMetadata } = await import('~reflect/hasMetadata');

    // Var: testing class.
    class Test {}

    // Mock: fallback to get metadata.
    const hasInStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/has'), 'hasInStorage')
      .mockReturnValue(true);

    // Exp: true as has own metadata.
    expect(hasMetadata('key', Test, 'test')).toBe(true);

    // Exp: fallback to get metadata have been called with correct args.
    expect(hasInStorage).toHaveBeenCalledWith('key', Test, 'test');
  });

  // Case::
  test('should check existence of the metadata associated with object from proto chain', async (): Promise<void> => {
    // Testing target.
    const { hasMetadata } = await import('~reflect/hasMetadata');

    // Var: parent class.
    class Parent {}

    // Var: child class.
    class Child extends Parent {}

    // Mock: metadata existence checking.
    const hasInStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/has'), 'hasInStorage')
      // First mock execution.
      .mockReturnValueOnce(false)
      // Second mock execution.
      .mockReturnValueOnce(true);

    // Mock: fallback to get proto.
    const getProtoOf: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/proto'), 'getProtoOf')
      .mockReturnValue(Parent);

    // Exp: true as has inherited metadata.
    expect(hasMetadata('key', Child)).toBe(true);

    // Exp: fallback to get proto have been called with correct args.
    expect(getProtoOf).toHaveBeenCalledWith(Child);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasInStorage).toHaveBeenCalledWith('key', Child, undefined);

    // Exp: fallback to get metadata have been called with correct args.
    expect(hasInStorage).toHaveBeenCalledWith('key', Parent, undefined);
  });

  // Case::
  test('should return false in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { hasMetadata } = await import('~reflect/hasMetadata');

    // Exp: false as target is not an object.
    expect(hasMetadata('key', <any>0)).toBe(false);

    // Exp: false as target is not an object.
    expect(hasMetadata('key', <any>null)).toBe(false);
  });
});
