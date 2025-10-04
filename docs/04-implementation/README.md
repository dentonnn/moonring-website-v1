# Implementation & Development

This section contains practical guides for setting up, developing, and maintaining the Moon Ring marketing website.

## Documents

### [Setup Guide](setup-guide.md)
**Purpose**: Get your development environment running

**Covers**: Prerequisites, environment variables, database setup, local development

**When to read**: First time setting up the project

### [Development Workflow](development-workflow.md)
**Purpose**: Best practices and development standards

**Covers**: Git workflow, code standards, testing, PR process, documentation requirements

**When to read**: Before contributing code

### [Stack Guide](stack-guide.md)
**Purpose**: Deep dive into the Next.js + Supabase + Stripe stack

**Covers**: Framework patterns, API routes, authentication, database queries, payment integration

**When to read**: When implementing features or troubleshooting stack-specific issues

---

## Quick Start

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd moonring-website-v1
   ```

2. **Follow the Setup Guide** → [setup-guide.md](setup-guide.md)
   - Install dependencies
   - Configure environment variables
   - Set up Supabase
   - Run migrations

3. **Start development**
   ```bash
   cd moon-ring-platform
   npm run dev
   ```

4. **Read best practices** → [development-workflow.md](development-workflow.md)
   - Feature branch workflow
   - Commit message standards
   - PR requirements

---

## Development Commands

From `moon-ring-platform/` directory:

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Note**: Always run commands from the `moon-ring-platform/` subdirectory, not the repo root.

---

## Common Tasks

| Task | Documentation |
|------|---------------|
| Set up environment | [Setup Guide](setup-guide.md) |
| Add a new page | [Stack Guide](stack-guide.md) + [Frontend Spec](../03-architecture/frontend-spec.md) |
| Write a blog post | [Blog Template](../06-content/blog-article-template.md) |
| Integrate Stripe | [Stack Guide](stack-guide.md) |
| Configure Supabase | [Setup Guide](setup-guide.md) |
| Deploy to production | [Deployment SOP](../05-deployment/deployment-sop.md) |

---

## Related Documentation

- [Fullstack Architecture](../03-architecture/fullstack-architecture.md) - System design
- [Frontend Spec](../03-architecture/frontend-spec.md) - UI/UX guidelines
- [Deployment SOP](../05-deployment/deployment-sop.md) - Going to production
- [Troubleshooting](../05-deployment/troubleshooting.md) - Common issues
