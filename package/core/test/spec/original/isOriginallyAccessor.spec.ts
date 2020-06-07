import { OriginalType } from '~original/getOriginalType';

// Determine whether the property is originally described as accessor.
describe('isOriginallyAccessor', (): void => {
  // Case::
  test('should determine whether accessor already decorated based on original type', async (): Promise<void> => {
    // Testing target.
    const { isOriginallyAccessor }: any = await import('~original/isOriginallyAccessor');

    jest
      .spyOn(await import('~original/getOriginalType'), 'getOriginalType')
      // Mock first result as accessor.
      .mockReturnValueOnce(OriginalType.Accessor)
      // Mock second result as method.
      .mockReturnValueOnce(OriginalType.Method);

    // Exp: true as original type is suitable.
    expect(isOriginallyAccessor({}, 'test')).toBe(true);

    // Exp: false as original type is not suitable.
    expect(isOriginallyAccessor({}, 'test')).toBe(false);
  });
});
