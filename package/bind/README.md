[![chat](https://badgen.net/badge/icon/chat?icon=gitter&label)](https://gitter.im/decorize/community)
![package](https://badgen.net/david/dep/Yokize/decorize/package/bind?icon=libraries&label)
![typescript](https://badgen.net/badge/icon/3.9.2?icon=typescript&label)
![min+gzip](https://badgen.net/bundlephobia/minzip/@decorize/bind?label=min%2Bgzip)
![licence](https://badgen.net/github/license/Yokize/decorize?label)

Decorator to bind the method or all methods of the class to the context used to access it.

## Install

```shell script
npm install @decorize/bind --save
```

## Usage

Method decorator:

```typescript
import { bind } from '@decorize/bind';

class Example {
  @bind
  public method(): boolean {
    return this instanceof Example;
  }
}

new Example().method.call(null); // True
```

Class decorator:

```typescript
import { bind } from '@decorize/bind';

@bind
class Example {
  public method(): boolean {
    return this instanceof Example;
  }
}

new Example().method.call(null); // True
```

## Feature

- Support different naming conventions.\
  Available in lowercase `@bind` or capital letter `@Bind`.

- Support different coding conventions.\
  Applicable directly to the declaration `@bind` or as the decorator's factory `@bind()`.

- Support method and class decoration.\
  Particular method or class (methods on the constructor's `prototype`) can be decorated with automated binding to the context on the fly with subsequent caching.

- Cache of own and inherited bound methods.\
  Bound methods are added to context-dependent cache to avoid unnecessary bindings and increase performance.

- Polyfill free, TypeScript and ES5 compatibility.\
  There is no need for any polyfill and can be fully used with TypeScript (`d.ts`) and ES5.

- Intelligent and backward compatible (ES5 vs ES2015+).\
  Ensures correct use of the decorator and verifies whether the method can be decorated by checking the attributes of the descriptor. Methods derived from the prototype or by using the `super` will not be bound.

- Advanced decoration and synergy with other decorators.\
  Logic respects the original method and other decorators, so all the attributes of the descriptor not related to this decorator will be kept or adapted.

- Extensive source documentation and testing coverage.\
  Source code is fully documented and tested for each line.

## Future

The package includes an implementation of the decorator using the [TypeScript syntax](https://www.typescriptlang.org/docs/handbook/decorators.html) and will be extended in future with the new proposal from [TC39](https://github.com/tc39/proposal-decorators).

We are actively supporting the package, so please contact us at [GitHub](https://github.com/Yokize/decorize) or [Gitter](https://gitter.im/decorize/community) if you have any suggestions or questions.
