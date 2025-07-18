---
title: TypeScript 高级类型实战指南
slug: typescript-advanced-types
excerpt: 掌握 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型等，提升代码质量和开发效率。
author: Jacky Feng
publishedAt: 2024-01-10
tags: [TypeScript, 类型系统, 前端开发]
readingTime: 12
isPublished: true
---

# TypeScript 高级类型实战指南

TypeScript 的类型系统非常强大，本文将深入探讨一些高级类型特性。

## 条件类型 (Conditional Types)

条件类型允许我们根据条件选择类型：

```typescript
type NonNullable<T> = T extends null | undefined ? never : T

// 使用示例
type A = NonNullable<string | null> // string
type B = NonNullable<number | undefined> // number
```

### 分布式条件类型

当条件类型作用于联合类型时，会分布到每个成员：

```typescript
type ToArray<Type> = Type extends any ? Type[] : never

// SuccessState | ErrorState[] | LoadingState[]
type StrArrOrNumArr = ToArray<string | number | boolean>
```

## 映射类型 (Mapped Types)

映射类型可以基于已有类型创建新类型：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Optional<T> = {
  [P in keyof T]?: T[P]
}

// 实际应用
interface User {
  id: number
  name: string
  email: string
}

type ReadonlyUser = Readonly<User>
type PartialUser = Optional<User>
```

### 键重映射

TypeScript 4.1+ 支持键重映射：

```typescript
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
}

interface Person {
  name: string
  age: number
  location: string
}

type PersonGetters = Getters<Person>
// {
//   getName: () => string
//   getAge: () => number
//   getLocation: () => string
// }
```

## 模板字面量类型

TypeScript 4.1+ 支持模板字面量类型：

```typescript
type EmailLocaleIDs = "welcome_email" | "email_heading"
type FooterLocaleIDs = "footer_title" | "footer_sendoff"

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

### 实际应用案例

```typescript
// API 路径类型安全
type Version = "v1" | "v2"
type Resource = "users" | "posts" | "comments"
type Endpoint = `/${Version}/${Resource}`

// CSS 属性类型
type Size = "sm" | "md" | "lg"
type Color = "red" | "blue" | "green"
type ClassName = `${Size}-${Color}`
```

## 实用类型组合

结合多种高级类型创建强大的工具类型：

```typescript
// 深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// 选择性必需
type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

// 类型安全的对象路径
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
    }[Extract<keyof T, string>]
```

## 最佳实践

### 1. 类型守卫

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript 知道这里 value 是 string
    console.log(value.toUpperCase())
  }
}
```

### 2. 断言函数

```typescript
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}

function processUser(user: unknown) {
  assert(typeof user === 'object' && user !== null, 'User must be an object')
  assert('name' in user, 'User must have a name')
  
  // TypeScript 现在知道 user 有 name 属性
  console.log((user as any).name)
}
```

## 总结

这些高级类型特性让我们能够构建更加类型安全的应用程序：

- **条件类型**提供了动态类型选择能力
- **映射类型**让类型转换变得优雅
- **模板字面量类型**带来了字符串级别的类型安全
- **合理组合**这些特性可以创建强大的工具类型

掌握这些高级特性，能够大大提升 TypeScript 代码的表达力和安全性。