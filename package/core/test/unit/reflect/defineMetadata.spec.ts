// Define the metadata associated with object or its property.
describe('defineMetadata', (): void => {
  // Setup::
  beforeEach((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'defineMetadata', 'get')
      .mockReturnValue(undefined);
  });

  // Case::
  test('should define the metadata associated with object', async (): Promise<void> => {
    // Testing target.
    const { defineMetadata } = await import('~reflect/defineMetadata');

    // Var: testing class.
    class Test {}

    // Mock: fallback to define metadata.
    const defineInStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/define'), 'defineInStorage')
      .mockReturnValue(undefined);

    // Opr: define metadata associated with class.
    defineMetadata('key', 'metadata', Test);

    // Exp: fallback to define metadata have been called with correct args.
    expect(defineInStorage).toHaveBeenCalledWith('key', 'metadata', Test, undefined);
  });

  // Case::
  test('should define the metadata associated with property', async (): Promise<void> => {
    // Testing target.
    const { defineMetadata } = await import('~reflect/defineMetadata');

    // Var: testing class.
    class Test {}

    // Mock: fallback to define metadata.
    const defineInStorage: jest.SpyInstance = jest
      .spyOn(await import('~reflect/fallback/define'), 'defineInStorage')
      .mockReturnValue(undefined);

    // Opr: define metadata associated with property.
    defineMetadata('key', 'metadata', Test, 'test');

    // Exp: fallback to define metadata have been called with correct args.
    expect(defineInStorage).toHaveBeenCalledWith('key', 'metadata', Test, 'test');
  });

  // Case::
  test('should throw error in case of non-object target', async (): Promise<void> => {
    // Testing target.
    const { defineMetadata } = await import('~reflect/defineMetadata');

    // Exp: throw an error as target is not an object.
    expect((): void => defineMetadata('key', 'metadata', <any>0)).toThrow(TypeError);

    // Exp: throw an error as target is not an object.
    expect((): void => defineMetadata('key', 'metadata', <any>null)).toThrow(TypeError);
  });
});
