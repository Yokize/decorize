// Determine whether the classes or classes of instances are equal.
describe('isEqualClass', (): void => {
  // Case::
  test('should determine as equal classes', async (): Promise<any> => {
    // Testing target.
    const { isEqualClass } = await import('~class/isEqualClass');

    // Var: testing class.
    class Test {}

    // Exp: true as equal classes.
    expect(isEqualClass(Test, Test)).toBe(true);

    // Exp: true as equal classes.
    expect(isEqualClass(new Test(), Test)).toBe(true);

    // Exp: true as equal classes.
    expect(isEqualClass(Test, new Test())).toBe(true);

    // Exp: true as equal classes.
    expect(isEqualClass(new Test(), new Test())).toBe(true);
  });
});
