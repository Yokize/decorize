// Get the prototype of target to support feature to retrieve
// metadata by prototype chain.
describe('getProtoOf', (): void => {
  // Case::
  test('should get super of class', async (): Promise<void> => {
    // Testing target.
    const { getProtoOf } = await import('~reflect/fallback/proto');

    // Var: parent class.
    class Parent {}

    // Var: child class.
    class Child extends Parent {}

    // Exp: parent class as proto.
    expect(getProtoOf(Child)).toBe(Parent);
  });

  // Case::
  test('should get super constructor in case of guessing class heritage', async (): Promise<void> => {
    // Testing target.
    const { getProtoOf } = await import('~reflect/fallback/proto');

    // Var: parent class.
    function Parent(): void {}

    // Var: child class.
    function Child(): void {}

    // Opr: assign prototype of class to parent.
    Child.prototype = Object.create(Parent.prototype);

    // Opr: assign constructor.
    Child.prototype.constructor = Parent;

    // Exp: parent class as proto.
    expect(getProtoOf(Child)).toBe(Parent);
  });

  // Case::
  test('should get Function.prototype in case class heritage not clear', async (): Promise<void> => {
    // Testing target.
    const { getProtoOf } = await import('~reflect/fallback/proto');

    // Var: class without clear heritage.
    function Target(): void {}

    // Opr: assign prototype of class as object which prevent
    // analyze of further heritage.
    Target.prototype = {};

    // Exp: Function.prototype as heritage not clear.
    expect(getProtoOf(Target)).toBe(Function.prototype);
  });

  // Case::
  test('should get Function.prototype in case class self reference', async (): Promise<void> => {
    // Testing target.
    const { getProtoOf } = await import('~reflect/fallback/proto');

    // Var: self reference class.
    function Target(): void {}

    // Opr: assign prototype to self reference.
    Target.prototype = Object.create(Target.prototype);

    // Exp: Function.prototype as class is reference itself.
    expect(getProtoOf(Target)).toBe(Function.prototype);
  });
});
