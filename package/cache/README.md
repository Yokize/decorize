[![ts38](https://badgen.net/badge/icon/3.8.3?icon=typescript&label)](https://www.typescriptlang.org/)
[![MIT](https://badgen.net/npm/license/@decorize/bind)](https://github.com/Yokize/decorize/blob/master/LICENSE)

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
    return; // Result
  }

  @cacheClear
  public set property(val: any) {}
}
```

## Feature

- Support different naming conventions.\
  Available in lowercase `@cache[Clear]` or capital letter `@cache[Clear]`

- Support different coding conventions.\
  Usable and applicable directly to the declaration `@cache[Clear]` or as the decorator's factory `@cache[Clear]()`

- Support method and accessor decoration.\
  Result of particular method or getter can be decorated with automated caching on the fly.

- Smart and compatible (es5 vs es2015+) logic.\
  Ensures correct use of the decorator and verifies whether the method can be decorated by checking its type and attributes of the descriptor (configurable). Method derived from the prototype or by using the `super` will not be bound.

- Advanced decoration and synergy with other decorators.\
  Logic respects the original method and other decorators, so all the attributes of the descriptor not related to this decorator will be kept or adapted.

- Extensive source documentation and testing coverage.\
  Source code is fully documented and tested (100%) for each line.

## Future

The package is still under active development, if you have suggestions, please contact us at GitHub.
