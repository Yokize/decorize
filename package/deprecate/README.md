[![chat](https://img.shields.io/gitter/room/decorize/community?style=flat-square&color=informational&logo=gitter&label)](https://gitter.im/decorize/community)
[![build](https://img.shields.io/github/workflow/status/Yokize/decorize/CI/master?style=flat-square&logo=github)](https://github.com/Yokize/decorize/actions)
[![quality](https://img.shields.io/codefactor/grade/github/Yokize/decorize?logo=codefactor&logoColor=white&style=flat-square&label=quality)](https://www.codefactor.io/repository/github/Yokize/decorize)
[![coverage](https://img.shields.io/codacy/coverage/8f0566a3ddca4105aad6ee0585ff5379?style=flat-square&logo=codacy&label=coverage)](https://www.codacy.com/gh/Yokize/decorize?utm_source=github.com&utm_medium=referral&utm_content=Yokize/decorize&utm_campaign=Badge_Coverage)
[![dependencies](https://img.shields.io/librariesio/release/npm/@decorize/deprecate?style=flat-square&label=dependencies)](https://www.npmjs.com/package/@decorize/deprecate)
![min+gzip](https://img.shields.io/bundlephobia/minzip/@decorize/deprecate?style=flat-square&label=min%2Bzip)
![typescript](https://img.shields.io/static/v1?style=flat-square&logo=typescript&color=informational&label&message=3.9)

Decorator to deprecate the class, method, accessor and property.

## Install

```shell script
npm install @decorize/deprecate --save
```

## Usage

Decorate with the message:

```typescript
import { deprecate } from '@decorize/deprecate';

class Example {
  @deprecate('Here can be string or string[]')
  public property;
}

new Example().property = 'anyText'; // Output deprecation message.
```

Decorate the property:

```typescript
import { deprecate } from '@decorize/deprecate';

class Example {
  @deprecate
  public property;
}

new Example().property = 'anyText'; // Output deprecation message.
```

Decorate the method:

```typescript
import { deprecate } from '@decorize/deprecate';

class Example {
  @deprecate
  public method(): boolean {
    return this instanceof Example;
  }
}

new Example().method.call(null); // Output deprecation message.
```

Decorate the accessor:

```typescript
import { deprecate } from '@decorize/deprecate';

class Example {
  @deprecate
  public get property(): void {
    return;
  }
}

new Example().property; // Output deprecation message.
```

Decorate the class:

```typescript
import { deprecate } from '@decorize/deprecate';

@deprecate
class Example {}

new Example(); // Output deprecation message.
```

Decorate the class with members:

```typescript
import { deprecate } from '@decorize/deprecate';

@deprecate
class Example {
  public method(): boolean {
    return this instanceof Example;
  }
}

new Example().method.call(null); // Output deprecation message.
```

## Typing

```typescript
export interface DeprecateConfig {
  setter?: boolean;
  getter?: boolean;
  message?: string | string[];
}

export declare function deprecate<T extends Function>(target: T): T;
export declare function deprecate(message: string | string[]): any;
export declare function deprecate(configuration: DeprecateConfig): any;
export declare function deprecate(target: object, property: PropertyKey): void;
export declare function deprecate(target: object, property: PropertyKey, descriptor: PropertyDescriptor): any;
export declare function deprecate(...args: any[]): any;
```

## Feature

- Support different naming conventions.\
  Available in lowercase `@deprecate` or capital letter `@Deprecate`.

- Support different coding conventions.\
  Applicable directly to the declaration `@deprecate` or as the decorator's factory `@deprecate()`.

- Allow to configure the deprecation output.\
  Configure output message as plain string or array of strings.
  The decorator cannot be applied to both the getter and setter of the same property, so its possible to specify explicitly the `getter` or `setter`.

- Allow to change the `Global` configuration and helpers.\
  The package exports `Global`, which can be used to change the logic of creating and outputting a message.

- Polyfill free, TypeScript and ES5 compatibility.\
  There is no need for any polyfill and can be fully used with TypeScript (`d.ts`) and ES5.

- Intelligent and backward compatible (ES5 vs ES2015+).\
  Ensures correct use of the decorator and verifies whether the property can be decorated by checking the attributes of the descriptor.

- Advanced decoration and synergy with other decorators.\
  Logic respects the original method and other decorators, so all the attributes of the descriptor not related to this decorator will be kept or adapted.

- Extensive source documentation and testing coverage.\
  Source code is fully documented and tested for each line.

## Future

The package includes an implementation of the decorator using the [TypeScript syntax](https://www.typescriptlang.org/docs/handbook/decorators.html) and will be extended in future with the new proposal from [TC39](https://github.com/tc39/proposal-decorators).

We are actively supporting the package, so please contact us at [GitHub](https://github.com/Yokize/decorize) or [Gitter](https://gitter.im/decorize/community) if you have any suggestions or questions.
