import { Decorator } from '~decorator';

// Creates legacy class decorator which execute logic on runtime.
describe('classLegacyDecorator', (): void => {
  // Case::
  test('should create and register decorator', async (): Promise<void> => {
    // Testing target.
    const { classLegacyDecorator } = await import('~legacy/classLegacyDecorator');

    // Mock: add to class registry.
    const addClass: jest.SpyInstance = jest
      .spyOn(await import('~registry/addClass'), 'addClass')
      .mockReturnValue(undefined);

    // Var: testing class.
    class Test {}

    // Var: decorator data.
    const entry: any = {
      name: 'decorator',
      spec: 'legacy',
      type: Decorator.Class
    };

    // Var: newly created class decorator.
    const decorator: ClassDecorator = classLegacyDecorator(entry.name, null, () => Test);

    // Exp: class returned from the decorator's logic.
    expect(decorator(Test)).toBe(Test);

    // Exp: helper to add entry to class registry have been called with correct args.
    expect(addClass).toHaveBeenCalledWith(Test, expect.objectContaining(entry));
  });

  // Case::
  test('should create and register decorator with metadata', async (): Promise<void> => {
    // Testing target.
    const { classLegacyDecorator } = await import('~legacy/classLegacyDecorator');

    // Mock: add to class registry.
    const addClass: jest.SpyInstance = jest
      .spyOn(await import('~registry/addClass'), 'addClass')
      .mockReturnValue(undefined);

    // Var: testing class.
    class Test {}

    // Var: metadata.
    const metadata: any = {
      config: true
    };

    // Var: newly created class decorator.
    const decorator: ClassDecorator = classLegacyDecorator('decorator', metadata);

    // Exp: class returned from the decorator's logic.
    expect(decorator(Test)).toBe(Test);

    // Exp: helper to add entry to class registry have been called with correct args.
    expect(addClass).toHaveBeenCalledWith(Test, expect.objectContaining({ metadata }));
  });
});
