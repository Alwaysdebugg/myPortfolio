/**
 * Hero Section Content
 * Centralized content management for the Hero section
 */

export const HERO_CONTENT = {
  // Main headings
  greeting: "Hi there 👋",
  name: "I'm Jacky",
  typewriterText: [
    "<Thinker. Maker. Doer. />",
    "Frontend Developer",
    "Technical Blogs",
    "AI Explorer",
  ],

  // Introduction text
  introduction: {
    full: `Hi, I'm Jacky. The name "Jacky" actually comes from the pronunciation of my Chinese name, Jiaqi. I'm a front-end developer who fell in love with web development the moment I built my first personal blog using simple HTML and CSS in a university class. Since then, I've been passionate about bringing ideas to life through code and creating meaningful digital experiences.

I'm always learning — exploring new front-end technologies, AI, and everything that pushes the boundaries of what's possible on the web. I'm excited to keep discovering what's next on this journey.

If you're interested, you can learn more about me on this website.`,

    // Split into paragraphs for better layout control
    paragraphs: [
      `Hi, I'm Jacky. The name "Jacky" actually comes from the pronunciation of my Chinese name, Jiaqi. I'm a front-end developer who fell in love with web development the moment I built my first personal blog using simple HTML and CSS in a university class.`,

      `Since then, I've been passionate about bringing ideas to life through code and creating meaningful digital experiences.`,

      `I'm always learning — exploring new front-end technologies, AI, and everything that pushes the boundaries of what's possible on the web. I'm excited to keep discovering what's next on this journey.`,

      `If you're interested, you can learn more about me on this website.`,
    ],

    // Short version for mobile or preview
    short: `Hi, I'm Jacky. I'm a front-end developer passionate about bringing ideas to life through code and creating meaningful digital experiences.`,
  },

  // Tags/Keywords
  tags: [
    "Lifelong Learner",
    "Frontend Developer",
    "React",
    "Technical Blogs",
    "AI Explorer",
  ],

  // Social links
  social: {
    linkedin: {
      url: "https://www.linkedin.com/in/jfeng-307210291",
      label: "LinkedIn Profile",
    },
    github: {
      url: "https://github.com/Alwaysdebugg",
      label: "GitHub Profile",
    },
    email: {
      url: "mailto:fengjacky84@gmail.com",
      label: "Email Contact",
    },
  },

  // Timezone info
  timezone: {
    label: "PST",
    fullName: "Pacific Standard Time",
  },
} as const;

// Type exports for TypeScript intellisense
export type HeroContent = typeof HERO_CONTENT;
