# Architecture & Design

This section contains system architecture, UI/UX specifications, and technical design patterns.

## Documents

### [Fullstack Architecture](fullstack-architecture.md)
**Purpose**: Complete technical architecture for the marketing website

**Covers**: Tech stack, data flow, API design, database schema, deployment architecture

**When to read**: Before making architectural decisions or understanding system design

### [Frontend Specification](frontend-spec.md)
**Purpose**: Comprehensive UI/UX design system and component specifications

**Covers**: Design principles, typography, colors, components, animations, **blog design system**

**When to read**: Before building any UI components or styling pages

**Key Section**: Section 10 contains the complete Blog Article Design System

---

## Key Architectural Decisions

### Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Auth)
- **Payments**: Stripe
- **Deployment**: Vercel
- **Monitoring**: Sentry + Vercel Analytics

### Design Principles
1. Behavioral psychology through commitment must be instantly recognizable
2. Research-backed without being research-heavy
3. Commitment-anchored visual language
4. Social accountability made visceral
5. Progressive behavioral engagement

### Blog Design System
- 6 visual component types (stats, callouts, tables, quotes, dividers, multi-stats)
- Context-aware color coding (red=problem, blue=research, green=success, pink=brand)
- Mobile-first responsive design
- WCAG AA accessibility compliant

---

## Related Documentation

- [Marketing Website PRD](../02-requirements/marketing-website-prd.md) - What we're building
- [Setup Guide](../04-implementation/setup-guide.md) - How to get started
- [Development Workflow](../04-implementation/development-workflow.md) - Best practices
- [Blog Article Template](../06-content/blog-article-template.md) - Content creation
