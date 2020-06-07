[![chat](https://img.shields.io/gitter/room/decorize/community?style=flat-square&color=informational&logo=gitter&label)](https://gitter.im/decorize/community)
[![build](https://img.shields.io/github/workflow/status/Yokize/decorize/CI/master?style=flat-square&logo=github)](https://github.com/Yokize/decorize/actions)
[![quality](https://img.shields.io/codefactor/grade/github/Yokize/decorize?logo=codefactor&logoColor=white&style=flat-square&label=quality)](https://www.codefactor.io/repository/github/Yokize/decorize)
[![coverage](https://img.shields.io/codacy/coverage/8f0566a3ddca4105aad6ee0585ff5379?style=flat-square&logo=codacy&label=coverage)](https://www.codacy.com/gh/Yokize/decorize?utm_source=github.com&utm_medium=referral&utm_content=Yokize/decorize&utm_campaign=Badge_Coverage)
[![dependencies](https://img.shields.io/librariesio/release/npm/@decorize/core?style=flat-square&label=dependencies)](https://www.npmjs.com/package/@decorize/core)
![min+gzip](https://img.shields.io/bundlephobia/minzip/@decorize/core?style=flat-square&label=min%2Bzip)
![typescript](https://img.shields.io/static/v1?style=flat-square&logo=typescript&color=informational&label&message=3.9)

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

We are actively supporting the package, so please contact us at [GitHub](https://github.com/Yokize/decorize) or [Gitter](https://gitter.im/decorize/community) if you have any suggestions or questions.
