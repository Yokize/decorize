// The exposed and overridable helpers used by `@cache` and `@cacheClear`
// decorators to manage cache.
describe('Cache global', (): void => {
  // Case::
  test('should contain the default resolver', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Exp: default cache key is defined.
    expect(typeof Global.resolver()).toBe('string');
  });

  // Case::
  test('should determine whether there is the entry', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Mock: helper to get own metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValueOnce({ prop: {} })
      .mockReturnValueOnce({ prop: { test: 'result' } });

    // Exp: false as the cache is empty.
    expect(Global.has({}, 'prop', 'test')).toBe(false);

    // Exp: true as the entry associated with the key exists.
    expect(Global.has({}, 'prop', 'test')).toBe(true);

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();
  });

  // Case::
  test('should get the entry from the cache', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Mock: helper to get own metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValueOnce({ prop: {} })
      .mockReturnValueOnce({ prop: { test: 'result' } });

    // Exp: undefined as the cache is empty.
    expect(Global.get({}, 'prop', 'test')).toBe(undefined);

    // Exp: the entry associated with the key.
    expect(Global.get({}, 'prop', 'test')).toBe('result');

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();
  });

  // Case::
  test('should set the entry to the cache', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Mock: helper to define metadata.
    const defineMetadata: jest.SpyInstance = jest.spyOn(
      await import('@decorize/core/reflect/defineMetadata'),
      'defineMetadata'
    );

    // Opr: set the entry to the cache and associate it with the key.
    Global.set({}, 'prop', 'test', 'result');

    // Exp: helper to define metadata have been called with correct args.
    expect(defineMetadata).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ prop: { test: 'result' } }),
      expect.anything()
    );
  });

  // Case::
  test('should override the entry at the cache', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Var: already defined cache.
    const cache: any = { prop: { test: 'result1' } };

    // Mock: helper to get own metadata metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(cache);

    // Opr: set the entry to the cache and associate it with the key.
    Global.set({}, 'prop', 'test', 'result2');

    // Exp: the cache is overridden by the new entry.
    expect(cache).toEqual({ prop: { test: 'result2' } });

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();
  });

  // Case::
  test('should remove the entry from the cache', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Var: already defined cache.
    const cache: any = { prop: { test: 'result' } };

    // Mock: helper to get own metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(cache);

    // Opr: remove the entry associated with the key.
    Global.remove({}, 'prop', 'test');

    // Exp: the entry is removed from the mocked cache.
    expect(cache).toEqual({ prop: {} });

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();
  });

  // Case::
  test('should clear the whole cache', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Mock: helper to delete metadata.
    const deleteMetadata: jest.SpyInstance = jest.spyOn(
      await import('@decorize/core/reflect/deleteMetadata'),
      'deleteMetadata'
    );

    // Var: testing class.
    class Test {}

    // Opr: clear the cache.
    Global.clear(Test);

    // Exp: helper to delete metadata have been called with correct args.
    expect(deleteMetadata).toHaveBeenCalledWith(expect.anything(), Test);
  });

  // Case::
  test('should clear the property cache', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Var: already defined cache.
    const cache: any = { prop: { test: 'result' } };

    // Mock: helper to get own metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(cache);

    // Mock: helper to delete property.
    const deleteProperty: jest.SpyInstance = jest.spyOn(
      await import('@decorize/core/reflect/deleteProperty'),
      'deleteProperty'
    );

    // Var: testing class.
    class Test {}

    // Opr: clear the property cache.
    Global.clear(Test, 'prop');

    // Exp: helper to delete property have been called with correct args.
    expect(deleteProperty).toHaveBeenCalledWith(cache, 'prop');

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();
  });

  // Case::
  test('should ignore <has> in case the cache not exist', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Mock: helper to get own metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(undefined);

    // Exp: false as the cache is not defined.
    expect(Global.has({}, 'prop', 'test')).toBe(false);

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();
  });

  // Case::
  test('should ignore <get> in case the cache not exist', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Mock: helper to get own metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(undefined);

    // Exp: undefined as the cache is not defined.
    expect(Global.get({}, 'prop', 'test')).toBe(undefined);

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();
  });

  // Case::
  test('should ignore <remove> in case the cache not exist', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Mock: helper to get own metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(undefined);

    // Mock: helper to delete property.
    const deleteProperty: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/deleteProperty'), 'deleteProperty')
      .mockReturnValue(undefined);

    // Opr: remove the entry associated with the key.
    Global.remove({}, 'prop', 'test');

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();

    // Exp: helper to delete property have been not called.
    expect(deleteProperty).not.toHaveBeenCalled();
  });

  // Case::
  test('should ignore <clear> in case the cache not exist', async (): Promise<void> => {
    // Testing target.
    const { Global } = await import('~global');

    // Mock: helper to get own metadata.
    const getOwnMetadata: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(undefined);

    // Mock: helper to delete property.
    const deleteProperty: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/reflect/deleteProperty'), 'deleteProperty')
      .mockReturnValue(undefined);

    // Opr: clear the cache.
    Global.clear({}, 'prop');

    // Exp: helper to get own metadata have been called.
    expect(getOwnMetadata).toHaveBeenCalled();

    // Exp: helper to delete property have been not called.
    expect(deleteProperty).not.toHaveBeenCalled();
  });
});
