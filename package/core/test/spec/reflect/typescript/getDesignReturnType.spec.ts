// Get designed type of method return.
describe('getDesignReturnType', (): void => {
  // Case::
  test('should get designed return type', async (): Promise<void> => {
    // Testing target.
    const { getDesignReturnType } = await import('~reflect/typescript/getDesignReturnType');

    // Var: class with decorators.
    class Test {
      @((..._: any): any => void _)
      public method1(): string {
        return null;
      }

      @((..._: any): any => void _)
      public method2(): Test {
        return null;
      }
    }

    // Exp: designed typescript return type.
    expect(getDesignReturnType(Test.prototype, 'method1')).toBe(String);

    // Exp:  designed typescript return type.
    expect(getDesignReturnType(Test.prototype, 'method2')).toBe(Test);
  });
});
