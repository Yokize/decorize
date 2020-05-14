// Bind the method or all methods of the class to the context used to access it.
describe('@bind', (): void => {
  // Case::
  test('should bind the method to the context', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @bind
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Exp: bound method generated only once.
    expect(test.method).toBe(test.method);

    // Exp: method is automatically bound to the instance.
    expect(test.method.call({ state: 'otherTxt' })).toBe(test.state);
  });

  // Case::
  test('should bind the method to the context (factory)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @bind()
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Exp: bound method generated only once.
    expect(test.method).toBe(test.method);

    // Exp: method is automatically bound to the instance.
    expect(test.method.call({ state: 'otherTxt' })).toBe(test.state);
  });

  // Case::
  test('should bind the method to the context (inherited)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Parent {
      public constructor(public state: string) {}

      @bind
      public method(): string {
        return this.state;
      }
    }

    // Var: inherited class.
    class Child extends Parent {}

    // Var: instance with the inherited method.
    const test: Child = new Child('anyTxt');

    // Exp: bound method generated only once.
    expect(test.method).toBe(test.method);

    // Exp: method is automatically bound to the instance.
    expect(test.method.call({ state: 'otherTxt' })).toBe(test.state);
  });

  // Case::
  test('should bind the method to the context (decorated)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Mock: helper to check whether the property was originally the method.
    const isOriginallyMethod: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/original/isOriginallyMethod'), 'isOriginallyMethod')
      .mockReturnValue(true);

    // Var: class with decorated method.
    class Test {
      public constructor(public state: string) {}

      @bind
      public get method(): Function {
        return function (this: Test): string {
          return this.state;
        };
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Exp: method is automatically bound to the instance.
    expect(test.method.call({ state: 'otherTxt' })).toBe(test.state);

    // Exp: helper to check original type have been called.
    expect(isOriginallyMethod).toHaveBeenCalled();
  });

  // Case::
  test('should bind the method to the context (readonly)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @bind
      @((_1: any, _2: string, descriptor: PropertyDescriptor): any => ({
        ...descriptor,
        writable: false
      }))
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Exp: bound method generated only once.
    expect(test.method).toBe(test.method);

    // Exp: method is automatically bound to the instance.
    expect(test.method.call({ state: 'otherTxt' })).toBe(test.state);

    // Exp: setter not defined as method is read only.
    expect(Object.getOwnPropertyDescriptor(Test.prototype, 'method').set).toBeUndefined();
  });

  // Case::
  test('should bind the method of the decorated class to the context', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: decorated class with methods.
    @bind
    class Test {
      public constructor(public state: string) {}

      public methodOne(): string {
        return this.state;
      }

      public methodTwo(): string {
        return this.state;
      }
    }

    // Var: instance of the decorated class.
    const test: Test = new Test('anyTxt');

    // Exp: bound methods generated only once.
    expect(test.methodOne).toBe(test.methodOne);

    // Exp: method is automatically bound to the instance.
    expect(test.methodOne.call({ state: 'otherTxt' })).toBe(test.state);

    // Exp: method is automatically bound to the instance.
    expect(test.methodTwo.call({ state: 'otherTxt' })).toBe(test.state);
  });

  // Case::
  test('should bind the method of the decorated class to the context (factory)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: decorated class with methods.
    @bind()
    class Test {
      public constructor(public state: string) {}

      public methodOne(): string {
        return this.state;
      }

      public methodTwo(): string {
        return this.state;
      }
    }

    // Var: instance of the decorated class.
    const test: Test = new Test('anyTxt');

    // Exp: bound methods generated only once.
    expect(test.methodOne).toBe(test.methodOne);

    // Exp: method is automatically bound to the instance.
    expect(test.methodOne.call({ state: 'otherTxt' })).toBe(test.state);

    // Exp: method is automatically bound to the instance.
    expect(test.methodTwo.call({ state: 'otherTxt' })).toBe(test.state);
  });

  // Case::
  test('should ignore binding when accessed via prototype', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @bind
      public method(): string {
        return this.state;
      }
    }

    // Exp: method is not bound to the prototype.
    expect(Test.prototype.method.call({ state: 'notBoundTxt' })).toBe('notBoundTxt');
  });

  // Case::
  test('should ignore binding when accessed via super', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Parent {
      public constructor(public state: string = 'parentTxt') {}

      @bind
      public method(): string {
        return this?.state;
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      public method(): string {
        // Not bound as accessed via `super`.
        return super.method();
      }
    }

    // Var: instance with the overridden method.
    const test: Child = new Child('anyTxt');

    // Exp: super.method is not bound to the instance.
    expect(test.method.call({ state: 'otherTxt' })).toBe('otherTxt');
  });

  // Case::
  test('should ignore binding when accessed via super (decorated)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Parent {
      public constructor(public state: string) {}

      @bind
      public method(): string {
        return this?.state;
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      @bind
      public method(): string {
        // Exp: method itself is bound to instance context.
        expect(this.state).toBe('anyTxt');

        // Not bound as accessed via `super`.
        return super.method.call(null);
      }
    }

    // Var: instance with the overridden method.
    const test: Child = new Child('anyTxt');

    // Exp: super.method is not bound to the instance.
    expect(test.method.call({ state: 'otherTxt' })).toBeUndefined();
  });

  // Case::
  test('should ignore binding when the method is static', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Test {
      public static state: string = 'anyTxt';

      @bind
      public static method(): string {
        return this.state;
      }
    }

    // Exp: method is not bound to the class.
    expect(Test.method.call({ state: 'notBoundTxt' })).toBe('notBoundTxt');
  });

  // Case::
  test('should ignore binding of class non-method properties', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: decorated class with properties.
    @bind
    class Test {
      public constructor(public state: string) {}

      public methodOne: Function = function (this: any): string {
        return this.state;
      };

      public get methodTwo(): Function {
        return function (this: any): string {
          return this.state;
        };
      }
    }

    // Var: instance of the decorated class.
    const test: Test = new Test('anyTxt');

    // Exp: method is not bound to the instance.
    expect(test.methodOne.call({ state: 'notBoundTxt' })).toBe('notBoundTxt');

    // Exp: method is not bound to the instance.
    expect(test.methodTwo.call({ state: 'notBoundTxt' })).toBe('notBoundTxt');
  });

  // Case::
  test('should ignore binding of class non-configurable properties', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: decorated class with methods.
    @bind
    class Test {
      public constructor(public state: string) {}

      @((_1: any, _2: string, descriptor: PropertyDescriptor): any => ({
        ...descriptor,
        configurable: false
      }))
      public method(): string {
        return this.state;
      }
    }

    // Var: instance of the decorated class.
    const test: Test = new Test('anyTxt');

    // Exp: method is not bound to the instance.
    expect(test.method.call({ state: 'notBoundTxt' })).toBe('notBoundTxt');
  });

  // Case::
  test('should support multiple decorations and conventions', async (): Promise<void> => {
    // Testing target.
    const { bind, Bind } = await import('~legacy/bind');

    // Var: class with the multiple decorations.
    @Bind
    class Test {
      public constructor(public state: string) {}

      @bind
      @bind()
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the multiple decorations.
    const test: Test = new Test('anyTxt');

    // Exp: bound method generated only once.
    expect(test.method).toBe(test.method);

    // Exp: method is automatically bound to the instance.
    expect(test.method.call({ state: 'otherTxt' })).toBe(test.state);
  });

  // Case::
  test('should throw error in case used incorrectly', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Exp: throw error as tried to pass a nil config.
    expect((): any => (<any>bind)(null)).toThrow(Error);

    // Exp: throw error as tried to decorate the property.
    expect((): any => (<any>bind)({}, 'test')).toThrow(Error);

    // Exp: throw error as tried to decorate the property.
    expect((): any => bind({}, 'test', { value: 1 }).get()).toThrow(Error);

    // Exp: throw error as tried to decorate the getter.
    expect((): any => bind({}, 'test', { get: (): any => jest.fn() }).get()).toThrow(Error);

    // Mock: helper to check whether property was originally the method.
    jest.spyOn(await import('@decorize/core/original/isOriginallyMethod'), 'isOriginallyMethod').mockReturnValue(true);

    // Exp: throw error as tried to decorate the invalid method.
    expect((): any => bind({}, 'test', { get: (): any => 1 }).get()).toThrow(Error);
  });
});
