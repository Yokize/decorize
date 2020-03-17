import { PropertyRegistry } from '~registry/propertyRegistry';

// Get registry linked with the class (prototype), method & parameter.
describe('getParamRegistry', (): void => {
  // Case::
  test('should get registry linked with the class, method & parameter', async (): Promise<void> => {
    // Testing target.
    const { getParamRegistry }: any = await import('~registry/getParamRegistry');

    // Var: property registry.
    const registry: PropertyRegistry = {
      decorator: [],
      parameter: {
        0: { decorator: [] }
      }
    };

    jest
      // Mock: helper to get property registry.
      .spyOn(await import('~registry/getPropertyRegistry'), 'getPropertyRegistry')
      .mockReturnValue(registry);

    // Exp: registry associated with class, method & parameter.
    expect(getParamRegistry(class {}, 'test', 0)).toEqual({ decorator: [] });
  });
});

// Get or create registry linked with the class (prototype), method & parameter.
describe('getOrCreateParamRegistry', (): void => {
  // Case::
  test('should get registry linked with the class, method & parameter', async (): Promise<void> => {
    // Testing target.
    const { getOrCreateParamRegistry }: any = await import('~registry/getParamRegistry');

    // Var: property registry.
    const registry: PropertyRegistry = {
      decorator: [],
      parameter: {
        0: { decorator: [] }
      }
    };

    jest
      // Mock: helper to get property registry.
      .spyOn(await import('~registry/getPropertyRegistry'), 'getPropertyRegistry')
      .mockReturnValue(registry);

    // Exp: registry associated with class, method & parameter.
    expect(getOrCreateParamRegistry(class {}, 'test', 0)).toEqual({ decorator: [] });
  });

  // Case::
  test('should create registry in case not exist', async (): Promise<void> => {
    // Testing target.
    const { getOrCreateParamRegistry }: any = await import('~registry/getParamRegistry');

    // Exp: created registry associated with class, method & parameter.
    expect(getOrCreateParamRegistry(class {})).toEqual({ decorator: [] });
  });
});
