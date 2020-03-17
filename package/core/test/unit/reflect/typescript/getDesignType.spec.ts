// Get designed type of property.
describe('getDesignType', (): void => {
  // Case::
  test('should get designed type', async (): Promise<void> => {
    // Testing target.
    const { getDesignType } = await import('~reflect/typescript/getDesignType');

    // Var: class with decorators.
    class Test {
      @((..._: any): any => void _)
      public prop1: string;

      @((..._: any): any => void _)
      public prop2: Test;
    }

    // Exp: designed typescript type.
    expect(getDesignType(Test.prototype, 'prop1')).toBe(String);

    // Exp: designed typescript type.
    expect(getDesignType(Test.prototype, 'prop2')).toBe(Test);
  });
});
