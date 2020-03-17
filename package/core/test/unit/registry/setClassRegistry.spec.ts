import { BaseRegistry } from '~registry/baseRegistry';

// Link registry with the class (prototype).
describe('setClassRegistry', (): void => {
  // Case::
  test('should link registry with the class', async (): Promise<void> => {
    // Testing target.
    const { setClassRegistry }: any = await import('~registry/setClassRegistry');

    // Var: testing class.
    class Test {}

    // Var: class registry.
    const registry: BaseRegistry = { decorator: [] };

    // Mock: helper to define own metadata.
    const defineMetadata: jest.SpyInstance = jest.spyOn(await import('~reflect/defineMetadata'), 'defineMetadata');

    // Opr: link registry with class.
    setClassRegistry(Test, registry);

    // Exp: helper to define metadata have been called with correct args.
    expect(defineMetadata).toHaveBeenCalledWith(expect.anything(), registry, Test);
  });
});
