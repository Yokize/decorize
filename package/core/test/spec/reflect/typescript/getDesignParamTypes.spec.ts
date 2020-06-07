// Get designed type of constructor or method parameters.
describe('getDesignParamTypes', (): void => {
  // Case::
  test('should get designed param types', async (): Promise<void> => {
    // Testing target.
    const { getDesignParamTypes } = await import('~reflect/typescript/getDesignParamTypes');

    // Var: class with decorators.
    @((..._: any): any => void _)
    class Test {
      constructor(_: number) {
        void _;
      }

      @((..._: any): any => void _)
      public method1(_1: string, _2: boolean): undefined {
        return void [_1, _2];
      }

      @((..._: any): any => void _)
      public method2(_1: Test, _2: any): undefined {
        return void [_1, _2];
      }
    }

    // Exp: designed typescript param types.
    expect(getDesignParamTypes(Test)).toEqual([Number]);

    // Exp: designed typescript param types.
    expect(getDesignParamTypes(Test.prototype, 'method1')).toEqual([String, Boolean]);

    // Exp: designed typescript param types.
    expect(getDesignParamTypes(Test.prototype, 'method2')).toEqual([Test, Object]);
  });
});
