//  Get the metadata associated with object or its property.
describe('getOwnMetadata', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'getOwnMetadata', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should get the own metadata associated with object', async (): Promise<void> => {
    // Testing target.
    const { getOwnMetadata } = await import('~reflect/getOwnMetadata');

    // Var: testing class.
    class Test {}

    // Var: testing metadata.
    const metadata: any = { test: 'txt' };

    // Mock: metadata existence checking.
    const hasOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('~reflect/hasOwnMetadata'), 'hasOwnMetadata')
      .mockReturnValue(true);

    // Mock: fallback to get own metadata.
    const getFromStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/get'), 'getFromStorage')
      .mockReturnValue(metadata);

    // Exp: same as mocked metadata.
    expect(getOwnMetadata('key', Test)).toBe(metadata);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Test, undefined);

    // Exp: fallback to get metadata have been called with with correct args.
    expect(getFromStorage).toHaveBeenCalledWith('key', Test, undefined);
  });

  // Case::
  test('should get the own metadata associated with property', async (): Promise<void> => {
    // Testing target.
    const { getOwnMetadata } = await import('~reflect/getOwnMetadata');

    // Var: testing class.
    class Test {}

    // Var: testing metadata.
    const metadata: any = { test: 'txt' };

    // Mock: metadata existence checking.
    const hasOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('~reflect/hasOwnMetadata'), 'hasOwnMetadata')
      .mockReturnValue(true);

    // Mock: fallback to get metadata.
    const getFromStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/get'), 'getFromStorage')
      .mockReturnValue(metadata);

    // Exp: same as mocked metadata.
    expect(getOwnMetadata('key', Test, 'test')).toBe(metadata);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Test, 'test');

    // Exp: fallback to get metadata have been called with correct args.
    expect(getFromStorage).toHaveBeenCalledWith('key', Test, 'test');
  });

  // Case::
  test('should ignore in case own metadata not exist', async (): Promise<void> => {
    // Testing target.
    const { getOwnMetadata } = await import('~reflect/getOwnMetadata');

    // Var: testing class.
    class Test {}

    // Var: testing metadata.
    const metadata: any = { test: 'txt' };

    // Mock: metadata existence checking.
    const hasOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('~reflect/hasOwnMetadata'), 'hasOwnMetadata')
      .mockReturnValue(false);

    // Mock: fallback to get own metadata.
    const getFromStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/get'), 'getFromStorage')
      .mockReturnValue(metadata);

    // Exp: undefined as metadata not found.
    expect(getOwnMetadata('key', Test)).toBe(undefined);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Test, undefined);

    // Exp: fallback to get metadata not have been called as metadata not found.
    expect(getFromStorage).not.toHaveBeenCalled();
  });

  // Case::
  test('should return undefined in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { getOwnMetadata } = await import('~reflect/getOwnMetadata');

    // Exp: undefined as target is not an object.
    expect(getOwnMetadata('key', <any>0)).toBe(undefined);

    // Exp: undefined as target is not an object.
    expect(getOwnMetadata('key', <any>null)).toBe(undefined);
  });
});
