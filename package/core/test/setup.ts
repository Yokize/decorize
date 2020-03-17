// prettier-ignore
beforeAll(async (): Promise<void> => {
  await import('reflect-metadata');

  // Convert to getters for mocking Reflect.
  for (const name of Reflect.ownKeys(Reflect)) {
    // Original Reflect function.
    const original: Function = Reflect.get(Reflect, name);

    // Define as configurable getter.
    Object.defineProperty(Reflect, name, {
      enumerable: true,
      configurable: true,
      get: (): any => original
    });
  }
});
