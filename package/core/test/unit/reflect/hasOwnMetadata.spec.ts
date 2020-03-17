// Determine whether the metadata associated with object or
// its property is defined.
describe('hasOwnMetadata', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'hasOwnMetadata', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should check existence of the own metadata associated with object', async (): Promise<void> => {
    // Testing target.
    const { hasOwnMetadata } = await import('~reflect/hasOwnMetadata');

    // Var: testing class.
    class Test {}

    // Mock: fallback to get metadata.
    const hasInStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/has'), 'hasInStorage')
      .mockReturnValue(true);

    // Exp: true as has own metadata.
    expect(hasOwnMetadata('key', Test)).toBe(true);

    // Exp: fallback to get metadata have been called with correct args.
    expect(hasInStorage).toHaveBeenCalledWith('key', Test, undefined);
  });

  // Case::
  test('should check existence of own metadata associated with property', async (): Promise<void> => {
    // Testing target.
    const { hasOwnMetadata } = await import('~reflect/hasOwnMetadata');

    // Var: testing class.
    class Test {}

    // Mock: fallback to get metadata.
    const hasInStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/has'), 'hasInStorage')
      .mockReturnValue(true);

    // Exp: true as has own metadata.
    expect(hasOwnMetadata('key', Test, 'test')).toBe(true);

    // Exp: fallback to get metadata have been called with with correct args.
    expect(hasInStorage).toHaveBeenCalledWith('key', Test, 'test');
  });

  // Case::
  test('should return false in case of non-object', async (): Promise<void> => {
    // Testing target.
    const { hasOwnMetadata } = await import('~reflect/hasOwnMetadata');

    // Exp: false as target is not an object.
    expect(hasOwnMetadata('key', <any>0)).toBe(false);

    // Exp: false as target is not an object.
    expect(hasOwnMetadata('key', <any>null)).toBe(false);
  });
});
