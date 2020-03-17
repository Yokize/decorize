import { Decorator } from '~decorator';
import { ParamRegistryEntry } from '~registry/paramRegistry';

// Register decorator at the param registry for advanced
// decoration and inspection.
describe('addParam', (): void => {
  // Case::
  test('should add entry to the param registry', async (): Promise<void> => {
    // Testing target.
    const { addParam }: any = await import('~registry/addParam');

    // Var: decorator data.
    const entry: ParamRegistryEntry = {
      name: 'decorator',
      spec: 'spec',
      type: Decorator.Parameter
    };

    jest
      // Mock: helper to get or create param registry.
      .spyOn(await import('~registry/getParamRegistry'), 'getOrCreateParamRegistry')
      .mockReturnValue({ decorator: [] });

    // Mock: helper to set param registry.
    const setParamRegistry: jest.SpyInstance = jest
      .spyOn(await import('~registry/setParamRegistry'), 'setParamRegistry')
      .mockReturnValue(undefined);

    // Opr: add entry to param registry.
    addParam({}, 'test', 0, entry);

    // Exp: helper to set param registry have been called with correct args.
    expect(setParamRegistry).toHaveBeenCalledWith({}, 'test', 0, expect.objectContaining({ decorator: [entry] }));
  });
});
