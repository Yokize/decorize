// Get the names and symbols of the object's own keys.
describe('getOwnKeys', (): void => {
  // Setup::
  beforeAll((): void => {
    jest
      // Manually mock built-in Reflect.
      .spyOn(<any>Reflect, 'ownKeys', 'get')
      .mockReturnValue(undefined);
  });

  describe('with symbols', (): void => {
    // Case::
    test('should get the names of own keys from the object', async (): Promise<void> => {
      // Testing target.
      const { getOwnKeys } = await import('~reflect/getOwnKeys');

      // Var: symbol.
      const symbol: symbol = Symbol();

      // Var: object with properties.
      const object: any = {
        test: 'txt',
        [symbol]: 'txt'
      };

      // Exp: include string and symbol keys.
      expect(getOwnKeys(object)).toEqual(['test', symbol]);
    });

    // Case::
    test('should throw error in case of non-object target', async (): Promise<void> => {
      // Testing target.
      const { getOwnKeys } = await import('~reflect/getOwnKeys');

      // Exp: throw an error as target is not an object.
      expect(() => getOwnKeys(<any>null)).toThrow(TypeError);

      // Exp: throw an error as target is not an object.
      expect(() => getOwnKeys(<any>0)).toThrow(TypeError);
    });
  });

  describe('without symbols', (): void => {
    // Setup::
    beforeEach((): void => {
      // Original method.
      const { getOwnPropertySymbols } = Object;

      // Create getter on native Object for mocking.
      Object.defineProperty(Object, 'getOwnPropertySymbols', {
        configurable: true,
        get: () => getOwnPropertySymbols
      });

      jest
        // Manually mock built-in Object.
        .spyOn(<any>Object, 'getOwnPropertySymbols', 'get')
        .mockReturnValueOnce(undefined);
    });

    // Case::
    test('should get the names of own keys from the object', async (): Promise<void> => {
      // Testing target.
      const { getOwnKeys } = await import('~reflect/getOwnKeys');

      // Var: symbol.
      const symbol: symbol = Symbol();

      // Var: object with properties.
      const object: any = {
        test: 'txt',
        [symbol]: 'txt'
      };

      // Exp: include only string key.
      expect(getOwnKeys(object)).toEqual(['test']);
    });

    // Case::
    test('should throw error in case of non-object target', async (): Promise<void> => {
      // Testing target.
      const { getOwnKeys } = await import('~reflect/getOwnKeys');

      // Exp: throw an error as target is not an object.
      expect(() => getOwnKeys(<any>0)).toThrow(TypeError);

      // Exp: throw an error as target is not an object.
      expect(() => getOwnKeys(<any>null)).toThrow(TypeError);
    });
  });
});
