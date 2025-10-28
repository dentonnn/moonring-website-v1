# Moon Ring Website - Asset Inventory

**Last Updated:** October 4, 2025
**Source Directory:** `/Users/dentonsmacbookair/Desktop/Yuliverse/Moon Ring/Website 3`
**Total Assets Organized:** 18 files across 5 categories

---

## Directory Structure

```
public/
├── favicon-16.png              # 16x16 favicon
├── favicon-32.png              # 32x32 favicon
├── favicon-192.png             # 192x192 favicon (PWA)
├── favicon-512.png             # 512x512 favicon (PWA)
├── apple-touch-icon.png        # 180x180 Apple touch icon
└── images/
    ├── logos/                  # Brand logos (5 files)
    ├── hero/                   # Hero section images (5 files)
    ├── product/                # Product photography (4 files)
    ├── og-images/              # Open Graph social images (1 file)
    ├── blog/                   # Blog featured images (empty - needs content)
    ├── team/                   # Team member photos (empty - needs content)
    ├── app/                    # App mockups/screenshots (empty - needs content)
    ├── brand/                  # Additional brand assets (empty)
    └── research/               # Research page images (empty)
```

---

## Logo Assets (`public/images/logos/`)

**5 files | Total size: ~1.1MB**

| Filename | Purpose | Dimensions | Size | Use Case |
|----------|---------|------------|------|----------|
| `moonring-logo-white.png` | White logo on dark backgrounds | 512x512 | 40KB | Navigation on hero section, dark mode |
| `moonring-logo-black.png` | Black logo on light backgrounds | 512x512 | 40KB | Navigation scrolled state, light sections |
| `moonring-logo-transparent.png` | Logo with transparency | 512x512 | 304KB | General purpose, flexible placement |
| `moonring-logo-social.png` | Social media profile image | 1200x1200 | 432KB | Twitter, LinkedIn, Facebook profiles |
| `moonring-logotype-full.png` | Full logotype with text | 2048x768 | 276KB | Email headers, press materials |

**Source:** `Brand Kit V3 copy/V4 MoonRing Logo/`

---

## Hero Images (`public/images/hero/`)

**5 files | Total size: ~1.2MB**

| Filename | Purpose | Dimensions | Size | Use Case |
|----------|---------|------------|------|----------|
| `hero-01.jpg` | Primary hero background | 1920x1080 | 296KB | Homepage hero section |
| `hero-02.jpg` | Alternative hero option | 1920x1080 | 200KB | About page, alternate homepage |
| `hero-03.jpg` | Secondary hero variation | 1920x1080 | 320KB | Features section background |
| `hero-04.jpg` | Tertiary hero variation | 1920x1080 | 240KB | Pricing/conversion sections |
| `ecosystem-diagram.png` | Moon Ring ecosystem overview | 800x450 | 132KB | How It Works section, About page |

**Optimized:** Original 4K images (3840x2160) resized to 1920x1080 for web performance
**Source:** `Moon Ring Key Visual/`

---

## Product Images (`public/images/product/`)

**4 files | Total size: ~1.5MB**

| Filename | Purpose | Dimensions | Size | Use Case |
|----------|---------|------------|------|----------|
| `ring-product-hero.png` | Ring with gradient background | 1200x900 | 724KB | Product showcase section |
| `ring-packaging.jpg` | Ring in packaging/unboxing | 1200x900 | 368KB | Purchase flow, product details |
| `ring-render-01.png` | Clean ring render (angle 1) | 512x512 | 128KB | Feature callouts, icons |
| `ring-render-02.png` | Clean ring render (angle 2) | 512x512 | 260KB | Gallery, product carousel |

**Optimized:** Large images resized to 1200px max width
**Source:** `Moon Ring Key Visual/Ring Hardware Key Visual/`

---

## Open Graph Images (`public/images/og-images/`)

**1 file | Total size: 432KB**

| Filename | Purpose | Dimensions | Size | Use Case |
|----------|---------|------------|------|----------|
| `og-default.png` | Default social share image | 1200x630 | 432KB | Facebook, Twitter, LinkedIn previews |

**Note:** Create page-specific OG images for blog posts, landing pages
**Source:** Generated from `moonring-logo-social.png`

---

## Favicon Package (`public/`)

**5 files | Total size: ~80KB**

| Filename | Size | Purpose |
|----------|------|---------|
| `favicon-16.png` | 16x16 | Browser tab (small) |
| `favicon-32.png` | 32x32 | Browser tab (standard) |
| `favicon-192.png` | 192x192 | PWA icon, Android home screen |
| `favicon-512.png` | 512x512 | PWA icon, splash screen |
| `apple-touch-icon.png` | 180x180 | iOS home screen icon |

**Generated from:** `moonring-logo-transparent.png`

---

## Assets Still Needed

### High Priority (Week 1)
- [ ] **Blog Featured Images** (6 images) - `public/images/blog/`
  - Suggested topics: fitness motivation, wearable tech, social accountability
  - Target: 1200x630px, <150KB each
  - Sources: Unsplash, Pexels, or AI-generated (Midjourney)

- [ ] **Team Photos** (3-5 images) - `public/images/team/`
  - Founder/team member headshots
  - Target: 400x400px circular crops, <100KB each
  - Options: Real photos or AI-generated professional headshots

- [ ] **App Mockups** (4 images) - `public/images/app/`
  - Moon Ring app interface screenshots
  - Target: iPhone/Android mockups, 800x1600px
  - Tools: Figma mockups or screenshot from similar apps

### Medium Priority (Week 2)
- [ ] **Research/Stats Graphics** - `public/images/research/`
  - Data visualization for behavioral psychology stats
  - Infographics for accountability research
  - Target: 800x600px, <200KB each

- [ ] **Additional Brand Assets** - `public/images/brand/`
  - Brand pattern/texture backgrounds
  - Gradient overlays matching brand colors
  - Icon set for feature highlights

### Low Priority (Future)
- [ ] Video assets (testimonials, product demos)
- [ ] Animation assets (Lottie files for loading states)
- [ ] Downloadable press kit

---

## Image Optimization Guidelines

**All images should meet these criteria:**

1. **Format:**
   - Use WebP for best compression (Next.js Image component handles conversion)
   - Keep PNG originals for logos/graphics with transparency
   - JPG for photographic content

2. **Size Limits:**
   - Hero images: <300KB each
   - Product images: <400KB each
   - Blog featured images: <150KB each
   - Logos/icons: <100KB each
   - OG images: <200KB each

3. **Dimensions:**
   - Hero images: 1920x1080px (landscape)
   - Product images: 1200x900px or square 1000x1000px
   - Blog images: 1200x630px (OG ratio)
   - Team photos: 400x400px (square)
   - Logos: 512x512px minimum for scalability

4. **Accessibility:**
   - Always provide descriptive alt text
   - Use high contrast for text overlays
   - Test on retina displays (2x scaling)

---

## Implementation Checklist

- [x] Logo assets copied and renamed
- [x] Hero images optimized (resized from 4K to 1080p)
- [x] Product images resized and organized
- [x] Favicon package generated (5 sizes)
- [x] Default OG image created
- [ ] Update Navigation component to use new logo paths
- [ ] Update homepage hero to use optimized hero images
- [ ] Add product images to product showcase section
- [ ] Configure OG metadata in layout.tsx
- [ ] Create blog featured image placeholders
- [ ] Add team photos to About page
- [ ] Generate app mockups for features section

---

## Notes

- **Source files preserved:** Original high-res files remain in `/Users/dentonsmacbookair/Desktop/Yuliverse/Moon Ring/Website 3`
- **Next.js Image Optimization:** Next.js automatically serves WebP where supported via `next/image` component
- **Lazy Loading:** Use `loading="lazy"` for below-fold images to improve LCP
- **Brand Colors:** Primary gradient #FF33BA → #FF9966 should be used consistently across all new assets

---

## Quick Reference: Image Paths

```typescript
// Logos
/images/logos/moonring-logo-white.png
/images/logos/moonring-logo-black.png
/images/logos/moonring-logo-transparent.png

// Hero
/images/hero/hero-01.jpg
/images/hero/hero-02.jpg
/images/hero/ecosystem-diagram.png

// Product
/images/product/ring-product-hero.png
/images/product/ring-render-01.png

// OG Images
/images/og-images/og-default.png

// Favicons
/favicon-192.png
/apple-touch-icon.png
```

---

**Asset Organization Completed:** October 4, 2025
**Ready for Development:** Yes ✓
**Next Steps:** Begin component integration and create remaining placeholder content
