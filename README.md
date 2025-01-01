# myPortfolio 网站

### 项目概述
这是一个前端开发者的个人Portfolio 网站，用于展示我的的简历内容，包括个人头像、个人简介、工作经验、项目经验、技术技能、教育背景以及联系信息。本项目基于静态网页开发，采用 Aceternity UI 框架，注重快速部署和响应式设计，同时也要展现网页风格设计能力。

### 功能特性

#### 主要模块
- 个人信息展示
    - 头像展示（Avatar 组件）
    - 简洁的个人简介
    - 联系方式（邮箱、社交媒体链接等）
- 工作与项目经验
    - 时间轴样式展示工作经历（Timeline 组件）
    - 卡片式展示项目细节（Card 组件）
- 技术技能
    - 标签样式分类展示技能（Badge 组件）
    - 关键技术栈可用 Progress 展示熟练程度
- 教育背景
    - 使用列表（List 组件）按时间排序展示教育经历
    - 强调专业课程和亮点技能
- 联系功能
    - 社交媒体快捷按钮（Button 组件）
    - 留言表单（Form 组件）

#### 额外特性
- 响应式设计，支持移动端和桌面端访问。
- 深色/浅色主题切换。
- 动画和滚动效果增强用户体验。
- 优化的 SEO 配置，方便搜索引擎收录。
- 使用 TailwindCSS 进行样式设计
- 使用 Aceternity UI 框架进行组件设计
- 使用 Next.js 进行静态生成
- 使用 GitHub Pages 进行部署
- 使用懒加载技术，提高页面加载速度

#### 技术栈
- 前端：HTML5, CSS3, JavaScript, TailwindCSS
- UI 框架：Aceternity UI
- 静态生成器：Next.js
- 部署平台：GitHub Pages

#### 项目结构

myPortfolio/
├── public/                # 静态资源（图片、图标）
├── src/
│   ├── components/        # 页面组件
│   ├── pages/             # 页面文件
│   ├── styles/            # 自定义样式
│   └── App.js             # 入口文件
├── package.json           # 项目依赖
├── README.md              # 项目说明
