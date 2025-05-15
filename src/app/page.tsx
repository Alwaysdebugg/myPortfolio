import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import Education from '../components/sections/Education'
import Contact from '../components/sections/Contact'
import Navbar from '../components/ui/navbar'
import Footer from '../components/ui/foot'
import GitHubContributions from '../components/sections/GitHubContributions'
import GitHubHeatmap from '../components/sections/GitHubHeatmap'
import { DivLine } from '@/components/ui/divLine'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#948979] dark:bg-gray-800">
      {/* Navbar - Center aligned */}
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-10">
        <div className="space-y-10 w-full">
          <Hero />
          <DivLine />
          <About />
          <DivLine />
          <Projects />
          <DivLine />
          <Education />
          <DivLine />
        </div>
      </div>
      <Footer />
    </div>
  );
} 