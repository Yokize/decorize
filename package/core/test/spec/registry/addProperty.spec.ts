import { Decorator } from '~decorator';
import { PropertyRegistryEntry } from '~registry/propertyRegistry';

// Register decorator at the property registry for advanced
// decoration and inspection.
describe('addProperty', (): void => {
  // Case::
  test('should add entry to the property registry', async (): Promise<void> => {
    // Testing target.
    const { addProperty }: any = await import('~registry/addProperty');

    // Var: decorator data.
    const entry: PropertyRegistryEntry = {
      name: 'decorator',
      spec: 'spec',
      type: Decorator.Property
    };

    jest
      // Mock: helper to get or create property registry.
      .spyOn(await import('~registry/getPropertyRegistry'), 'getOrCreatePropertyRegistry')
      .mockReturnValue({ decorator: [], parameter: {} });

    // Mock: helper to set property registry.
    const setPropertyRegistry: jest.SpyInstance = jest
      .spyOn(await import('~registry/setPropertyRegistry'), 'setPropertyRegistry')
      .mockReturnValue(undefined);

    // Opr: add entry to property registry.
    addProperty({}, 'test', entry);

    // Exp: helper to set property registry have been called with correct args.
    expect(setPropertyRegistry).toHaveBeenCalledWith({}, 'test', expect.objectContaining({ decorator: [entry] }));
  });
});
