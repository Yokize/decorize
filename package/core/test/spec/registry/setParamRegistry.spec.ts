import { ParamRegistry } from '~registry/paramRegistry';

// Link registry with the class (property), method & param.
describe('setParamRegistry', (): void => {
  // Case::
  test('should link registry with the class, method & param', async (): Promise<void> => {
    // Testing target.
    const { setParamRegistry }: any = await import('~registry/setParamRegistry');

    // Var: testing class.
    class Test {}

    // Var: param registry.
    const registry: ParamRegistry = { decorator: [] };

    // Var: registry matcher.
    const matcher: any = expect.objectContaining({ parameter: { 0: registry } });

    // Mock: helper to set property registry.
    const setPropertyRegistry: jest.SpyInstance = jest.spyOn(
      await import('~registry/setPropertyRegistry'),
      'setPropertyRegistry'
    );

    jest
      // Mock: helper to get property registry.
      .spyOn(await import('~registry/getPropertyRegistry'), 'getOrCreatePropertyRegistry')
      .mockReturnValue({ decorator: [], parameter: {} });

    // Opr: link registry with class, method & param.
    setParamRegistry(Test, 'test', 0, registry);

    // Exp: helper to set registry have been called with correct args.
    expect(setPropertyRegistry).toHaveBeenCalledWith(Test, 'test', matcher);
  });
});
