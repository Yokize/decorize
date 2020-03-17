import { Decorator } from '~decorator';
import { ClassRegistryEntry } from '~registry/classRegistry';

// Register decorator at the class registry for advanced
// decoration and inspection.
describe('addClass', (): void => {
  // Case::
  test('should add entry to the class registry', async (): Promise<void> => {
    // Testing target.
    const { addClass }: any = await import('~registry/addClass');

    // Var: decorator data.
    const entry: ClassRegistryEntry = {
      name: 'decorator',
      spec: 'spec',
      type: Decorator.Class
    };

    jest
      // Mock: helper to get or create class registry.
      .spyOn(await import('~registry/getClassRegistry'), 'getOrCreateClassRegistry')
      .mockReturnValue({ decorator: [], property: {} });

    // Mock: helper to set class registry.
    const setClassRegistry: jest.SpyInstance = jest
      .spyOn(await import('~registry/setClassRegistry'), 'setClassRegistry')
      .mockReturnValue(undefined);

    // Opr: add entry to class registry.
    addClass({}, entry);

    // Exp: helper to set class registry have been called with correct args.
    expect(setClassRegistry).toHaveBeenCalledWith({}, expect.objectContaining({ decorator: [entry] }));
  });
});
