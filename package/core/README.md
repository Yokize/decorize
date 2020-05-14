[![monorepo](https://github.com/Yokize/decorize/workflows/Monorepo/badge.svg?branch=master)](https://github.com/Yokize/decorize/actions)
[![quality](https://badgen.net/codacy/grade/8f0566a3ddca4105aad6ee0585ff5379?icon=codacy&label=quality)](https://www.codacy.com/gh/Yokize/decorize?utm_source=github.com&utm_medium=referral&utm_content=Yokize/decorize&utm_campaign=Badge_Grade)
[![coverage](https://badgen.net/codacy/coverage/8f0566a3ddca4105aad6ee0585ff5379?icon=codacy)](https://www.codacy.com/gh/Yokize/decorize?utm_source=github.com&utm_medium=referral&utm_content=Yokize/decorize&utm_campaign=Badge_Coverage)
[![chat](https://badgen.net/badge/icon/chat?icon=gitter&label)](https://gitter.im/decorize/community)
![typescript](https://badgen.net/badge/icon/3.9.2?icon=typescript&label)
![min+gzip](https://badgen.net/bundlephobia/minzip/@decorize/core?label=min%2Bgzip)
![licence](https://badgen.net/github/license/Yokize/decorize?label)

The library contains utilities for creating decorators and registering them during their usage.

## Install

```shell script
npm install @decorize/core --save
```

## Usage

Create `class` decorator:

```typescript
import { classLegacyDecorator } from '@decorize/core';

classLegacyDecorator('<decoratorID>', (target: object) => '<logic here>');
```

Create `accessor` decorator:

```typescript
import { accessorLegacyDecorator } from '@decorize/core';

accessorLegacyDecorator('<decoratorID>', (target: object, property: PropertyKey, description: PropertyDescriptor) => {
  '<logic here>';
});
```

Create `method` decorator:

```typescript
import { methodLegacyDecorator } from '@decorize/core';

methodLegacyDecorator('<decoratorID>', (target: object, property: PropertyKey, description: PropertyDescriptor) => {
  '<logic here>';
});
```

Create `parameter` decorator:

```typescript
import { parameterLegacyDecorator } from '@decorize/core';

parameterLegacyDecorator('<decoratorID>', (target: object, method: PropertyKey, paramIdx: number) => {
  '<logic here>';
});
```

Create `property` decorator:

```typescript
import { propertyLegacyDecorator } from '@decorize/core';

propertyLegacyDecorator('<decoratorID>', (target: object, property: PropertyKey) => {
  '<logic here>';
});
```

## Metadata

The library provides a wrapper around `reflect-metadata` with backup implementation for the assignment of the decorator's metadata to the class.

## Future

The package includes an implementation of the decorator using the [TypeScript syntax](https://www.typescriptlang.org/docs/handbook/decorators.html) and will be extended in future with the new proposal from [TC39](https://github.com/tc39/proposal-decorators).

We are actively supporting the package, so please contact us at [GitHub](https://github.com/Yokize/decorize) or [Gitter](https://gitter.im/decorize/community) if you have any suggestions or questions.
