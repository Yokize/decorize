import { OriginalType } from '~original/getOriginalType';

// Determine whether the property is originally described as simple property.
describe('isOriginallyProperty', (): void => {
  // Case::
  test('should determine whether property already decorated based on original type', async (): Promise<void> => {
    // Testing target.
    const { isOriginallyProperty }: any = await import('~original/isOriginallyProperty');

    jest
      .spyOn(await import('~original/getOriginalType'), 'getOriginalType')
      // Mock first result as accessor.
      .mockReturnValueOnce(OriginalType.Property)
      // Mock second result as method.
      .mockReturnValueOnce(OriginalType.Method);

    // Exp: true as original type is suitable.
    expect(isOriginallyProperty({}, 'test')).toBe(true);

    // Exp: false as original type is not suitable.
    expect(isOriginallyProperty({}, 'test')).toBe(false);
  });
});
