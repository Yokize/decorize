import { Decorator } from '~decorator';

// Creates legacy property decorator which execute logic on runtime.
describe('propertyLegacyDecorator', (): void => {
  // Case::
  test('should create and register decorator', async (): Promise<void> => {
    // Testing target.
    const { propertyLegacyDecorator } = await import('~legacy/propertyLegacyDecorator');

    // Mock: add to property registry.
    const addProperty: jest.SpyInstance = jest
      .spyOn(await import('~registry/addProperty'), 'addProperty')
      .mockReturnValue(undefined);

    // Var: testing class.
    class Test {}

    // Var: decorator data.
    const entry: any = {
      name: 'decorator',
      spec: 'legacy',
      type: Decorator.Property
    };

    // Var: newly created property decorator.
    const decorator: PropertyDecorator = propertyLegacyDecorator(entry.name, null, (): string => 'AnyTxt');

    // Exp: undefined returned from the decorator's logic.
    expect(decorator(Test, 'test')).toBe(undefined);

    // Exp: helper to add entry to property registry have been called with correct args.
    expect(addProperty).toHaveBeenCalledWith(Test, 'test', expect.objectContaining(entry));
  });

  // Case::
  test('should create and register decorator with metadata', async (): Promise<void> => {
    // Testing target.
    const { propertyLegacyDecorator } = await import('~legacy/propertyLegacyDecorator');

    // Mock: add to property registry.
    const addProperty: jest.SpyInstance = jest
      .spyOn(await import('~registry/addProperty'), 'addProperty')
      .mockReturnValue(undefined);

    // Var: testing class.
    class Test {}

    // Var: metadata.
    const metadata: any = {
      config: true
    };

    // Var: newly created property decorator.
    const decorator: PropertyDecorator = propertyLegacyDecorator('decorator', metadata);

    // Exp: undefined returned from the decorator's logic.
    expect(decorator(Test, 'test')).toBe(undefined);

    // Exp: helper to add entry to property registry have been called with correct args.
    expect(addProperty).toHaveBeenCalledWith(Test, 'test', expect.objectContaining({ metadata }));
  });
});
