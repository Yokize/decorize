import { ClassRegistry } from '~registry/classRegistry';

// Get registry linked with the class (prototype).
describe('getClassRegistry', (): void => {
  // Case::
  test('should get registry linked with the class', async (): Promise<void> => {
    // Testing target.
    const { getClassRegistry }: any = await import('~registry/getClassRegistry');

    // Var: class registry.
    const registry: ClassRegistry = { decorator: [], property: {} };

    jest
      // Mock: helper to get own metadata.
      .spyOn(await import('~reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(registry);

    // Exp: registry associated with class.
    expect(getClassRegistry(class {})).toBe(registry);
  });
});

// Get or create registry linked with the class (prototype).
describe('getOrCreateClassRegistry', (): void => {
  // Case::
  test('should get registry linked with the class', async (): Promise<void> => {
    // Testing target.
    const { getOrCreateClassRegistry }: any = await import('~registry/getClassRegistry');

    // Var: class registry.
    const registry: ClassRegistry = { decorator: [], property: {} };

    jest
      // Mock: helper to get own metadata.
      .spyOn(await import('~reflect/getOwnMetadata'), 'getOwnMetadata')
      .mockReturnValue(registry);

    // Exp: registry associated with class.
    expect(getOrCreateClassRegistry(class {})).toBe(registry);
  });

  // Case::
  test('should create registry in case not exist', async (): Promise<void> => {
    // Testing target.
    const { getOrCreateClassRegistry }: any = await import('~registry/getClassRegistry');

    // Exp: created registry associated with class.
    expect(getOrCreateClassRegistry(class {})).toEqual({ decorator: [], property: {} });
  });
});
