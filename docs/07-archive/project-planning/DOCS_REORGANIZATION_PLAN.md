# Documentation Reorganization Plan

**Date**: October 3, 2025
**Goal**: Create efficient, context-preserving documentation structure

## Current Problems

### 1. Duplication & Confusion
- **3 PRD files**: `prd.md`, `prd-moon-ring-social-accountability-platform.md`, `moon-ring-project-prd.md`
- **2 Project briefs**: `brief.md`, `strategy/moon_ring_project_brief.md`
- **Multiple deployment guides**: Root level + platform subdirectory

### 2. Poor Information Architecture
- Stories folder mixes platform features with marketing website tasks
- Root-level docs compete with organized `docs/` folder
- No clear hierarchy between strategy, implementation, and reference

### 3. Context Loss
- Hard to find the "source of truth" for any topic
- Difficult to understand what's current vs. deprecated
- Mixed scopes (platform vs. marketing website)

## Proposed New Structure

```
moonring-website-v1/
│
├── README.md                          # Project overview & quick start
├── CLAUDE.md                          # AI assistant instructions (keep at root)
│
├── docs/                              # 📚 ALL DOCUMENTATION HERE
│   │
│   ├── 00-INDEX.md                    # Master index with navigation
│   │
│   ├── 01-strategy/                   # 🎯 High-level vision & planning
│   │   ├── README.md                  # Strategy overview
│   │   ├── project-brief.md           # SINGLE source of truth
│   │   ├── product-vision.md          # Long-term product vision
│   │   └── target-audience.md         # User personas & market
│   │
│   ├── 02-requirements/               # 📋 Product requirements
│   │   ├── README.md                  # Requirements overview
│   │   ├── marketing-website-prd.md   # Marketing site (THIS project)
│   │   ├── platform-prd.md            # Full platform (reference only)
│   │   └── conversion-tracking.md     # Analytics requirements
│   │
│   ├── 03-architecture/               # 🏗️ Technical architecture
│   │   ├── README.md                  # Architecture overview
│   │   ├── fullstack-architecture.md  # Complete system design
│   │   ├── frontend-spec.md           # UI/UX specifications
│   │   ├── blog-design-system.md      # Content design patterns
│   │   └── database-schema.md         # Supabase schema
│   │
│   ├── 04-implementation/             # 🛠️ Implementation guides
│   │   ├── README.md                  # Implementation overview
│   │   ├── setup-guide.md             # Environment setup
│   │   ├── development-workflow.md    # Best practices
│   │   ├── stack-guide.md             # Next.js + Supabase + Stripe
│   │   └── component-library.md       # Reusable components
│   │
│   ├── 05-deployment/                 # 🚀 Deployment & operations
│   │   ├── README.md                  # Deployment overview
│   │   ├── deployment-sop.md          # Standard Operating Procedure
│   │   ├── vercel-setup.md            # Vercel configuration
│   │   ├── monitoring.md              # Sentry + analytics
│   │   └── troubleshooting.md         # Common issues & fixes
│   │
│   ├── 06-content/                    # ✍️ Content creation
│   │   ├── README.md                  # Content overview
│   │   ├── blog-article-template.md   # Blog post template
│   │   ├── copywriting-guide.md       # Voice & tone
│   │   └── seo-strategy.md            # SEO best practices
│   │
│   └── 07-archive/                    # 📦 Deprecated/historical
│       ├── README.md                  # Archive index
│       ├── old-prd-versions/          # Previous PRD iterations
│       ├── completed-stories/         # Finished development stories
│       └── deprecated-guides/         # Outdated documentation
│
├── moon-ring-platform/                # 💻 Source code
│   ├── README.md                      # Platform-specific readme
│   ├── docs/                          # Code-adjacent docs only
│   │   ├── API.md                     # API reference
│   │   ├── CONTRIBUTING.md            # Code contribution guide
│   │   └── CHANGELOG.md               # Version history
│   └── [source code...]
│
└── .archive/                          # 🗄️ Old files (git ignored)
    └── [deprecated files]
```

## File Mapping & Actions

### Strategy Documents (01-strategy/)

| Current Location | New Location | Action |
|-----------------|--------------|--------|
| `docs/brief.md` | `docs/01-strategy/project-brief.md` | **KEEP** (consolidate) |
| `docs/strategy/moon_ring_project_brief.md` | **DELETE** | Merge into above |
| N/A | `docs/01-strategy/target-audience.md` | **NEW** (extract from PRD) |

### Requirements Documents (02-requirements/)

| Current Location | New Location | Action |
|-----------------|--------------|--------|
| `docs/prd.md` | `docs/02-requirements/marketing-website-prd.md` | **KEEP** (this is our scope) |
| `docs/moon-ring-project-prd.md` | `docs/02-requirements/platform-prd.md` | **KEEP** (reference only) |
| `docs/prd-moon-ring-social-accountability-platform.md` | **DELETE** | Duplicate of above |
| `docs/conversion-tracking-architecture.md` | `docs/02-requirements/conversion-tracking.md` | **MOVE** |

### Architecture Documents (03-architecture/)

| Current Location | New Location | Action |
|-----------------|--------------|--------|
| `docs/fullstack-architecture.md` | `docs/03-architecture/fullstack-architecture.md` | **MOVE** |
| `docs/front-end-spec.md` | `docs/03-architecture/frontend-spec.md` | **MOVE** |
| N/A | `docs/03-architecture/blog-design-system.md` | **NEW** (extract from frontend-spec) |

### Implementation Documents (04-implementation/)

| Current Location | New Location | Action |
|-----------------|--------------|--------|
| `docs/setup/environment-setup-guide.md` | `docs/04-implementation/setup-guide.md` | **MOVE** |
| `docs/development-best-practices.md` | `docs/04-implementation/development-workflow.md` | **MOVE** |
| `docs/implementation-guide-nextjs-supabase-stripe.md` | `docs/04-implementation/stack-guide.md` | **MOVE** |

### Deployment Documents (05-deployment/)

| Current Location | New Location | Action |
|-----------------|--------------|--------|
| `DEPLOYMENT_SOP.md` | `docs/05-deployment/deployment-sop.md` | **MOVE** |
| `moon-ring-platform/DEPLOYMENT.md` | **DELETE** | Duplicate |
| `moon-ring-platform/VERCEL_DEPLOYMENT.md` | `docs/05-deployment/vercel-setup.md` | **MOVE** |
| `moon-ring-platform/MONITORING.md` | `docs/05-deployment/monitoring.md` | **MOVE** |
| `moon-ring-platform/BUILD_TROUBLESHOOTING.md` | `docs/05-deployment/troubleshooting.md` | **MOVE** |
| `moon-ring-platform/PRE_DEPLOYMENT_SUMMARY.md` | **DELETE** | Outdated |
| `moon-ring-platform/DEPLOY_NOW.md` | **DELETE** | Outdated |

### Content Documents (06-content/)

| Current Location | New Location | Action |
|-----------------|--------------|--------|
| `moon-ring-platform/BLOG_ARTICLE_TEMPLATE.md` | `docs/06-content/blog-article-template.md` | **MOVE** |
| `BLOG_ENHANCEMENT_SUMMARY.md` | **DELETE** | Implementation complete |
| N/A | `docs/06-content/copywriting-guide.md` | **NEW** (extract from frontend-spec) |

### Archive (07-archive/)

| Current Location | New Location | Action |
|-----------------|--------------|--------|
| `docs/stories/*` | `docs/07-archive/completed-stories/` | **MOVE** (all completed) |
| `docs/roadmaps/phase-3-*` | `docs/07-archive/completed-phases/` | **MOVE** (Phase 3 done) |

### Root Level Cleanup

| Current Location | Action | Reason |
|-----------------|--------|---------|
| `README.md` | **KEEP & UPDATE** | Project entry point |
| `CLAUDE.md` | **KEEP** | AI assistant needs root access |
| `AGENTS.md` | **DELETE** | Outdated bmad config |
| `NEXT_STEPS_ASSETS.md` | **DELETE** | Task complete |
| `README_ASSETS.md` | **DELETE** | Merged into platform docs |
| `moon-ring-platform/ARCHITECTURE_IMPROVEMENTS.md` | **DELETE** | Implemented |
| `moon-ring-platform/ASSETS_GUIDE.md` | `docs/06-content/asset-guidelines.md` | **MOVE** |

## Master Index (00-INDEX.md)

Create a navigation hub:

```markdown
# Moon Ring Documentation Index

## Quick Access by Role

### 👨‍💻 **For Developers**
Start here → [Setup Guide](04-implementation/setup-guide.md)
- [Development Workflow](04-implementation/development-workflow.md)
- [Stack Guide (Next.js + Supabase + Stripe)](04-implementation/stack-guide.md)
- [Architecture Overview](03-architecture/fullstack-architecture.md)

### 🎨 **For Designers**
Start here → [Frontend Specification](03-architecture/frontend-spec.md)
- [Blog Design System](03-architecture/blog-design-system.md)
- [Component Library](04-implementation/component-library.md)

### ✍️ **For Content Creators**
Start here → [Content Overview](06-content/README.md)
- [Blog Article Template](06-content/blog-article-template.md)
- [Copywriting Guide](06-content/copywriting-guide.md)
- [SEO Strategy](06-content/seo-strategy.md)

### 🚀 **For DevOps/Deployment**
Start here → [Deployment SOP](05-deployment/deployment-sop.md)
- [Vercel Setup](05-deployment/vercel-setup.md)
- [Monitoring & Alerts](05-deployment/monitoring.md)
- [Troubleshooting](05-deployment/troubleshooting.md)

### 📊 **For Product/Strategy**
Start here → [Project Brief](01-strategy/project-brief.md)
- [Marketing Website PRD](02-requirements/marketing-website-prd.md)
- [Platform PRD](02-requirements/platform-prd.md) (reference)
- [Product Vision](01-strategy/product-vision.md)

## Documentation by Purpose

### 📋 Planning & Strategy
- [01-strategy/](01-strategy/) - Vision, goals, market positioning
- [02-requirements/](02-requirements/) - Product requirements & specs

### 🏗️ Architecture & Design
- [03-architecture/](03-architecture/) - System design, UI/UX, patterns

### 🛠️ Implementation & Development
- [04-implementation/](04-implementation/) - Setup, workflows, guides

### 🚀 Operations & Deployment
- [05-deployment/](05-deployment/) - Deployment, monitoring, ops

### ✍️ Content & Marketing
- [06-content/](06-content/) - Writing, SEO, brand voice

### 📦 Archive
- [07-archive/](07-archive/) - Completed work, deprecated docs
```

## Implementation Steps

1. ✅ Create new directory structure
2. ✅ Move files to new locations
3. ✅ Update internal links in all docs
4. ✅ Create README.md in each section
5. ✅ Create master 00-INDEX.md
6. ✅ Update root README.md with new structure
7. ✅ Update CLAUDE.md with new paths
8. ✅ Delete duplicate/outdated files
9. ✅ Git commit with clear message

## Benefits

### 1. **Clear Information Hierarchy**
- Strategy → Requirements → Architecture → Implementation → Deployment
- Each layer builds on the previous one

### 2. **Single Source of Truth**
- One canonical location for each topic
- No confusion about which document is current

### 3. **Role-Based Navigation**
- Developers, designers, content creators, ops can quickly find relevant docs
- Master index provides multiple entry points

### 4. **Better Context Preservation**
- Related documents grouped together
- Archive preserves history without cluttering active docs

### 5. **Easier Maintenance**
- Clear ownership and scope for each section
- Simple to identify outdated content

## Rollout

**Phase 1** (Today): Create structure, move files, update links
**Phase 2** (This week): Extract new docs (SEO, copywriting, component library)
**Phase 3** (Ongoing): Maintain organization as project evolves
