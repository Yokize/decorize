// Cache the result of the method or getter.
describe('@cache', (): void => {
  // Case::
  test('should cache the result of the getter', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated getter.
    class Test {
      public constructor(public state: string) {}

      @cache
      public get prop(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated getter.
    const test: Test = new Test('anyTxt');

    // Var: getter result which should be cached.
    const cached: string = test.prop;

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(test.prop);
  });

  // Case::
  test('should cache the result of the getter (static)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated getter.
    class Test {
      public static state: string = 'anyTxt';

      @cache
      public static get prop(): string {
        return Test.state;
      }
    }

    // Var: getter result which should be cached.
    const cached: string = Test.prop;

    // Opr: assign the new value to the internal state.
    Test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(Test.prop);
  });

  // Case::
  test('should cache the result of the getter (factory)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated getter.
    class Test {
      public constructor(public state: string) {}

      @cache()
      public get prop(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated getter.
    const test: Test = new Test('anyTxt');

    // Var: getter result which should be cached.
    const cached: string = test.prop;

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(test.prop);
  });

  // Case::
  test('should cache the result of the getter (max age)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated getter.
    class Test {
      public constructor(public state: string) {}

      @cache({ maxAge: 1000 })
      public get prop(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated getter.
    const test: Test = new Test('anyTxt');

    // Var: getter result which should be cached.
    const cached: string = test.prop;

    // Exp: same as the cached value (not expired).
    expect(cached).toBe(test.prop);

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Mock: native date to expire the cache.
    const mockNative: jest.SpyInstance = jest
      // Manually mock date.
      .spyOn(global.Date, 'now')
      .mockReturnValue(Infinity);

    // Exp: different from the cached value (expired).
    expect(cached).not.toBe(test.prop);

    // Reset mock on the native date.
    mockNative.mockRestore();
  });

  // Case::
  test('should cache the result of the getter (dynamic key)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated getter.
    class Test {
      public static key: number = 0;
      public constructor(public state: string) {}

      @cache({ resolver: () => ++Test.key })
      public get prop(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated getter.
    const test: Test = new Test('anyTxt');

    // Var: getter result which should be cached.
    const cached: string = test.prop;

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: different as the resolver key is changed.
    expect(cached).not.toBe(test.prop);

    // Opr: reset the key to get other cached value.
    Test.key = 0;

    // Exp: same as the initially cached value.
    expect(cached).toBe(test.prop);
  });

  // Case::
  test('should cache the result of the getter (inherited)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated getter.
    class Parent {
      public constructor(public state: string) {}

      @cache
      public get prop(): string {
        return this.state;
      }
    }

    // Var: inherited class.
    class Child extends Parent {}

    // Var: instance with the inherited getter.
    const test: Child = new Child('anyTxt');

    // Var: getter result which should be cached.
    const cached: string = test.prop;

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(test.prop);
  });

  // Case::
  test('should cache the result of the method', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @cache
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Var: method result which should be cached.
    const cached: string = test.method();

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(test.method());
  });

  // Case::
  test('should cache the result of the method (static)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Test {
      public static state: string = 'anyTxt';

      @cache
      public static method(): string {
        return Test.state;
      }
    }

    // Var: method result which should be cached.
    const cached: string = Test.method();

    // Opr: assign the new value to the internal state.
    Test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(Test.method());
  });

  // Case::
  test('should cache the result of the method (factory)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @cache()
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Var: method result which should be cached.
    const cached: string = test.method();

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(test.method());
  });

  // Case::
  test('should cache the result of the method (max age)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @cache({ maxAge: 1000 })
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Var: method result which should be cached.
    const cached: string = test.method();

    // Exp: same as the cached value (not expired).
    expect(cached).toBe(test.method());

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Mock: native date to expire the cache.
    const mockNative: jest.SpyInstance = jest
      // Manually mock date.
      .spyOn(global.Date, 'now')
      .mockReturnValue(Infinity);

    // Exp: different from the cached value (expired).
    expect(cached).not.toBe(test.method());

    // Reset mock on the native date.
    mockNative.mockRestore();
  });

  // Case::
  test('should cache the result of the method (dynamic key)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @cache({ resolver: key => key })
      public method(_id: number): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Var: method result which should be cached.
    const cached: string = test.method(1);

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value (key is same).
    expect(cached).toBe(test.method(1));

    // Exp: different from the cached value (key is diff).
    expect(cached).not.toBe(test.method(2));
  });

  // Case::
  test('should cache the result of the method (decorated)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Mock: helper to check whether decorated property was originally the method.
    const isOriginallyMethod: jest.SpyInstance = jest
      .spyOn(await import('@decorize/core/original/isOriginallyMethod'), 'isOriginallyMethod')
      .mockReturnValue(true);

    // Var: class with decorated method.
    class Test {
      public constructor(public state: string) {}

      @cache
      public get method(): Function {
        return function(this: Test): string {
          return this.state;
        };
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Var: method result which should be cached.
    const cached: string = test.method();

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(test.method());

    // Exp: helper to check decorated property have been called.
    expect(isOriginallyMethod).toHaveBeenCalled();
  });

  // Case::
  test('should cache the result of the method (inherited)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Parent {
      public constructor(public state: string) {}

      @cache
      public method(): string {
        return this.state;
      }
    }

    // Var: inherited class.
    class Child extends Parent {}

    // Var: instance with the inherited method.
    const test: Child = new Child('anyTxt');

    // Var: method result which should be cached.
    const cached: string = test.method();

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(test.method());
  });

  // Case::
  test('should clear the cache based on the specified expire config', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @cache({ expire: (entry: any, context: Test): boolean => context.state === 'clearTxt' })
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Var: method result which should be cached.
    const cached: string = test.method();

    // Exp: same as the cached value (not expired).
    expect(cached).toBe(test.method());

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value (not expired).
    expect(cached).toBe(test.method());

    // Opr: assign the new value to the internal state.
    test.state = 'clearTxt';

    // Exp: cache is manually expired so the new value is cached.
    expect(test.state).toBe(test.method());
  });

  // Case::
  test('should ignore caching when context is undefined', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Test {
      public constructor(public state: string) {}

      @cache
      public method(): string {
        return this?.state;
      }
    }

    // Var: instance with the decorated method.
    const test: Test = new Test('anyTxt');

    // Var: reference to the decorated method.
    const method: any = test.method;

    // Exp: executed without context and caching.
    expect(method()).toBe(undefined);

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: undefined as result is not cached without context.
    expect(test.method()).not.toBe(undefined);
  });

  // Case::
  test('should ignore caching when executed getter from the prototype', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated getter.
    class Test {
      public static state: string = 'anyTxt';

      @cache
      public get prop(): string {
        return Test.state;
      }
    }

    // Var: getter result which should not be cached.
    const result: string = Test.prototype.prop;

    // Opr: assign the new value to the internal state.
    Test.state = 'changedTxt';

    // Exp: different as caching is not done.
    expect(result).not.toBe(Test.prototype.prop);
  });

  // Case::
  test('should ignore caching when accessing method from the prototype', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Test {
      public static state: string = 'anyTxt';

      @cache
      public method(): string {
        return Test.state;
      }
    }

    // Var: method result which should not be cached.
    const result: string = Test.prototype.method();

    // Opr: assign the new value to the internal state.
    Test.state = 'changedTxt';

    // Exp: different as caching is not done.
    expect(result).not.toBe(Test.prototype.method());
  });

  // Case::
  test('should ignore caching when accessing method from the prototype (super)', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Var: class with the decorated method.
    class Parent {
      public constructor(public state: string) {}

      @cache
      public method(): string {
        return this.state;
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      public method(): string {
        return super.method();
      }
    }

    // Var: instance with the decorated method.
    const test: Child = new Child('anyTxt');

    // Var: method result which should not be cached.
    const result: string = test.method();

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: different as caching is not done.
    expect(result).not.toBe(test.method());
  });

  // Case::
  test('should support multiple decorations and conventions', async (): Promise<void> => {
    // Testing target.
    const { cache, Cache } = await import('~legacy/cache');

    // Var: class with the multiple decorations.
    class Test {
      public constructor(public state: string) {}

      @cache
      @Cache()
      public method(): string {
        return this.state;
      }
    }

    // Var: instance with the multiple decorations.
    const test: Test = new Test('anyTxt');

    // Var: method result which should be cached.
    const cached: string = test.method();

    // Opr: assign the new value to the internal state.
    test.state = 'changedTxt';

    // Exp: same as the cached value even after state is changed.
    expect(cached).toBe(test.method());
  });

  // Case::
  test('should throw error in case used incorrectly', async (): Promise<void> => {
    // Testing target.
    const { cache } = await import('~legacy/cache');

    // Exp: throw error as tried to decorate the property.
    expect((): any => (<any>cache)({}, 'test')).toThrow(Error);

    // Exp: throw error as tried to decorate the property.
    expect((): any => cache({}, 'test', { value: 1 })).toThrow(Error);

    // Exp: throw error as tried to decorate the invalid getter.
    expect((): any => cache({}, 'test', { get: <any>1 })).toThrow(Error);

    // Fake the helper to check whether decorated property was originally the method.
    jest.spyOn(await import('@decorize/core/original/isOriginallyMethod'), 'isOriginallyMethod').mockReturnValue(true);

    // Exp: throw error as tried to decorate the invalid decorated method.
    expect((): any => cache({}, 'test', { get: (): null => null }).get()).toThrow(Error);
  });
});
