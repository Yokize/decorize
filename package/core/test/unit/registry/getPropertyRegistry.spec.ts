import { ClassRegistry } from '~registry/classRegistry';

// Get registry linked with the class (prototype) & property.
describe('getPropertyRegistry', (): void => {
  // Case::
  test('should get registry linked with the class & property', async (): Promise<void> => {
    // Testing target.
    const { getPropertyRegistry }: any = await import('~registry/getPropertyRegistry');

    // Var: class registry.
    const registry: ClassRegistry = {
      decorator: [],
      property: {
        test: {
          decorator: [],
          parameter: {}
        }
      }
    };

    jest
      // Mock: helper to get class registry.
      .spyOn(await import('~registry/getClassRegistry'), 'getClassRegistry')
      .mockReturnValue(registry);

    // Exp: registry associated with class & parameter.
    expect(getPropertyRegistry(class {}, 'test')).toEqual(registry.property.test);
  });
});

// Get or create registry linked with the class (prototype) & property.
describe('getOrCreatePropertyRegistry', (): void => {
  // Case::
  test('should get registry linked with the class & property', async (): Promise<void> => {
    // Testing target.
    const { getOrCreatePropertyRegistry }: any = await import('~registry/getPropertyRegistry');

    // Var: class registry.
    const registry: ClassRegistry = {
      decorator: [],
      property: {
        test: {
          decorator: [],
          parameter: {}
        }
      }
    };

    jest
      // Mock: helper to get class registry.
      .spyOn(await import('~registry/getClassRegistry'), 'getClassRegistry')
      .mockReturnValue(registry);

    // Exp: registry associated with class & parameter.
    expect(getOrCreatePropertyRegistry(class {}, 'test')).toEqual(registry.property.test);
  });

  // Case::
  test('should create registry in case not exist', async (): Promise<void> => {
    // Testing target.
    const { getOrCreatePropertyRegistry }: any = await import('~registry/getPropertyRegistry');

    // Exp: created registry associated with object & parameter.
    expect(getOrCreatePropertyRegistry(class {}, 'test')).toEqual({ decorator: [], parameter: {} });
  });
});
