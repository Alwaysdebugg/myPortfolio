import { BlogPost } from '@/types/blog'

// 备用博客数据 - 当文件系统读取失败时使用
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'react-18-new-features',
    title: 'React 18 新特性深度解析',
    slug: 'react-18-new-features',
    excerpt: '深入探讨 React 18 带来的并发特性、自动批处理、以及新的 Hooks，了解如何在项目中应用这些新特性。',
    content: `# React 18 新特性深度解析

React 18 是一个重要的版本更新，引入了许多令人兴奋的新特性。

## 并发特性 (Concurrent Features)

React 18 的最大亮点是**并发渲染**，这使得 React 应用能够更好地响应用户交互。

### Suspense 改进

\`\`\`jsx
import { Suspense } from 'react'

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage />
    </Suspense>
  )
}
\`\`\`

### 新的 Hooks

React 18 引入了几个新的 Hooks：

- **useId**: 生成唯一ID
- **useTransition**: 标记非紧急更新
- **useDeferredValue**: 延迟更新值

## 自动批处理

React 18 现在会自动批处理所有更新，包括Promise、setTimeout 等异步操作中的更新。

\`\`\`jsx
// React 18 会自动批处理这些更新
setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React 只会重新渲染一次
}, 1000)
\`\`\`

## useTransition Hook

\`useTransition\` 允许你将状态更新标记为"转换"，这些更新将具有较低的优先级。

\`\`\`jsx
import { useTransition, useState } from 'react'

function App() {
  const [isPending, startTransition] = useTransition()
  const [count, setCount] = useState(0)
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1)
    })
  }
  
  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  )
}
\`\`\`

## 严格模式的变化

React 18 的严格模式现在会**双重渲染组件**，这有助于发现副作用问题。

> 在开发模式下，React 会故意双重调用组件、初始化函数和状态更新函数。

## 总结

React 18 为现代 React 应用开发带来了更强大的性能优化能力。这些新特性让我们能够构建更加流畅和响应式的用户界面。

### 关键要点

1. **并发特性**提升了应用的响应性
2. **自动批处理**减少了不必要的重新渲染
3. **新的 Hooks** 提供了更精细的控制能力
4. **严格模式**帮助开发者发现潜在问题`,
    author: 'Jacky Feng',
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-20',
    tags: ['React', 'JavaScript', '前端开发', 'Hooks'],
    readingTime: 8,
    coverImage: '/images/react18-cover.jpg',
    isPublished: true
  },
  {
    id: 'typescript-advanced-types',
    title: 'TypeScript 高级类型实战指南',
    slug: 'typescript-advanced-types',
    excerpt: '掌握 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型等，提升代码质量和开发效率。',
    content: `# TypeScript 高级类型实战指南

TypeScript 的类型系统非常强大，本文将深入探讨一些高级类型特性。

## 条件类型 (Conditional Types)

条件类型允许我们根据条件选择类型：

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T

// 使用示例
type A = NonNullable<string | null> // string
type B = NonNullable<number | undefined> // number
\`\`\`

### 分布式条件类型

当条件类型作用于联合类型时，会分布到每个成员：

\`\`\`typescript
type ToArray<Type> = Type extends any ? Type[] : never

// SuccessState | ErrorState[] | LoadingState[]
type StrArrOrNumArr = ToArray<string | number | boolean>
\`\`\`

## 映射类型 (Mapped Types)

映射类型可以基于已有类型创建新类型：

\`\`\`typescript
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
\`\`\`

### 键重映射

TypeScript 4.1+ 支持键重映射：

\`\`\`typescript
type Getters<Type> = {
  [Property in keyof Type as \`get\${Capitalize<string & Property>}\`]: () => Type[Property]
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
\`\`\`

## 模板字面量类型

TypeScript 4.1+ 支持模板字面量类型：

\`\`\`typescript
type EmailLocaleIDs = "welcome_email" | "email_heading"
type FooterLocaleIDs = "footer_title" | "footer_sendoff"

type AllLocaleIDs = \`\${EmailLocaleIDs | FooterLocaleIDs}_id\`
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
\`\`\`

### 实际应用案例

\`\`\`typescript
// API 路径类型安全
type Version = "v1" | "v2"
type Resource = "users" | "posts" | "comments"
type Endpoint = \`/\${Version}/\${Resource}\`

// CSS 属性类型
type Size = "sm" | "md" | "lg"
type Color = "red" | "blue" | "green"
type ClassName = \`\${Size}-\${Color}\`
\`\`\`

## 实用类型组合

结合多种高级类型创建强大的工具类型：

\`\`\`typescript
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
\`\`\`

## 最佳实践

### 1. 类型守卫

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript 知道这里 value 是 string
    console.log(value.toUpperCase())
  }
}
\`\`\`

### 2. 断言函数

\`\`\`typescript
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
\`\`\`

## 总结

这些高级类型特性让我们能够构建更加类型安全的应用程序：

- **条件类型**提供了动态类型选择能力
- **映射类型**让类型转换变得优雅
- **模板字面量类型**带来了字符串级别的类型安全
- **合理组合**这些特性可以创建强大的工具类型

掌握这些高级特性，能够大大提升 TypeScript 代码的表达力和安全性。`,
    author: 'Jacky Feng',
    publishedAt: '2024-01-10',
    tags: ['TypeScript', '类型系统', '前端开发'],
    readingTime: 12,
    isPublished: true
  },
  {
    id: 'frontend-performance-optimization',
    title: '现代前端性能优化实践',
    slug: 'frontend-performance-optimization',
    excerpt: '从代码分割、懒加载到Web Vitals优化，全面提升前端应用性能的最佳实践和工具推荐。',
    content: `# 现代前端性能优化实践

性能优化是前端开发中的重要课题，本文将介绍一些实用的优化策略。

## Core Web Vitals

Google 的 Core Web Vitals 包含三个重要指标：

- **LCP (Largest Contentful Paint)**: 最大内容绘制 - 应 < 2.5s
- **FID (First Input Delay)**: 首次输入延迟 - 应 < 100ms
- **CLS (Cumulative Layout Shift)**: 累积布局偏移 - 应 < 0.1

### 测量工具

- **Lighthouse**: 综合性能分析
- **PageSpeed Insights**: Google 官方工具
- **Web Vitals Extension**: Chrome 扩展
- **Real User Monitoring (RUM)**: 真实用户数据

## 代码分割策略

### 路由级别分割

\`\`\`javascript
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/About'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Suspense>
  )
}
\`\`\`

### 组件级别分割

对于大型组件，也可以进行分割：

\`\`\`javascript
const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  const [showChart, setShowChart] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        显示图表
      </button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  )
}
\`\`\`

### 第三方库分割

\`\`\`javascript
// 动态导入第三方库
const loadChartLibrary = async () => {
  const { Chart } = await import('chart.js')
  return Chart
}

// 或者创建独立的 chunk
const DatePicker = lazy(() => 
  import(/* webpackChunkName: "date-picker" */ './DatePicker')
)
\`\`\`

## 图片优化

### 现代图片格式

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="description" loading="lazy">
</picture>
\`\`\`

### 响应式图片

\`\`\`html
<img 
  srcset="
    small.jpg 480w,
    medium.jpg 768w,
    large.jpg 1200w
  "
  sizes="
    (max-width: 480px) 100vw,
    (max-width: 768px) 50vw,
    33vw
  "
  src="medium.jpg"
  alt="Responsive image"
  loading="lazy"
>
\`\`\`

### Next.js Image 组件

\`\`\`jsx
import Image from 'next/image'

function OptimizedImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero"
      width={800}
      height={600}
      priority // 对于 LCP 图片
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
\`\`\`

## 资源预加载策略

### 关键资源预加载

\`\`\`html
<!-- 预加载关键字体 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

<!-- 预加载关键 CSS -->
<link rel="preload" href="/styles/critical.css" as="style">

<!-- 预连接到第三方域名 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="//example.com">
\`\`\`

### 路由预加载

\`\`\`javascript
// React Router 路由预加载
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <Link 
      to="/dashboard"
      onMouseEnter={() => {
        // 鼠标悬停时预加载
        import('./pages/Dashboard')
      }}
    >
      Dashboard
    </Link>
  )
}
\`\`\`

## 缓存策略

### 浏览器缓存

\`\`\`javascript
// Service Worker 缓存策略
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images-v1').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone())
            return fetchResponse
          })
        })
      })
    )
  }
})
\`\`\`

### HTTP 缓存头

\`\`\`javascript
// Next.js 缓存配置
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
\`\`\`

## JavaScript 优化

### Tree Shaking

\`\`\`javascript
// 只导入需要的功能
import { debounce } from 'lodash-es'
// 而不是
import _ from 'lodash'

// 使用 babel-plugin-import 自动优化
import { Button, DatePicker } from 'antd'
\`\`\`

### 避免不必要的重新渲染

\`\`\`jsx
import { memo, useMemo, useCallback } from 'react'

const ExpensiveComponent = memo(({ items, onItemClick }) => {
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: true
    }))
  }, [items])

  const handleClick = useCallback((id) => {
    onItemClick(id)
  }, [onItemClick])

  return (
    <div>
      {processedItems.map(item => (
        <Item 
          key={item.id} 
          item={item} 
          onClick={handleClick}
        />
      ))}
    </div>
  )
})
\`\`\`

## 网络优化

### HTTP/2 推送

\`\`\`javascript
// 服务器推送关键资源
app.get('/', (req, res) => {
  res.push('/styles/critical.css')
  res.push('/scripts/main.js')
  res.render('index')
})
\`\`\`

### 资源压缩

\`\`\`javascript
// gzip/brotli 压缩
const compression = require('compression')
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false
    }
    return compression.filter(req, res)
  },
  level: 6,
  threshold: 1024
}))
\`\`\`

## 性能监控

### 性能 API

\`\`\`javascript
// 测量自定义指标
performance.mark('component-start')
// ... 组件渲染逻辑
performance.mark('component-end')
performance.measure('component-render', 'component-start', 'component-end')

// 获取测量结果
const measures = performance.getEntriesByType('measure')
console.log(measures)
\`\`\`

### Web Vitals 监控

\`\`\`javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // 发送到分析服务
  analytics.track('web-vital', {
    name: metric.name,
    value: metric.value,
    id: metric.id
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
\`\`\`

## 构建优化

### Webpack 配置

\`\`\`javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
\`\`\`

### 分析工具

\`\`\`bash
# Bundle 分析
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js

# 源码映射分析
npm install --save-dev source-map-explorer
npx source-map-explorer 'build/static/js/*.js'
\`\`\`

## 总结

性能优化需要**持续关注**和**量化分析**：

### 关键策略
1. **测量优先**: 先测量，再优化
2. **渐进增强**: 核心功能优先
3. **用户体验**: 感知性能同样重要
4. **持续监控**: 性能是一个持续过程

### 工具推荐
- **Lighthouse**: 综合分析
- **WebPageTest**: 详细测试
- **Chrome DevTools**: 开发调试
- **Real User Monitoring**: 生产监控

记住：**过早优化是万恶之源**，但合理的性能优化能显著提升用户体验。`,
    author: 'Jacky Feng',
    publishedAt: '2024-01-05',
    tags: ['性能优化', 'Web Vitals', '前端开发', '用户体验'],
    readingTime: 15,
    isPublished: true
  }
]