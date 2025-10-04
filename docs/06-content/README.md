# Content & Marketing

This section contains templates, guidelines, and best practices for creating marketing content.

## Documents

### [Blog Article Template](blog-article-template.md)
**Purpose**: Complete template for creating blog articles with visual elements

**Covers**: Article structure, visual components (stats boxes, callouts, tables, quotes), color palette, SEO metadata

**When to read**: Before writing any blog content

### [Asset Guidelines](asset-guidelines.md)
**Purpose**: Guidelines for images, videos, and brand assets

**Covers**: Image optimization, file formats, naming conventions, brand consistency

**When to read**: Before adding images or creating visual assets

---

## Quick Start for Content Creators

### Writing a Blog Article

1. **Copy the template** → [blog-article-template.md](blog-article-template.md)
2. **Follow the 10-section structure**:
   - Opening Hook → Main Concept → Comparison → Example → Research → Strategies → Mistakes → Moon Ring → Action Plan
3. **Add visual elements**:
   - 2-3 stats boxes for key numbers
   - 2-4 callout boxes for insights
   - 1-2 comparison tables
   - 2-3 pull quotes
4. **Use the color palette**:
   - Red for problems/warnings
   - Blue for research
   - Green for success/solutions
   - Pink (brand) for insights
5. **Check the article checklist** before publishing

### Adding to the Website

Blog articles are currently hardcoded in `/moon-ring-platform/src/app/blog/[slug]/page.tsx`.

To add a new article:
1. Add entry to the `posts` object in `page.tsx`
2. Add entry to blog listing in `/blog/page.tsx`
3. Use the visual element HTML from the template
4. Test locally to ensure tables/boxes render correctly

---

## Blog Design System

### Visual Components

1. **Stats Boxes** - Large numbers highlighting research findings
2. **Callout Boxes** - Key insights and takeaways
3. **Comparison Tables** - Bad vs. Good, Before vs. After
4. **Pull Quotes** - Memorable, tweet-worthy moments
5. **Section Dividers** - Visual breaks between major sections
6. **Multi-Metric Stats** - Multiple related statistics grouped together

### Color Coding by Context

| Context | Use Case | Gradient Colors |
|---------|----------|-----------------|
| **Warning/Problem** | Shocking stats, problems | Red → Orange |
| **Research** | Academic findings, studies | Blue → Purple |
| **Success** | Improvements, solutions | Green → Blue |
| **Brand Insight** | Key takeaways, insights | Pink → Orange |

### Article Metrics

- **Word count**: 1,800-2,500 words
- **Reading time**: 6-8 minutes
- **Visual elements**: 8-12 total
- **Sections**: 8-12 major headings

---

## Content Strategy

### Category Distribution

- **Behavioral Psychology** (60%) - Core content pillar
- **Research** (20%) - Deep dives and academic content
- **Success Stories** (10%) - Social proof and testimonials
- **Platform Features** (5%) - Product education
- **Corporate Wellness** (5%) - B2B content

### SEO Best Practices

- Include target keyword in title and H2s
- Write compelling meta descriptions (2-3 sentences)
- Use internal linking to related articles
- Optimize images with alt text
- Create shareable pull quotes for social media

---

## Brand Voice & Tone

### Characteristics

- **Evidence-based**: Back claims with research
- **Conversational**: Write like you're explaining to a friend
- **Empowering**: Focus on solutions, not just problems
- **Psychology-first**: Emphasize behavioral science over features

### Writing Guidelines

✅ **Do**:
- Use "you" to address readers directly
- Include specific examples and stories
- Cite research sources
- Write in short paragraphs (2-4 sentences)
- Use subheadings every 3-4 paragraphs

❌ **Avoid**:
- Corporate jargon or buzzwords
- Unsubstantiated claims
- Overly academic language
- Wall-of-text paragraphs
- Feature lists without context

---

## Asset Management

### Images

**For blog posts**:
- Placeholder images used currently
- Future: Add hero images (1200x630px)
- Format: WebP for performance
- Naming: `blog-[slug]-hero.webp`

**See**: [Asset Guidelines](asset-guidelines.md) for complete specifications

### Brand Assets

- Logo variants
- Color palette
- Typography
- Icon library

**Location**: `/moon-ring-platform/public/`

---

## Quality Checklist

Before publishing any blog article:

- [ ] Follows 10-section structure
- [ ] Includes 8-12 visual elements
- [ ] Uses appropriate color coding
- [ ] All research cited
- [ ] Includes pull quotes (2-3)
- [ ] Has clear CTA at end
- [ ] Tested on mobile
- [ ] Links work correctly
- [ ] SEO metadata complete
- [ ] Passes readability test

---

## Related Documentation

- [Frontend Spec - Blog Design System](../03-architecture/frontend-spec.md#10-blog-article-design-system) - Technical specs
- [Project Brief](../01-strategy/project-brief.md) - Brand positioning
- [Marketing Website PRD](../02-requirements/marketing-website-prd.md) - Content requirements
