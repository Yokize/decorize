// Create base registry.
describe('createRegistry', (): void => {
  // Case::
  test('should create base registry', async (): Promise<void> => {
    // Testing target.
    const { createRegistry }: any = await import('~registry/createRegistry');

    // Exp: base registry is created.
    expect(createRegistry()).toEqual({ decorator: [] });
  });
});
