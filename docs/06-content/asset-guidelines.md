# Moon Ring Asset Management Guide

## Directory Structure

```
public/
├── images/
│   ├── brand/          # Logos, brand assets
│   ├── blog/           # Blog post featured images
│   ├── hero/           # Above-the-fold hero renders
│   ├── team/           # Team member photos
│   ├── app/            # App screenshots, mockups
│   ├── product/        # Hardware renders and packaging shots
│   ├── testimonials/   # Stylised customer illustrations
│   └── research/       # Research-related imagery
├── favicon.ico         # Browser favicon
├── apple-touch-icon.png
├── og-image.png        # Open Graph / social sharing
└── robots.txt
```

## Asset Requirements by Type

### 1. Brand Assets

**Logo (SVG recommended)**
- `images/brand/logo.svg` - Full color logo
- `images/brand/logo-white.svg` - White version for dark backgrounds
- `images/brand/icon.svg` - Icon only (for favicons, app icons)

**Favicon Set**
- `favicon.ico` (32x32, 16x16 multi-resolution)
- `apple-touch-icon.png` (180x180)
- `icon-192.png` (192x192) for PWA
- `icon-512.png` (512x512) for PWA

**Social Sharing**
- `og-image.png` (1200x630) - Open Graph image for social media
- Should include logo + tagline on branded background

### 2. Blog Assets

**Featured Images** (`images/blog/`)
- Dimensions: 1200x630px (16:9 aspect ratio)
- Format: WebP with JPG fallback
- File size: <200KB optimized
- Naming: Use slug format (e.g., `why-wearables-fail.webp`)

**Current placeholders to replace:**
- `/placeholder-blog-1.jpg` → `/images/blog/why-wearables-fail.webp`
- `/placeholder-blog-2.jpg` → `/images/blog/commitment-contracts.webp`
- `/placeholder-blog-3.jpg` → `/images/blog/accountability-partners.webp`
- `/placeholder-blog-4.jpg` → `/images/blog/behavioral-economics.webp`
- `/placeholder-blog-5.jpg` → `/images/blog/social-rescue.webp`
- `/placeholder-blog-6.jpg` → `/images/blog/corporate-wellness.webp`

### 3. Team Photos

**Requirements** (`images/team/`)
- Dimensions: 400x400px (1:1 square)
- Format: WebP with JPG fallback
- Professional headshots with consistent lighting/background
- File size: <100KB each
- Naming: `firstname-lastname.webp`

**Team members to photograph:**
- Alex Chen (Founder & CEO)
- Dr. Sarah Mitchell (Head of Behavioral Science)
- Jordan Rivera (Head of Engineering)

### 4. Hero & Product Imagery

**Hero Section** (`images/hero/`)
- `hero-main.webp` – Optimised (1920px) hero render used on homepage (priority image)
- `hero-main.avif` – High-efficiency variant (served automatically by Next.js when supported)
- Source PNG retained in `images/product/` (`ring-product-hero.png`) for future edits

**Usage Notes**
- Always load through `next/image`
- Include descriptive alt text (e.g., “Moon Ring smart ring resting on illuminated charging stand”)
- Use `sizes="(max-width: 1024px) 75vw, 480px"` to keep responsive

### 5. App Screenshots

**Hero Section** (`images/app/`)
- `hero-mockup.png` - Main app screenshot (750x1334, iPhone aspect)
- `dashboard.png` - Dashboard view
- `commitment-creation.png` - Commitment creation flow
- `partner-matching.png` - Partner matching screen

**Dimensions:**
- Mobile: 750x1334 (iPhone 8 Plus size for retina)
- Desktop: 2880x1800 (MacBook Pro Retina)
- Format: PNG with transparency for mockups

### 6. Testimonials & Illustrations

**Testimonial Portraits** (`images/testimonials/`)
- SVG illustrations in Moon Ring palette (e.g., `sarah-chen.svg`)
- Accessible `title` and `desc` metadata embedded for screen readers
- Use with `next/image` `fill` mode inside rounded container (48px or 64px)
- Update/expand set as new testimonials are published

### 7. Research & Illustrations

**Research Library** (`images/research/`)
- Abstract scientific imagery
- Graphs and data visualizations
- Psychology-related illustrations

## Using Next.js Image Component

### Basic Usage

```tsx
import Image from 'next/image'

// Static import (recommended)
import heroImage from '@/public/images/app/hero-mockup.png'

export default function Hero() {
  return (
    <Image
      src={heroImage}
      alt="Moon Ring app interface"
      width={750}
      height={1334}
      priority // Load immediately (above fold)
      placeholder="blur" // Automatic blur-up
    />
  )
}
```

### Dynamic Images (Blog Posts)

```tsx
<Image
  src={`/images/blog/${post.slug}.webp`}
  alt={post.title}
  width={1200}
  height={630}
  className="rounded-3xl"
/>
```

### Responsive Images

```tsx
<Image
  src="/images/team/alex-chen.webp"
  alt="Alex Chen headshot"
  width={400}
  height={400}
  sizes="(max-width: 768px) 100vw, 400px"
  className="rounded-full"
/>
```

## Asset Optimization

### Before Adding to Project

1. **Compress Images**
   - Use [TinyPNG](https://tinypng.com) for PNG/JPG
   - Use [Squoosh](https://squoosh.app) for WebP conversion
   - Target: <200KB for hero images, <100KB for thumbnails

2. **Convert to Modern Formats**
   - Primary: WebP (90% smaller, modern browser support)
   - Fallback: JPG/PNG for older browsers

3. **Size Appropriately**
   - Don't upload 4K images for 400px displays
   - Use 2x resolution for retina (e.g., 800px for 400px display)

### Automated Optimization (Optional)

Install image optimization tools:

```bash
npm install -D @next/bundle-analyzer
npm install sharp # Automatic optimization
```

## Cloud Storage Options (Recommended for Production)

### Option 1: Cloudinary (Recommended)
- Free tier: 25GB storage, 25GB bandwidth
- Automatic WebP conversion
- On-the-fly resizing and optimization
- CDN included

```tsx
// Example Cloudinary URL
<Image
  src="https://res.cloudinary.com/moonring/image/upload/v1/blog/why-wearables-fail.webp"
  width={1200}
  height={630}
  alt="Blog post image"
/>
```

### Option 2: Vercel Blob Storage
- Integrated with Vercel hosting
- Automatic optimization
- Pay per GB

### Option 3: AWS S3 + CloudFront
- Most scalable
- Requires more setup
- Best for enterprise

## Asset Sources

### Free Stock Photos
- [Unsplash](https://unsplash.com) - High quality, free license
- [Pexels](https://pexels.com) - Free stock photos
- [Burst by Shopify](https://burst.shopify.com)

### Design Tools
- **Figma** - Design mockups, export assets
- **Canva Pro** - Blog featured images, social graphics
- **Photopea** - Free Photoshop alternative (browser-based)

### AI-Generated Images (Optional)
- **Midjourney** - Abstract concepts, illustrations
- **DALL-E 3** - Custom imagery for blog posts
- **Stable Diffusion** - Open source alternative

## Implementation Checklist

- [ ] Create logo set (SVG + PNG variations)
- [ ] Generate favicon set (ico, apple-touch-icon, etc.)
- [ ] Design Open Graph image for social sharing
- [ ] Source/create 6 blog featured images
- [ ] Take/source 3 team headshots
- [ ] Create/screenshot 4 app mockups
- [ ] Optimize all images (<200KB)
- [ ] Convert to WebP format
- [ ] Update image paths in code
- [ ] Test on mobile and desktop
- [ ] Verify loading performance (Lighthouse)
- [ ] Set up Cloudinary or CDN (optional)

## Quick Start: Add Your First Image

1. **Place image in public folder:**
   ```bash
   cp my-logo.svg public/images/brand/logo.svg
   ```

2. **Update component:**
   ```tsx
   import Image from 'next/image'

   <Image
     src="/images/brand/logo.svg"
     alt="Moon Ring Logo"
     width={120}
     height={40}
   />
   ```

3. **Verify in browser:**
   Navigate to `http://localhost:3004` and check DevTools Network tab

## Performance Targets

- **First Contentful Paint**: <1.8s
- **Largest Contentful Paint**: <2.5s
- **Total Image Weight**: <1MB per page
- **Core Web Vitals**: Green scores in Lighthouse

## Need Help?

- [Next.js Image Documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [WebP Converter Tool](https://squoosh.app)
- [Cloudinary Setup Guide](https://cloudinary.com/documentation)
