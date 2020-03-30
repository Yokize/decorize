[![ts38](https://badgen.net/badge/icon/3.8.3?icon=typescript&label)](https://www.typescriptlang.org/)
[![MIT](https://badgen.net/npm/license/@decorize/bind)](https://github.com/Yokize/decorize/blob/master/LICENSE)

Decorator to bind the method or all methods of the class to the context used to access it.

## Install

```shell script
npm install @decorize/bind --save
```

## Usage

Class decorator:

```typescript
import { bind } from '@decorize/bind';

@bind
class Example {
  public method(): boolean {
    return this instanceof Example;
  }
}

new Example().method(); // True
```

Method decorator:

```typescript
import { bind } from '@decorize/bind';

class Example {
  @bind
  public method(): boolean {
    return this instanceof Example;
  }
}

new Example().method(); // True
```

## Feature

- Support different naming conventions.\
  Available in lowercase `@bind` or capital letter `@Bind`

- Support different coding conventions.\
  Usable and applicable directly to the declaration `@bind` or as the decorator's factory `@bind()`

- Support class and method decoration.\
  Class (methods on the constructor's `prototype`) or a particular method can be decorated with automated binding to the context on the fly with subsequent caching.

- Cache of own and inherited bound methods.\
  Bound methods which belongs directly to the decorated class or inherited from the parent are added to context-dependent cache to avoid unnecessary bindings and increase performance.

- Smart and compatible (es5 vs es2015+) logic.\
  Ensures correct use of the decorator and verifies whether the method can be decorated by checking its type and attributes of the descriptor (configurable). Method derived from the prototype or by using the `super` will not be bound.

- Advanced decoration and synergy with other decorators.\
  Logic respects the original method and other decorators, so all the attributes of the descriptor not related to this decorator will be kept or adapted.

- Extensive source documentation and testing coverage.\
  Source code is fully documented and tested (100%) for each line.

## Future

Package still in active development.
