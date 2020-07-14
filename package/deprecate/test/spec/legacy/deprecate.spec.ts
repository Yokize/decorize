import { Decorator } from '@decorize/core/decorator';

// Decorator to deprecate the class, method, accessor and property.
describe('@deprecate', (): void => {
  // Var: deprecation message.
  const message: string = 'Deprecated';

  // prettier-ignore
  beforeEach(async (): Promise<void> => {
    // Utilities to create and output warning.
    const { Global } = await import('~global');

    // Mock: helper to output warning to console.
    jest.spyOn(Global, 'outputWarning').mockReturnValue();
  });

  // Case::
  test('should deprecate the class', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: decorated class.
    @deprecate
    class Test {}

    // Opr: initiate class and output deprecation message.
    new Test();

    // Exp: helper to output deprecation warning for class have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Class,
        name: ['Test'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the class (message)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: decorated class.
    @deprecate(message)
    class Test {}

    // Opr: initiate class and output deprecation message.
    new Test();

    // Exp: helper to output deprecation warning for class have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Class,
        name: ['Test'],
        message: [message]
      })
    );
  });

  // Case::
  test('should deprecate the class (property)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: decorated class.
    @deprecate
    class Test {
      public static property: string = 'anyTxt';
    }

    // Opr: assign value and output deprecation message.
    Test.property = 'otherTxt';

    // Exp: helper to output deprecation warning for property have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Property,
        name: ['Test', 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the class (method)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: decorated class.
    @deprecate
    class Test {
      public static method(): void {}
    }

    // Opr: execute method and output deprecation message.
    Test.method();

    // Exp: helper to output deprecation warning for method have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Method,
        name: ['Test', 'method'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the method', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated method.
    class Test {
      @deprecate
      public method(): void {}
    }

    // Opr: execute method and output deprecation message.
    new Test().method();

    // Exp: helper to output deprecation warning for method have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Method,
        name: [Test.name, 'method'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the method (static)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated method.
    class Test {
      @deprecate
      public static method(): void {}
    }

    // Opr: execute method and output deprecation message.
    Test.method();

    // Exp: helper to output deprecation warning for method have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Method,
        name: [Test.name, 'method'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the method (message)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated method.
    class Test {
      @deprecate(message)
      public method(): void {}
    }

    // Opr: execute method and output deprecation message.
    new Test().method();

    // Exp: helper to output deprecation warning for method have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Method,
        name: [Test.name, 'method'],
        message: [message]
      })
    );
  });

  // Case::
  test('should deprecate the accessors', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated accessors.
    class Test {
      @deprecate
      public get property(): any {
        return;
      }

      public set property(_: any) {}
    }

    // Opr: execute accessor and output deprecation message.
    new Test().property;

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledTimes(1);

    // Opr: execute accessor and output deprecation message.
    new Test().property = 'anyTxt';

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledTimes(2);

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Accessor,
        name: [Test.name, 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the accessors (static)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated accessors.
    class Test {
      @deprecate
      public static get property(): any {
        return;
      }

      public static set property(_: any) {}
    }

    // Opr: execute accessor and output deprecation message.
    Test.property;

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledTimes(1);

    // Opr: execute accessor and output deprecation message.
    Test.property = 'anyTxt';

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledTimes(2);

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Accessor,
        name: [Test.name, 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the accessors (getter)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated getter.
    class Test {
      public get property(): any {
        return;
      }

      @deprecate({ getter: true })
      public set property(_: any) {}
    }

    // Opr: execute setter and that must not output deprecation message.
    new Test().property = 'anyTxt';

    // Exp: helper to output deprecation warning for accessor not have been called.
    expect((await import('~global')).Global.outputWarning).not.toHaveBeenCalled();

    // Opr: execute getter and output deprecation message.
    new Test().property;

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Accessor,
        name: [Test.name, 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the accessors (setter)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated setter.
    class Test {
      @deprecate({ setter: true })
      public get property(): any {
        return;
      }

      public set property(_: any) {}
    }

    // Opr: execute getter and that must not output deprecation message.
    new Test().property;

    // Exp: helper to output deprecation warning for accessor not have been called.
    expect((await import('~global')).Global.outputWarning).not.toHaveBeenCalled();

    // Opr: execute accessor and output deprecation message.
    new Test().property = 'anyTxt';

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Accessor,
        name: [Test.name, 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the accessors (message)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated accessors.
    class Test {
      @deprecate(message)
      public get property(): any {
        return;
      }

      public set property(_: any) {}
    }

    // Opr: execute accessor and output deprecation message.
    new Test().property;

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledTimes(1);

    // Opr: execute accessor and output deprecation message.
    new Test().property = 'anyTxt';

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledTimes(2);

    // Exp: helper to output deprecation warning for accessor have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Accessor,
        name: [Test.name, 'property'],
        message: [message]
      })
    );
  });

  // Case::
  test('should deprecate the property', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated property.
    class Test {
      @deprecate
      public property: string = 'anyTxt';
    }

    // Exp: get property and output deprecation message.
    expect(new Test().property).toBe('anyTxt');

    // Exp: helper to output deprecation warning for property have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Property,
        name: [Test.name, 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the property (assign)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated property.
    class Test {
      @deprecate
      public property: string;
    }

    // Opr: assign property and output deprecation message.
    new Test().property = 'anyTxt';

    // Exp: helper to output deprecation warning for property have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Property,
        name: [Test.name, 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the property (static)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated property.
    class Test {
      @deprecate
      public static property: string;
    }

    // Opr: assign property and output deprecation message.
    Test.property = 'anyTxt';

    // Exp: helper to output deprecation warning for property have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Property,
        name: [Test.name, 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should deprecate the property (message)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated property.
    class Test {
      @deprecate(message)
      public static property: string;
    }

    // Opr: assign property and output deprecation message.
    Test.property = 'anyTxt';

    // Exp: helper to output deprecation warning for property have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Property,
        name: [Test.name, 'property'],
        message: [message]
      })
    );
  });

  // Case::
  test('should deprecate the property (readonly)', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated property.
    class Test {
      @deprecate
      @((_1: any, _2: string): any =>
        Object.defineProperty(_1, _2, {
          value: 'anyTxt',
          writable: false,
          configurable: true
        }))
      public static property: string;
    }

    // Exp: property defined with value.
    expect(Test.property).toBe('anyTxt');

    // Exp: setter is not defined as property is not writable.
    expect(Object.getOwnPropertyDescriptor(Test, 'property').set).toBeUndefined();
  });

  // Case::
  test('should support deprecation with array message', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated method.
    class Test {
      @deprecate([message])
      public method(): void {}
    }

    // Opr: execute method and output deprecation message.
    new Test().method();

    // Exp: helper to output deprecation warning for method have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Method,
        name: [Test.name, 'method'],
        message: [message]
      })
    );
  });

  // Case::
  test('should support multiple decorations and conventions', async (): Promise<void> => {
    // Testing target.
    const { deprecate, Deprecate } = await import('~legacy/deprecate');

    // Var: class with the decorated property.
    class Test {
      @deprecate
      @Deprecate()
      public property: string = 'anyTxt';
    }

    // Exp: get property and output deprecation message.
    expect(new Test().property).toBe('anyTxt');

    // Exp: helper to output deprecation warning for property have been called.
    expect((await import('~global')).Global.outputWarning).toHaveBeenCalledWith(
      expect.objectContaining({
        type: Decorator.Property,
        name: [Test.name, 'property'],
        message: undefined
      })
    );
  });

  // Case::
  test('should ignore deprecation of class non-configurable properties', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Var: decorated class.
    @deprecate
    class Test {
      @((_1: any, _2: string, descriptor: PropertyDescriptor): any => ({
        ...descriptor,
        configurable: false
      }))
      public static method(): void {}
    }

    // Opr: execute method and avoid deprecation message.
    Test.method();

    // Exp: helper to output deprecation warning for method not have been called.
    expect((await import('~global')).Global.outputWarning).not.toHaveBeenCalledWith();
  });

  // Case::
  test('should throw error in case used incorrectly', async (): Promise<void> => {
    // Testing target.
    const { deprecate } = await import('~legacy/deprecate');

    // Exp: throw error as tried to decorate with invalid.
    expect((): any => (<any>deprecate)(null, null, null)).toThrow(Error);
  });
});
