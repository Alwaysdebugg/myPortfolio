# Jacky Feng's Portfolio Website

A modern personal portfolio website showcasing frontend development skills and project experience.

## 🔗 Live Preview

**Live Demo:** [vercel link](https://myportfolio-tau-ten-34.vercel.app/)

## ✨ Features

### 🎨 Design Highlights
- **Interactive Splash Screen** - Gesture-controlled SplashScreen with drag-to-navigate
- **Responsive Design** - Perfect adaptation for desktop and mobile devices
- **Dark Theme** - Consistent black theme color scheme
- **Smooth Animations** - Rich interactive animations powered by Framer Motion
- **Real-time Clock** - Live time display in Hero section

### 📝 Content Modules
- **Personal Introduction** - Dynamic typewriter effect for personal information
- **Skills Showcase** - Technology stack tags and capability demonstration
- **Project Experience** - Card-style project display with modal details
- **Work History** - Timeline-style career progression
- **Educational Background** - Academic history and achievements
- **Blog System** - Markdown-supported technical articles
- **Contact Information** - Social media links and contact details

### 🚀 Technical Implementation
- **Next.js 15** - Full-stack React framework with static export support
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Atomic CSS framework
- **Framer Motion** - Professional animation library
- **NextUI + Aceternity UI** - Modern UI component libraries
- **Markdown Support** - Blog articles with code highlighting, images, and links

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 15.1.3 |
| Language | TypeScript | 5.7.2 |
| Styling | Tailwind CSS | 3.4.17 |
| UI Library | NextUI | 2.6.10 |
| UI Enhancement | Aceternity UI | 0.2.2 |
| Animation | Framer Motion | 11.16.1 |
| Icons | React Icons | 5.4.0 |
| Deployment | GitHub Pages | - |

## 📦 Main Features

### 🏠 Homepage Modules
- **SplashScreen** - Drag gesture-supported launch page
- **Hero Section** - Personal introduction and skill tags
- **About Section** - Detailed personal information with Bento grid layout
- **Projects Section** - Project showcase with modal detail windows
- **Experience Section** - Work history timeline
- **Skills Section** - Technology stack and tools display
- **Contact Section** - Contact methods and social links

### 📚 Blog System
- **Article List** - Search and tag filtering support
- **Article Details** - Markdown rendering with code highlighting
- **Tag System** - Article categorization and filtering
- **Reading Time** - Automatic estimated reading time calculation

### 📱 Responsive Features
- **Mobile Optimization** - Perfect mobile experience
- **Touch Gestures** - Swipe and tap interaction support
- **Performance Optimization** - Lazy loading and code splitting
- **SEO Friendly** - Optimized meta tags and structure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/Alwaysdebugg/myPortfolio.git
cd myPortfolio
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

4. **Open Browser**
Visit [http://localhost:3000](http://localhost:3000)

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog pages
│   └── resume/            # Resume page
├── components/
│   ├── sections/          # Page section components
│   │   ├── Hero.tsx       # Hero section
│   │   ├── About.tsx      # About me
│   │   ├── Projects.tsx   # Project showcase
│   │   ├── Experience.tsx # Work experience
│   │   └── SplashScreen.tsx # Launch screen
│   ├── blog/              # Blog-related components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── data/                  # Static data
```

## 🎨 Customization

### Personal Information Updates
Edit the following files to update personal information:
- `src/components/sections/Hero.tsx` - Main personal information
- `src/components/sections/About.tsx` - Detailed introduction
- `src/components/sections/Experience.tsx` - Work experience
- `src/data/blog-posts.ts` - Blog article data

### Style Customization
- `src/app/globals.css` - Global styles
- `tailwind.config.ts` - Tailwind configuration
- Component-level className adjustments for local styling

### Content Updates
- Project information: `src/components/sections/Projects.tsx`
- Skill tags: `src/components/sections/Skills.tsx`
- Contact methods: `src/components/sections/Contact.tsx`

## 📈 Performance Optimizations

- ✅ **Static Export** - Fully static website
- ✅ **Code Splitting** - Load components on demand
- ✅ **Image Optimization** - WebP format and lazy loading
- ✅ **CSS Optimization** - Tailwind CSS purge configuration
- ✅ **SEO Optimization** - Complete meta tags and structured data

## 🔧 Development Guide

### Adding New Page Sections
1. Create new component in `src/components/sections/`
2. Use `"use client"` directive for interactivity
3. Import to `src/app/page.tsx` and add to page
4. Add appropriate Framer Motion animations

### Blog Article Management
- Article data stored in `src/data/blog-posts.ts`
- Supports Markdown syntax and frontmatter metadata
- Automatic reading time calculation and tag categorization

### Deploy to GitHub Pages
Project is configured for automatic deployment to GitHub Pages:
1. Push code to main branch
2. GitHub Actions automatically builds and deploys
3. Visit `https://username.github.io/myPortfolio/`

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**Jacky Feng** - Frontend Developer

- 📧 Email: [fengjacky84@gmail.com]
- 🐙 GitHub: [@Alwaysdebugg](https://github.com/Alwaysdebugg)

---

⭐ If this project helps you, please give it a star!