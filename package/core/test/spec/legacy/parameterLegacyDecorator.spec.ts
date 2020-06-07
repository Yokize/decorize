import { Decorator } from '~decorator';

// Creates legacy parameter decorator which execute logic on runtime.
describe('parameterLegacyDecorator', (): void => {
  // Case::
  test('should create and register decorator', async (): Promise<void> => {
    // Testing target.
    const { parameterLegacyDecorator } = await import('~legacy/parameterLegacyDecorator');

    // Mock: add to param registry.
    const addParam: jest.SpyInstance = jest
      .spyOn(await import('~registry/addParam'), 'addParam')
      .mockReturnValue(undefined);

    // Var: testing class.
    class Test {}

    // Var: decorator data.
    const entry: any = {
      name: 'decorator',
      spec: 'ts',
      type: Decorator.Parameter
    };

    // Var: newly created param decorator.
    const decorator: ParameterDecorator = parameterLegacyDecorator(entry.name, null, (): string => 'AnyTxt');

    // Exp: undefined returned from the decorator's logic.
    expect(decorator(Test, 'test', 1)).toBe(undefined);

    // Exp: helper to add entry to param registry have been called with correct args.
    expect(addParam).toHaveBeenCalledWith(Test, 'test', 1, expect.objectContaining(entry));
  });

  // Case::
  test('should create and register decorator with metadata', async (): Promise<void> => {
    // Testing target.
    const { parameterLegacyDecorator } = await import('~legacy/parameterLegacyDecorator');

    // Mock: add to param registry.
    const addParam: jest.SpyInstance = jest
      .spyOn(await import('~registry/addParam'), 'addParam')
      .mockReturnValue(undefined);

    // Var: testing class.
    class Test {}

    // Var: metadata.
    const metadata: any = {
      config: true
    };

    // Var: newly created param decorator.
    const decorator: ParameterDecorator = parameterLegacyDecorator('decorator', metadata);

    // Exp: undefined returned from the decorator's logic.
    expect(decorator(Test, 'test', 1)).toBe(undefined);

    // Exp: helper to add entry to param registry have been called with correct args.
    expect(addParam).toHaveBeenCalledWith(Test, 'test', 1, expect.objectContaining({ metadata }));
  });
});
