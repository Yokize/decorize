import { Decorator } from '~decorator';
import { OriginalType } from '~original/getOriginalType';

// Determine original type based on already registered decorators.
describe('original', (): void => {
  // Case::
  test('should get original type based on registry', async (): Promise<void> => {
    // Testing target.
    const { getOriginalType } = await import('~original/getOriginalType');

    jest
      // Mock: helper to get property registry.
      .spyOn(await import('~registry/getPropertyRegistry'), 'getPropertyRegistry')
      .mockReturnValue({ decorator: [{ name: '', spec: '', type: Decorator.Method }], parameter: {} });

    // Exp: OriginalType.Method as first applied decorator is method type.
    expect(getOriginalType({}, 'test')).toEqual(OriginalType.Method);
  });

  // Case::
  test('should return undefined in case registry not defined', async (): Promise<void> => {
    // Testing target.
    const { getOriginalType } = await import('~original/getOriginalType');

    jest
      // Mock: helper to get property registry.
      .spyOn(await import('~registry/getPropertyRegistry'), 'getPropertyRegistry')
      .mockReturnValue(undefined);

    // Exp: undefined as registry is not defined.
    expect(getOriginalType({}, 'test')).toEqual(undefined);
  });

  // Case::
  test('should return undefined in case registry is empty', async (): Promise<void> => {
    // Testing target.
    const { getOriginalType } = await import('~original/getOriginalType');

    jest
      // Mock: helper to get property registry.
      .spyOn(await import('~registry/getPropertyRegistry'), 'getPropertyRegistry')
      .mockReturnValue({ decorator: [], parameter: {} });

    // Exp: undefined as registry is empty.
    expect(getOriginalType({}, 'test')).toEqual(undefined);
  });

  // Case::
  test('should return undefined in case registry not valid', async (): Promise<void> => {
    // Testing target.
    const { getOriginalType } = await import('~original/getOriginalType');

    jest
      // Mock: helper to get property registry.
      .spyOn(await import('~registry/getPropertyRegistry'), 'getPropertyRegistry')
      .mockReturnValue(<any>{});

    // Exp: undefined as registry is not valid.
    expect(getOriginalType({}, 'test')).toEqual(undefined);
  });
});
