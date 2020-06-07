// Get the metadata associated with object or its property (with prototype chain).
describe('getMetadata', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'getMetadata', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should get own metadata associated with object', async (): Promise<void> => {
    // Testing target.
    const { getMetadata } = await import('~reflect/getMetadata');

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
    expect(getMetadata('key', Test)).toBe(metadata);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Test, undefined);

    // Exp: fallback to get metadata have been called with correct args.
    expect(getFromStorage).toHaveBeenCalledWith('key', Test, undefined);
  });

  // Case::
  test('should get own metadata associated with property', async (): Promise<void> => {
    // Testing target.
    const { getMetadata } = await import('~reflect/getMetadata');

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
    expect(getMetadata('key', Test, 'test')).toBe(metadata);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Test, 'test');

    // Exp: fallback to get metadata have been called with correct args.
    expect(getFromStorage).toHaveBeenCalledWith('key', Test, 'test');
  });

  // Case::
  test('should get the metadata associated with object from prototype chain', async (): Promise<void> => {
    // Testing target.
    const { getMetadata } = await import('~reflect/getMetadata');

    // Var: parent class.
    class Parent {}

    // Var: child class.
    class Child extends Parent {}

    // Var: testing metadata.
    const metadata: any = { test: 'txt' };

    // Mock: metadata existence checking.
    const hasOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('~reflect/hasOwnMetadata'), 'hasOwnMetadata')
      // First mock execution.
      .mockReturnValueOnce(false)
      // Second mock execution.
      .mockReturnValueOnce(true);

    // Mock: fallback to get prototype.
    const getProtoOf: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/proto'), 'getProtoOf')
      .mockReturnValue(Parent);

    // Mock: fallback to get metadata.
    const getFromStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/get'), 'getFromStorage')
      .mockImplementation((_: any, target: any) => (target === Parent ? metadata : null));

    // Exp: same as mocked metadata.
    expect(getMetadata('key', Child)).toBe(metadata);

    // Exp: fallback to get prototype have been called with correct args.
    expect(getProtoOf).toHaveBeenCalledWith(Child);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Parent, undefined);

    // Exp: fallback to get metadata have been called with correct args.
    expect(getFromStorage).toHaveBeenCalledWith('key', Parent, undefined);

    // Exp: fallback to get metadata on child class have been not called as own metadata not exist.
    expect(getFromStorage).not.toHaveBeenCalledWith('key', Child, undefined);
  });

  // Case::
  test('should return undefined in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { getMetadata } = await import('~reflect/getMetadata');

    // Exp: undefined as target is not an object.
    expect(getMetadata('key', <any>0)).toBe(undefined);

    // Exp: undefined as target is not an object.
    expect(getMetadata('key', <any>null)).toBe(undefined);
  });
});
