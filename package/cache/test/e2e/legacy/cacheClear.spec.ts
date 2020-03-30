// Clear the cached results of the method or getter.
describe('@cacheClear', (): void => {
  // Case::
  test('should clear the cache before executing the getter', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated getter.
    class Test {
      @cacheClear({ before: true })
      public get prop(): any {
        // Exp: clear have been called as explicitly defined <before>.
        return expect(globalClear).toHaveBeenCalled();
      }
    }

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();

    // Opr: execute the getter and clear the cache.
    new Test().prop;
  });

  // Case::
  test('should clear the cache after executing the getter (static)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated getter.
    class Test {
      @cacheClear
      public static get prop(): any {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        return expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: execute the getter and clear the cache.
    Test.prop;

    // Exp: clear have been called after getter is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the getter (factory)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated getter.
    class Test {
      @cacheClear()
      public get prop(): any {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        return expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: execute the getter and clear the cache.
    new Test().prop;

    // Exp: clear have been called after getter is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the getter (explicitly)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated accessors.
    class Test {
      public get prop(): any {
        return null;
      }

      @cacheClear({ getter: true })
      public set prop(_: any) {}
    }

    // Opr: execute the setter.
    new Test().prop = 'anyTxt';

    // Exp: clear not have been called.
    expect(globalClear).not.toHaveBeenCalled();

    // Opr: execute the getter and clear the cache.
    new Test().prop;

    // Exp: clear have been called after getter is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the getter (inherited)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated getter.
    class Parent {
      @cacheClear
      public get prop(): any {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        return expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {}

    // Opr: execute the getter and clear the cache.
    new Child().prop;

    // Exp: clear have been called after getter is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache before executing the setter', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated setter.
    class Test {
      @cacheClear({ before: true })
      public set prop(_: any) {
        // Exp: clear have been called as explicitly defined <before>.
        expect(globalClear).toHaveBeenCalled();
      }
    }

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();

    // Opr: execute the setter and clear the cache.
    new Test().prop = 'anyTxt';
  });

  // Case::
  test('should clear the cache after executing the setter (static)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated setter.
    class Test {
      @cacheClear()
      public static set prop(_: any) {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: execute the setter and clear the cache.
    Test.prop = 'anyTxt';

    // Exp: clear have been called after setter is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the setter (factory)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated setter.
    class Test {
      @cacheClear()
      public set prop(_: any) {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: execute the setter and clear the cache.
    new Test().prop = 'anyTxt';

    // Exp: clear have been called after setter is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the setter (explicitly)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated accessors.
    class Test {
      @cacheClear({ setter: true })
      public get prop(): any {
        return null;
      }

      public set prop(_: any) {}
    }

    // Opr: execute the getter.
    new Test().prop;

    // Exp: clear not have been called.
    expect(globalClear).not.toHaveBeenCalled();

    // Opr: execute the setter and clear the cache.
    new Test().prop = 'anyTxt';

    // Exp: clear have been called after setter is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the setter (inherited)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated setter.
    class Parent {
      @cacheClear
      public set prop(_: any) {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {}

    // Opr: execute the setter and clear the cache.
    new Child().prop = 'anyTxt';

    // Exp: clear have been called after setter is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache before executing the method', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Test {
      @cacheClear({ before: true })
      public method(): void {
        // Exp: clear have been called as explicitly defined <before>.
        expect(globalClear).toHaveBeenCalled();
      }
    }

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();

    // Opr: execute the method and clear the cache.
    new Test().method();
  });

  // Case::
  test('should clear the cache after executing the method (static)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Test {
      @cacheClear()
      public static method(): void {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: execute the method and clear the cache.
    Test.method();

    // Exp: clear have been called after method is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the method (factory)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Test {
      @cacheClear()
      public method(): void {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: execute the method and clear the cache.
    new Test().method();

    // Exp: clear have been called after method is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the method (explicitly)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Test {
      @cacheClear({ after: true })
      public method(): void {
        // Exp: clear have been not called as explicitly defined <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: execute the method and clear the cache.
    new Test().method();

    // Exp: clear have been called after method is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should clear the cache after executing the method (inherited)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Parent {
      @cacheClear()
      public method(): void {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {}

    // Opr: execute the method and clear the cache.
    new Child().method();

    // Exp: clear have been called after method is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should ignore clearing when context is undefined', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Test {
      @cacheClear({ before: true })
      public method(): void {
        // Exp: clear have been not called as executed with undefined context.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: try to clear the cache.
    new Test().method.apply(null);
  });

  // Case::
  test('should ignore clearing when executed getter via prototype', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated getter.
    class Test {
      @cacheClear
      public get prop(): any {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        return expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: try to clear the cache.
    Test.prototype.prop;

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();
  });

  // Case::
  test('should ignore clearing when executed getter via super', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated getter.
    class Parent {
      @cacheClear
      public get prop(): any {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        return expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      public get prop(): string {
        return super.prop;
      }
    }

    // Opr: try to clear the cache.
    new Child().prop;

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();
  });

  // Case::
  test('should ignore clearing when executed getter via super (decorated)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated getter.
    class Parent {
      @cacheClear
      public get prop(): any {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        return expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      @cacheClear
      public get prop(): string {
        return super.prop;
      }
    }

    // Opr: try to clear the cache.
    new Child().prop;

    // Exp: clear have been called only once.
    expect(globalClear).toHaveBeenCalledTimes(1);
  });

  // Case::
  test('should ignore clearing when executed setter via prototype', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated setter.
    class Test {
      @cacheClear
      public set prop(_: any) {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: try to clear the cache.
    Test.prototype.prop = 'anyTxt';

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();
  });

  // Case::
  test('should ignore clearing when executed setter via super', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated setter.
    class Parent {
      @cacheClear
      public set prop(_: any) {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      public set prop(_: any) {
        super.prop = _;
      }
    }

    // Opr: try to clear the cache.
    new Child().prop = 'anyTxt';

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();
  });

  // Case::
  test('should ignore clearing when executed setter via super (decorated)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated setter.
    class Parent {
      @cacheClear
      public set prop(_: any) {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      @cacheClear
      public set prop(_: any) {
        super.prop = _;
      }
    }

    // Opr: try to clear the cache.
    new Child().prop = 'anyTxt';

    // Exp: clear have been called only once.
    expect(globalClear).toHaveBeenCalledTimes(1);
  });

  // Case::
  test('should ignore clearing when accessing method via prototype', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Test {
      @cacheClear
      public method(): void {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        return expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: try to clear the cache.
    Test.prototype.method();

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();
  });

  // Case::
  test('should ignore clearing when accessing method via super', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Parent {
      @cacheClear
      public method(): void {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        return expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      public method(): void {
        super.method();
      }
    }

    // Opr: try to clear the cache.
    new Child().method();

    // Exp: clear have been not called.
    expect(globalClear).not.toHaveBeenCalled();
  });

  // Case::
  test('should ignore clearing when accessing method via super (decorated)', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the decorated method.
    class Parent {
      @cacheClear
      public method(): void {
        // Exp: clear have been not called.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Var: inherited class.
    class Child extends Parent {
      @cacheClear
      public method(): void {
        super.method();
      }
    }

    // Opr: try to clear the cache.
    new Child().method();

    // Exp: clear have been called only once.
    expect(globalClear).toHaveBeenCalledTimes(1);
  });

  // Case::
  test('should support multiple decorations and conventions', async (): Promise<void> => {
    // Testing target.
    const { cacheClear, CacheClear } = await import('~legacy/cacheClear');

    // Mock: global clear.
    const globalClear: jest.SpyInstance = jest
      // Manually mock global cache.
      .spyOn((await import('~global')).Global, 'clear');

    // Var: class with the multiple decorations.
    class Test {
      @cacheClear
      @CacheClear()
      public method(): void {
        // Exp: clear have been not called as implicitly defaulted to <after>.
        expect(globalClear).not.toHaveBeenCalled();
      }
    }

    // Opr: execute the method and clear the cache.
    new Test().method();

    // Exp: clear have been called after method is executed.
    expect(globalClear).toHaveBeenCalled();
  });

  // Case::
  test('should throw error in case used incorrectly', async (): Promise<void> => {
    // Testing target.
    const { cacheClear } = await import('~legacy/cacheClear');

    // Exp: throw error as tried to decorate the property.
    expect((): any => (<any>cacheClear)({}, 'test')).toThrow(Error);

    // Exp: throw error as tried to decorate the property.
    expect((): any => cacheClear({}, 'test', <any>{ value: 1 }).get()).toThrow(Error);

    // Exp: throw error as tried to decorate the invalid getter.
    expect((): any => cacheClear({}, 'test', <any>{ get: 1 }).get()).toThrow(Error);

    // Fake the helper to check whether property was originally the method.
    jest.spyOn(await import('@decorize/core/original/isOriginallyMethod'), 'isOriginallyMethod').mockReturnValue(true);

    // Exp: throw error as tried to decorate the invalid method.
    expect((): any => cacheClear({}, 'test', { get: (): null => null }).get()).toThrow(Error);
  });
});
