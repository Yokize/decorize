// Delete the metadata associated with object or its property.
describe('deleteMetadata', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'deleteMetadata', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should delete the metadata associated with object', async (): Promise<void> => {
    // Testing target.
    const { deleteMetadata } = await import('~reflect/deleteMetadata');

    // Var: testing class.
    class Test {}

    // Mock: metadata existence checking.
    const hasOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('~reflect/hasOwnMetadata'), 'hasOwnMetadata')
      .mockReturnValue(true);

    // Mock: fallback to delete metadata.
    const deleteFromStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/delete'), 'deleteFromStorage')
      .mockReturnValue(false);

    // Exp: same as return value of deleteFromStorage mock.
    expect(deleteMetadata('key', Test)).toBe(false);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Test, undefined);

    // Exp: fallback to delete metadata have been called with correct args.
    expect(deleteFromStorage).toHaveBeenCalledWith('key', Test, undefined);
  });

  // Case::
  test('should delete the metadata associated with property', async (): Promise<void> => {
    // Testing target.
    const { deleteMetadata } = await import('~reflect/deleteMetadata');

    // Var: testing class.
    class Test {}

    // Mock: metadata existence checking.
    const hasOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('~reflect/hasOwnMetadata'), 'hasOwnMetadata')
      .mockReturnValue(true);

    // Mock: fallback to delete metadata.
    const deleteFromStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/delete'), 'deleteFromStorage')
      .mockReturnValue(false);

    // Exp: same as return value of deleteFromStorage mock.
    expect(deleteMetadata('key', Test, 'test')).toBe(false);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Test, 'test');

    // Exp: fallback to delete metadata have been called with correct args.
    expect(deleteFromStorage).toHaveBeenCalledWith('key', Test, 'test');
  });

  // Case::
  test('should ignore in case metadata not found', async (): Promise<void> => {
    // Testing target.
    const { deleteMetadata } = await import('~reflect/deleteMetadata');

    // Var: testing class.
    class Test {}

    // Mock: metadata existence checking.
    const hasOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('~reflect/hasOwnMetadata'), 'hasOwnMetadata')
      .mockReturnValue(false);

    // Mock: fallback to delete metadata.
    const deleteFromStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/delete'), 'deleteFromStorage')
      .mockReturnValue(true);

    // Exp: false as metadata not found.
    expect(deleteMetadata('key', Test)).toBe(false);

    // Exp: checking of metadata existence have been called with correct args.
    expect(hasOwnMetadata).toHaveBeenCalledWith('key', Test, undefined);

    // Exp: fallback to delete metadata not called as metadata not found.
    expect(deleteFromStorage).not.toHaveBeenCalled();
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { deleteMetadata } = await import('~reflect/deleteMetadata');

    // Exp: throw an error as target is not an object.
    expect(() => deleteMetadata('key', <any>0)).toThrow(TypeError);

    // Exp: throw an error as target is not an object.
    expect(() => deleteMetadata('key', <any>null)).toThrow(TypeError);
  });
});
