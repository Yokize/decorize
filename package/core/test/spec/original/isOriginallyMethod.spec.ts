import { OriginalType } from '~original/getOriginalType';

// Determine whether the property is originally described as method.
describe('isDecoratedMethod', (): void => {
  // Case::
  test('should determine whether method already decorated based on original type', async (): Promise<void> => {
    // Testing target.
    const { isOriginallyMethod }: any = await import('~original/isOriginallyMethod');

    jest
      .spyOn(await import('~original/getOriginalType'), 'getOriginalType')
      // Mock first result as method.
      .mockReturnValueOnce(OriginalType.Method)
      // Mock second result as accessor.
      .mockReturnValueOnce(OriginalType.Accessor);

    // Exp: true as original type is suitable.
    expect(isOriginallyMethod({}, 'test')).toBe(true);

    // Exp: false as original type is not suitable.
    expect(isOriginallyMethod({}, 'test')).toBe(false);
  });
});
