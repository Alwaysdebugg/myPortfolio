# Content Constants

This directory contains centralized content management files for the portfolio website.

## Why Use Content Constants?

### Benefits:
1. **Centralized Management** - All text content in one place
2. **Easy Updates** - Change content without touching component logic
3. **Type Safety** - TypeScript types ensure consistency
4. **Better Performance** - Constants are optimized at build time
5. **Maintainability** - Clear separation of content and presentation
6. **Reusability** - Share content across multiple components

## Usage Example

### heroContent.ts

```typescript
import { HERO_CONTENT } from '@/constants/heroContent'

// Use in component
<h1>{HERO_CONTENT.greeting}</h1>
<p>{HERO_CONTENT.introduction.short}</p>

// Loop through paragraphs
{HERO_CONTENT.introduction.paragraphs.map((p, i) => (
  <p key={i}>{p}</p>
))}

// Access social links
<a href={HERO_CONTENT.social.linkedin.url}>
  {HERO_CONTENT.social.linkedin.label}
</a>
```

## File Structure

```
/constants/
  ├── README.md           # This file
  ├── heroContent.ts      # Hero section content
  └── [future files]      # Add more as needed
      ├── aboutContent.ts
      ├── projectsContent.ts
      └── skillsContent.ts
```

## Best Practices

### ✅ DO:
- Keep all text content in constant files
- Use descriptive property names
- Provide both full and short versions of long text
- Add TypeScript types for intellisense
- Group related content together
- Include metadata (URLs, labels, etc.)

### ❌ DON'T:
- Don't hardcode text in components
- Don't mix content with styling logic
- Don't use generic names like `text1`, `text2`
- Don't store dynamic/user-generated content here
- Don't include sensitive information

## Adding New Content Files

1. Create new file: `src/constants/[section]Content.ts`
2. Export a const object with `as const` assertion
3. Export the type for TypeScript support
4. Import and use in components

Example:
```typescript
// src/constants/aboutContent.ts
export const ABOUT_CONTENT = {
  title: "About Me",
  description: "...",
  skills: ["React", "TypeScript", "Next.js"]
} as const

export type AboutContent = typeof ABOUT_CONTENT

// In component
import { ABOUT_CONTENT } from '@/constants/aboutContent'
```

## When to Use Other Approaches

- **i18n Files** - If you need multi-language support
- **Markdown Files** - For blog posts and long-form content
- **CMS/API** - For dynamic content that changes frequently
- **Database** - For user-generated or frequently updated content

## Migration Guide

If you have hardcoded text in components:

1. Create or update the content constant file
2. Add your text to the appropriate section
3. Import the constant in your component
4. Replace hardcoded strings with constant references
5. Test that everything still works
6. Commit the changes

## Future Enhancements

Consider adding:
- Separate content files for each major section
- Support for rich text formatting
- Content validation schemas
- Automated content testing
- Integration with CMS for easier editing

