// Bind the method or all methods of the class to the context used to access it.
describe('@bind', (): void => {
  // Case::
  test('should bind the method to the context', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Test {
      public constructor(private state: string) {}

      @bind
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Exp: bound method generated only once.
    expect(test.method).toBe(test.method);

    // Exp: method is bound to the context and returns correct value.
    expect(test.method.call({})).toBe('anyTxt');
  });

  // Case::
  test('should bind the method to the context (factory)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    class Test {
      public constructor(private state: string) {}

      @bind()
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Exp: bound method generated only once.
    expect(test.method).toBe(test.method);

    // Exp: method is bound to the context and returns correct value.
    expect(test.method.call({})).toBe('anyTxt');
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

    // Exp: method is bound to the context and returns correct value.
    expect(test.method.call({})).toBe('anyTxt');
  });

  // Case::
  test('should bind the method to the context (decorated)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Mock: helper to check whether decorated property was originally the method.
    const isOriginallyMethod: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/original/isOriginallyMethod'), 'isOriginallyMethod')
      .mockReturnValue(true);

    // Var: class with decorated method.
    class Test {
      public constructor(public state: string) {}

      @bind
      public get method(): Function {
        return function(this: Test): string {
          return this.state;
        };
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Exp: method is bound to the context and returns correct value.
    expect(test.method.call({})).toBe('anyTxt');

    // Exp: helper to check decorated property have been called.
    expect(isOriginallyMethod).toHaveBeenCalled();
  });

  // Case::
  test('should bind the methods of the class to the context', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: decorated class with methods.
    @bind
    class Test {
      public constructor(public state: string) {}

      public methodX(): string {
        return this.state;
      }

      public methodY(): string {
        return this.state;
      }
    }

    // Var: instance of the decorated class.
    const test: Test = new Test('anyTxt');

    // Exp: bound methods generated only once.
    expect(test.methodX).toBe(test.methodX);

    // Exp: method is bound to the context and returns correct value.
    expect(test.methodX.call({})).toBe('anyTxt');

    // Exp: method is bound to the context and returns correct value.
    expect(test.methodY.call({})).toBe('anyTxt');
  });

  // Case::
  test('should bind the methods of the class to the context (factory)', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: decorated class with methods.
    @bind()
    class Test {
      public constructor(public state: string) {}

      public methodX(): string {
        return this.state;
      }

      public methodY(): string {
        return this.state;
      }
    }

    // Var: instance of the decorated class.
    const test: Test = new Test('anyTxt');

    // Exp: bound methods generated only once.
    expect(test.methodX).toBe(test.methodX);

    // Exp: method is bound to the context and returns correct value.
    expect(test.methodX.call({})).toBe('anyTxt');

    // Exp: method is bound to the context and returns correct value.
    expect(test.methodY.call({})).toBe('anyTxt');
  });

  // Case::
  test('should ignore binding when accessing from the prototype', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Var: class with the decorated method.
    @bind
    class Test {
      public constructor(public state: string) {}

      public method(): string {
        return this.state;
      }
    }

    // Exp: method is not bound to the context.
    expect(Test.prototype.method.call({ state: 'notBoundTxt' })).toBe('notBoundTxt');
  });

  // Case::
  test('should ignore binding when accessing from the prototype (super)', async (): Promise<void> => {
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
        // Loose context as super is reference to the prototype.
        return super.method.call(null);
      }
    }

    // Var: instance with the decorated method.
    const test: Child = new Child('anyTxt');

    // Exp: method is not bound to the context.
    expect(test.method.call({ state: 'otherTxt' })).toBe(undefined);
  });

  // Case::
  test('should support multiple decorations and conventions', async (): Promise<void> => {
    // Testing target.
    const { bind, Bind } = await import('~legacy/bind');

    // Var: class with the multiple decorations.
    @Bind
    class Test {
      public constructor(private state: string) {}

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

    // Exp: method is bound to the context and returns correct value.
    expect(test.method.call({})).toBe('anyTxt');
  });

  // Case::
  test('should throw error in case used incorrectly', async (): Promise<void> => {
    // Testing target.
    const { bind } = await import('~legacy/bind');

    // Exp: throw error as tried to decorate the property.
    expect((): any => (<any>bind)({}, 'test')).toThrow(Error);

    // Exp: throw error as tried to decorate the property.
    expect((): any => bind({}, 'test', { value: 1 }).get()).toThrow(Error);

    // Exp: throw error as tried to decorate the getter.
    expect((): any => bind({}, 'test', { get: (): any => jest.fn() }).get()).toThrow(Error);

    // Fake the helper to check whether decorated property was originally the method.
    jest.spyOn(await import('@decorize/core/original/isOriginallyMethod'), 'isOriginallyMethod').mockReturnValue(true);

    // Exp: throw error as tried to decorate the invalid decorated method.
    expect((): any => bind({}, 'test', { get: (): any => 1 }).get()).toThrow(Error);
  });
});
