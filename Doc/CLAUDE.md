# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Deployment
- Project is deployed to GitHub Pages at: https://alwaysdebugg.github.io/myPortfolio/
- Build output goes to `/out` directory for static export
- Homepage configured for GitHub Pages deployment

## Architecture Overview

### Project Structure
This is a **Next.js 13+ portfolio website** using App Router with the following structure:

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main portfolio page
│   └── resume/            # Resume page route
├── components/
│   ├── sections/          # Major page sections (Hero, About, Projects, etc.)
│   └── ui/                # Reusable UI components
└── lib/                   # Utility functions (cn helper, etc.)
```

### Tech Stack
- **Framework**: Next.js 15.1.3 with App Router
- **UI Libraries**: NextUI 2.6.10, Aceternity UI 0.2.2
- **Styling**: Tailwind CSS with custom configurations
- **Animations**: Framer Motion 11.16.1
- **TypeScript**: Full TypeScript implementation
- **Theme**: Dark/light mode with system preference detection

### Component Architecture

#### Section Components (`/sections/`)
- **Hero.tsx** - Landing section with typewriter effect and real-time clock
- **About.tsx** - Personal info using Bento grid layout
- **Projects.tsx** - Project showcase with modal interactions
- **Skills.tsx** - Tech stack with animated icons
- **Experience.tsx** - Work timeline
- **Education.tsx** - Academic background
- **Contact.tsx** - Contact information and social links

#### UI Components (`/ui/`)
- **bento-grid.tsx** - Custom grid layout system
- **navbar.tsx** - Responsive navigation with theme toggle
- **theme-provider.tsx** - Dark/light mode context
- **3d-pin.tsx** - 3D card effect components

### Key Patterns

#### Animation Strategy
- All animations use **Framer Motion** with consistent patterns
- **whileInView** for scroll-triggered animations
- **Staggered animations** for grid items
- **Hover effects** with scale and color transitions

#### Styling Approach
- **Tailwind CSS** with custom color palette and dark mode
- **Responsive breakpoints** (`md:`, `lg:`) throughout
- **Custom animations** defined in tailwind.config.ts (aurora effect)
- **Utility function** `cn()` for conditional class merging

#### TypeScript Usage
- **Strict typing** for all component props
- **Interface definitions** for data structures (Project, etc.)
- **Type-safe** event handlers and state management

#### State Management
- **Local component state** with useState for simple interactions
- **Modal state** for project detail overlays
- **No global state management** - props drilling for data flow

## Important Implementation Details

### Deployment Configuration
- **Static export** configured for GitHub Pages
- **Asset paths** handle both local dev and production deployment
- **Image optimization** disabled for static export compatibility

### Theme System
- **ThemeProvider** wraps the entire app in layout.tsx
- **System preference detection** for initial theme
- **Persistent theme switching** with dark/light mode toggle

### Performance Optimizations
- **Viewport-based animations** to prevent unnecessary renders
- **Dynamic imports** where appropriate
- **Next.js Image** component with optimization (where compatible with static export)

### Content Management
- **Project data** stored as TypeScript objects in components
- **Static assets** in `/public/images/` directory
- **Project details** can be found in `projectDetail.md`

## Development Guidelines

### When Adding New Sections
1. Create component in `src/components/sections/`
2. Use "use client" directive for interactivity
3. Implement Framer Motion animations with whileInView
4. Add proper TypeScript interfaces
5. Use Tailwind CSS with dark mode variants
6. Import and add to main page.tsx with DivLine separator

### When Modifying Styles
- Follow existing Tailwind patterns
- Use dark: variants for theme support
- Maintain responsive design with proper breakpoints
- Test both light and dark modes

### When Adding Dependencies
- Prefer existing UI libraries (NextUI, Aceternity UI)
- Ensure compatibility with Next.js static export
- Update package.json with proper version constraints