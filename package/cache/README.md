[![chat](https://img.shields.io/gitter/room/decorize/community?style=flat-square&color=informational&logo=gitter&label)](https://gitter.im/decorize/community)
[![build](https://img.shields.io/github/workflow/status/Yokize/decorize/CI/master?style=flat-square&logo=github)](https://github.com/Yokize/decorize/actions)
[![quality](https://img.shields.io/codefactor/grade/github/Yokize/decorize?logo=codefactor&logoColor=white&style=flat-square&label=quality)](https://www.codefactor.io/repository/github/Yokize/decorize)
[![coverage](https://img.shields.io/codacy/coverage/8f0566a3ddca4105aad6ee0585ff5379?style=flat-square&logo=codacy&label=coverage)](https://www.codacy.com/gh/Yokize/decorize?utm_source=github.com&utm_medium=referral&utm_content=Yokize/decorize&utm_campaign=Badge_Coverage)
[![dependencies](https://img.shields.io/librariesio/release/npm/@decorize/cache?style=flat-square&label=dependencies)](https://www.npmjs.com/package/@decorize/cache)
![min+gzip](https://img.shields.io/bundlephobia/minzip/@decorize/cache?style=flat-square&label=min%2Bzip)
![typescript](https://img.shields.io/static/v1?style=flat-square&logo=typescript&color=informational&label&message=3.9)

Decorator for caching the result of a particular method or getter.

## Install

```shell script
npm install @decorize/cache --save
```

## Usage

Decorate the method:

```typescript
import { cache, cacheClear } from '@decorize/cache';

class Example {
  @cache
  public methodOne(): number {
    return Date.now();
  }

  @cacheClear
  public methodTwo(): any {
    return;
  }
}
```

Decorate the getter:

```typescript
import { cache, cacheClear } from '@decorize/cache';

class Example {
  @cache
  @cacheClear({ setter: true })
  public get property(): number {
    return Date.now();
  }

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
  public get propertyOne(): number {
    return Date.now(); // Result cached with maxAge.
  }

  @cacheClear({ setter: true, before: true })
  public set propertyTwo(val: any) {
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

## Typing

```typescript
export interface CacheConfig {
  maxAge?: number;
  resolver?: Resolver;
  expire?: (entry: CacheEntry, context: any) => boolean | void;
}

export declare function cache(configuration?: CacheConfig): MethodDecorator;
export declare function cache(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor
): PropertyDescriptor;
```

```typescript
export interface ClearConfig {
  before?: boolean;
  after?: boolean;
  getter?: boolean;
  setter?: boolean;
}

export declare function cacheClear(configuration?: ClearConfig): MethodDecorator;
export declare function cacheClear(
  target: object,
  property: PropertyKey,
  descriptor: PropertyDescriptor
): PropertyDescriptor;
```

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

- Allow to change the `Global` configuration and helpers.\
  The package exports `Global`, which can be used to change the default resolver and helpers to manage the cache.

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

We are actively supporting the package, so please contact us at [GitHub](https://github.com/Yokize/decorize) or [Gitter](https://gitter.im/decorize/community) if you have any suggestions or questions.
