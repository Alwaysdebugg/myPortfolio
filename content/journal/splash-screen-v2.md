---
title: "Rebuilding the entrance"
slug: "splash-screen-v2"
summary: "Keeping the drag gesture while replacing a generic developer intro with a quieter, more personal Always Debugging identity."
publishedAt: "2026-08-02"
type: "build"
status: "shipped"
version: "v2.1.0"
tags:
  - Next.js
  - Interaction Design
  - Accessibility
links:
  - label: "Experience the Splash"
    href: "/"
isPublished: true
---

## The problem

The original Splash was expressive, but its message could have belonged to almost any developer. “Problem Solver” and “Innovator” said very little about how I actually think or work. The drag interaction was the part worth keeping: it felt deliberate, physical, and different from immediately landing on a standard portfolio homepage.

## The direction

I rebuilt the entrance around a simpler idea: **Always Debugging**. It connects to the name I have used online for years and to the way I approach both software and learning. The new statement—“Still learning. Still building. Still debugging.”—treats the site as work in progress rather than a finished personal advertisement.

## Engineering notes

- Replaced random particle positions with deterministic trace points to avoid unstable rendering.
- Moved drag feedback from React state to Framer Motion values so pointer movement does not trigger component re-renders.
- Added a visible click target, keyboard focus styles, descriptive link labels, and reduced-motion behavior.
- Tested the layout at desktop and 390px mobile widths.
- Fixed a mobile positioning issue caused by animation transforms overriding utility transforms by separating the positioning and animation layers.

## What comes next

The Splash now establishes the visual language. The next step is carrying that language into this journal and the individual project stories, so the entrance feels like the first page of the same system rather than a standalone animation.
