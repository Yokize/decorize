import { Decorator } from '~decorator';

// Creates legacy method decorator which execute logic on runtime.
describe('methodLegacyDecorator', (): void => {
  // Case::
  test('should create and register decorator', async (): Promise<void> => {
    // Testing target.
    const { methodLegacyDecorator } = await import('~legacy/methodLegacyDecorator');

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
      type: Decorator.Method
    };

    // Var: descriptor to return from the decorator.
    const descriptor: PropertyDescriptor = { value: 'NewDescriptor' };

    // Var: newly created method decorator.
    const decorator: MethodDecorator = methodLegacyDecorator(entry.name, (): any => descriptor);

    // Exp: descriptor returned from the decorator's logic.
    expect(decorator(Test, 'test', {})).toBe(descriptor);

    // Exp: helper to add entry to property registry have been called with correct args.
    expect(addProperty).toHaveBeenCalledWith(Test, 'test', expect.objectContaining(entry));
  });
});
