# Jacky Feng's Portfolio Website

A modern personal portfolio website showcasing frontend development skills, project experience, and an **AI-powered chat** backed by RAG (Retrieval Augmented Generation).

## 🔗 Live Preview

**Live Demo:** [Vercel](https://myportfolio-tau-ten-34.vercel.app/)

## ✨ Features

### 🎨 Design Highlights

- **Interactive Splash Screen** - Gesture-controlled launch page with drag-to-navigate
- **Responsive Design** - Optimized for desktop and mobile
- **Dark / Light Theme** - System preference detection with manual toggle
- **Smooth Animations** - Framer Motion–driven interactions
- **Real-time Clock** - Live time display in Hero section

### 📝 Content & Pages

- **Hero Section** - Typewriter-style intro, skill tags, and social links
- **Blog System** - Markdown articles with search, tags, and reading time
- **Resume Page** - `/resume` route (available in codebase)
- **AI Chat** - Floating chat button opens a modal; RAG-powered Q&A about you and your work

### 🤖 AI Chat (RAG)

- **Vector Search** - Supabase `pgvector` stores embeddings from `knowledge-base.json`
- **Streaming Responses** - Google Gemini 2.5 Flash via Vercel AI SDK
- **Rate Limiting** - Per-IP limits to protect the API
- **Knowledge Base** - Editable in `src/data/knowledge-base.json`; init via `/api/vector-store/init`

### 🚀 Technical Implementation

- **Next.js 15** - App Router, API routes, optional static export
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **NextUI + Aceternity UI** - UI components
- **Markdown** - Blog posts with code highlighting, images, links

## 🛠️ Tech Stack

| Category   | Technology                                       |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js 15.x                                     |
| Language   | TypeScript 5.7                                   |
| Styling    | Tailwind CSS 3.4                                 |
| UI         | NextUI, Aceternity UI                            |
| Animation  | Framer Motion                                    |
| AI / Chat  | Vercel AI SDK, @ai-sdk/google (Gemini 2.5 Flash) |
| Vector DB  | Supabase (pgvector)                              |
| Deployment | Vercel (default), GitHub Pages (static)          |

## 📦 Main Features

### 🏠 Homepage

- **SplashScreen** - Drag-to-enter launch screen
- **Hero** - Intro, typewriter effect, skills, links
- **Floating Chat** - Opens AI chat modal
- **Navbar** - Home, Blog, theme toggle

### 📚 Blog

- **Article List** - Search and tag filters
- **Article Detail** - Markdown + code highlighting
- **Tags & Reading Time** - Auto-calculated

### 📁 Available Section Components

The following live in `src/components/sections/` and can be wired into the homepage:

- **About** - Bento grid layout
- **Projects** - Cards with modal details
- **Experience** - Work timeline
- **Skills** - Tech stack
- **Education** - Academic background
- **Contact** - Social links

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/Alwaysdebugg/myPortfolio.git
   cd myPortfolio
   npm install
   ```

2. **Start development**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3001](http://localhost:3001).

### Build & Scripts

```bash
# Production build (includes blog data generation)
npm run build

# Start production server
npm run start

# Static export for GitHub Pages
npm run build:static

# Lint
npm run lint
```

## 🔐 Environment Variables

For **AI Chat** and **RAG** to work, create `.env.local`:

| Variable                       | Description                         |
| ------------------------------ | ----------------------------------- |
| `SUPABASE_URL`                 | Supabase project URL                |
| `SUPABASE_SERVICE_ROLE_KEY`    | Supabase service role key           |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key (for @ai-sdk/google) |

**Note:** The project uses **Google Gemini** for both chat and embeddings. Use `GOOGLE_GENERATIVE_AI_API_KEY`;

### AI Chat Setup (Supabase + Vector Store)

1. Create a Supabase project and run `sql/supabase-init.sql` in the SQL Editor.
2. Add the env vars above to `.env.local`.
3. Run `node scripts/setup-supabase.js` to verify.
4. With dev server running, call `POST http://localhost:3001/api/vector-store/init` to seed the vector store from `knowledge-base.json`.

See **[Doc/QUICK_START.md](Doc/QUICK_START.md)** for a step-by-step guide.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, theme provider
│   ├── page.tsx            # Homepage (Splash, Hero, Chat modal)
│   ├── blog/               # Blog list & detail
│   ├── resume/             # Resume page
│   └── api/
│       ├── chat/           # POST /api/chat (streaming RAG + Gemini)
│       └── vector-store/
│           └── init/       # POST /api/vector-store/init (seed vectors)
├── components/
│   ├── sections/           # Hero, SplashScreen, About, Projects, etc.
│   ├── chat/               # ChatWindow, MessageList, MessageInput, etc.
│   ├── blog/               # BlogCard, BlogList, BlogDetail
│   └── ui/                 # Navbar, Footer, theme, bento-grid, etc.
├── lib/
│   ├── rag/                # retrieval, embeddings, vector-store-supabase
│   └── ...
├── data/
│   ├── knowledge-base.json # RAG knowledge base
│   └── ...
├── types/
└── utils/
```

## 🎨 Customization

- **Hero / intro:** `src/constants/heroContent.ts`, `src/components/sections/Hero.tsx`
- **About / Experience:** `About.tsx`, `Experience.tsx`
- **Projects / Skills / Contact:** `Projects.tsx`, `Skills.tsx`, `Contact.tsx`
- **Blog data:** `src/data/blog-posts.ts`, `content/blog/`
- **RAG knowledge:** `src/data/knowledge-base.json`
- **Styles:** `src/app/globals.css`, `tailwind.config.ts`

## 📈 Performance & Deployment

- **Vercel (recommended):** Use `npm run build:vercel` (or `npm run build`). Configure env vars in the Vercel dashboard.
- **GitHub Pages:** Use `BUILD_STATIC=true` and `NEXT_PUBLIC_BASE_PATH` with `npm run build:static`. Note: API routes and AI chat require a Node server, so they are **not** available in static export.

## 🤝 Contributing

Issues and Pull Requests are welcome.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Jacky Feng** – Frontend Developer

- 📧 [fengjacky84@gmail.com](mailto:fengjacky84@gmail.com)
- 🐙 [@Alwaysdebugg](https://github.com/Alwaysdebugg)

---

⭐ If this project helps you, please give it a star!
