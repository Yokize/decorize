[![chat](https://badgen.net/badge/icon/chat?icon=gitter&label)](https://gitter.im/decorize/community)
![package](https://badgen.net/david/dep/Yokize/decorize/package/cache?icon=libraries&label)
![typescript](https://badgen.net/badge/icon/3.9.2?icon=typescript&label)
![min+gzip](https://badgen.net/bundlephobia/minzip/@decorize/cache?label=min%2Bgzip)
![licence](https://badgen.net/github/license/Yokize/decorize?label)

Decorator to cache the result of the method or getter.

## Install

```shell script
npm install @decorize/cache --save
```

## Usage

Method decorator:

```typescript
import { cache, cacheClear } from '@decorize/cache';

class Example {
  @cache
  public method(): any {
    return; // Result
  }

  @cacheClear
  public clearAll(): any {
    return;
  }
}
```

Getter decorator:

```typescript
import { cache, cacheClear } from '@decorize/cache';

class Example {
  @cache
  public get property(): any {
    return; // Result.
  }

  @cacheClear
  public set property(val: any) {
    // Cached result will be cleared after execution.
  }
}
```

The advanced config with `maxAge`:

```typescript
import { cache, cacheClear } from '@decorize/cache';

class Example {
  @cache({ maxAge: 1000 })
  public get property(): any {
    return; // Result cached with maxAge.
  }

  @cacheClear({ setter: true, before: true })
  public set property(val: any) {
    // In case maxAge exceeded clear the result before setter executed.
  }
}
```

The advanced config with `resolver` and `expire`:

```typescript
import { cache } from '@decorize/cache';

class Example {
  @cache({ resolver: (id) => id, expire: ({ value }) => value === 1 })
  public method(id: string): any {
    return id;
  }
}
```

In the example, the result is cached for each individual identifier, except for the cached entry where result equals 1.

## Feature

- Support different naming conventions.\
  Available in lowercase `@cache[Clear]` or capital letter `@cache[Clear]`.

- Support different coding conventions.\
  Usable and applicable directly to the declaration `@cache[Clear]` or as the decorator's factory `@cache[Clear]()`.

- Support method and accessor decoration.\
  Result of particular method or getter can be decorated with automated caching on the fly.

- Allow to configure the caching of results.\
  Configure the caching with the `maxAge` (ms) of the cached result, argument-dependent key `resolver` and `expire` manual logic.

- Allow to configure the clearing of results.\
  Configure the clearing with `before` and `after` (default) options which defines whether cleaning should be done before or after the method or accessor execution.

  The decorator cannot be applied to both the getter and setter of the same property, so its possible to specify explicitly the `getter` or `setter`.

- Polyfill free, ES5 and TypeScript compatibility.\
  There is no need for any polyfill and can be fully used by ES5 or TypeScript (`d.ts`).

- Intelligent and backward compatible (ES5 vs ES2015+).\
  Ensures correct use of the decorator and verifies whether the method can be decorated by checking its type and attributes of the descriptor (configurable). Method derived from the prototype or by using the `super` will not be bound.

- Advanced decoration and synergy with other decorators.\
  Logic respects the original method and other decorators, so all the attributes of the descriptor not related to this decorator will be kept or adapted.

- Extensive source documentation and testing coverage.\
  Source code is fully documented and tested for each line.

## Future

The package includes an implementation of the decorator using the [TypeScript syntax](https://www.typescriptlang.org/docs/handbook/decorators.html) and will be extended in future with the new proposal from [TC39](https://github.com/tc39/proposal-decorators).

We are actively supporting the package, so please contact us at [GitHub](https://github.com/Yokize/decorize) if you have any suggestions or questions.
