// Testing built-in and fallback Reflect.
describe.each(['Built-in', 'Fallback'])('%s Reflect', (type: string): void => {
  // Setup::
  beforeEach((): void => {
    // Do not need mocking.
    if (type === 'Built-in') return;

    // Mocking all Reflect functions.
    for (const name of Object.keys(Reflect))
      jest
        // Manually mock built-in function.
        .spyOn(<any>Reflect, name, 'get')
        .mockReturnValue(undefined);
  });

  // Case::
  // prettier-ignore
  test.each(['object', 'property'])('should support %s metadata lifecycle', async (target: string): Promise<void> => {
    // Testing target.
    const Reflect: any = await import('~index');

    // Var: parent class.
    class Parent {}

    // Var: child class.
    class Child extends Parent {}

    // Var: property based args.
    const propArgs: string[] = target === 'property' ? ['test'] : [];

    // Exp: define metadata associated with class or property.
    expect(Reflect.defineMetadata('key', 'metadata', Parent, ...propArgs)).toBe(undefined);

    // Exp: define additional metadata associated with class or property.
    expect(Reflect.defineMetadata('key0', 'metadata', Parent, ...propArgs)).toBe(undefined);

    // Exp: true as has own metadata associated with parent class or property.
    expect(Reflect.hasOwnMetadata('key', Parent, ...propArgs)).toBe(true);

    // Exp: false as own metadata associated with child class or property not found.
    expect(Reflect.hasOwnMetadata('key', Child, ...propArgs)).toBe(false);

    // Exp: true as has own metadata associated with parent class or property.
    expect(Reflect.hasMetadata('key', Parent, ...propArgs)).toBe(true);

    // Exp: true as has inherited metadata associated with child class or property.
    expect(Reflect.hasMetadata('key', Child, ...propArgs)).toBe(true);

    // Exp: own metadata associated with parent class or property.
    expect(Reflect.getOwnMetadata('key', Parent, ...propArgs)).toBe('metadata');

    // Exp: undefined as own metadata associated with child class or property not found.
    expect(Reflect.getOwnMetadata('key', Child, ...propArgs)).toBe(undefined);

    // Exp: own metadata associated with parent class or property.
    expect(Reflect.getMetadata('key', Parent, ...propArgs)).toBe('metadata');

    // Exp: inherited metadata associated with child class or property.
    expect(Reflect.getMetadata('key', Child, ...propArgs)).toBe('metadata');

    // Exp: false as own metadata associated with child class or property not found.
    expect(Reflect.deleteMetadata('key', Child, ...propArgs)).toBe(false);

    // Exp: true as own metadata associated with parent class or property is removed.
    expect(Reflect.deleteMetadata('key', Parent, ...propArgs)).toBe(true);

    // Exp: false as inherited metadata associated with child class or property is removed.
    expect(Reflect.hasMetadata('key', Child, ...propArgs)).toBe(false);

    // Exp: true as additional inherited metadata associated with child class or property is defined.
    expect(Reflect.hasMetadata('key0', Child, ...propArgs)).toBe(true);
  });
});
