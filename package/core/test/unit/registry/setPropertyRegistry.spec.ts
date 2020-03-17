import { PropertyRegistry } from '~registry/propertyRegistry';

// Link registry with the class (prototype) & property.
describe('setPropertyRegistry', (): void => {
  // Case::
  test('should link registry with the class & property', async (): Promise<void> => {
    // Testing target.
    const { setPropertyRegistry }: any = await import('~registry/setPropertyRegistry');

    // Var: testing class.
    class Test {}

    // Var: property registry.
    const registry: PropertyRegistry = { decorator: [], parameter: {} };

    // Var: registry matcher.
    const matcher: any = expect.objectContaining({ property: { test: registry } });

    // Mock: helper to set class registry.
    const setClassRegistry: jest.SpyInstance = jest.spyOn(
      await import('~registry/setClassRegistry'),
      'setClassRegistry'
    );

    jest
      // Mock: helper to get class registry.
      .spyOn(await import('~registry/getClassRegistry'), 'getOrCreateClassRegistry')
      .mockReturnValue({ decorator: [], property: {} });

    // Opr: link registry with class & property.
    setPropertyRegistry(Test, 'test', registry);

    // Exp: helper to set registry have been called with correct args.
    expect(setClassRegistry).toHaveBeenCalledWith(Test, matcher);
  });
});
