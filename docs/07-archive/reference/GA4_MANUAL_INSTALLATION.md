# Manual GA4 Installation (Alternative Approach)

**Note**: This approach is **not recommended**. We're using `@next/third-parties/google` which provides the same functionality with better performance and maintainability. This document is for reference only.

## Why Manual Installation is Inferior

| Feature | @next/third-parties | Manual Script |
|---------|---------------------|---------------|
| Performance | Optimized with Next.js Script | Blocks rendering |
| Cookie Consent | Built-in wrapper | Manual implementation |
| TypeScript | Fully typed | No types |
| Maintenance | One line of code | Complex logic |
| Testing | Easy to mock | Harder to test |

## If You Still Want Manual Installation

### Step 1: Create GA4 Script Component

```tsx
// src/components/ManualGA4.tsx
'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { hasAnalyticsConsent } from '@/lib/analytics/consent'

export default function ManualGA4() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    setHasConsent(hasAnalyticsConsent())
  }, [])

  if (!hasConsent || !process.env.NEXT_PUBLIC_GA_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </>
  )
}
```

### Step 2: Add to Layout

```tsx
// src/app/layout.tsx
import ManualGA4 from '@/components/ManualGA4'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ManualGA4 />
      </body>
    </html>
  )
}
```

### Step 3: Why This is Worse

1. **More Code**: 30 lines vs 1 line
2. **Performance**: `Script` component adds overhead
3. **Maintainability**: Need to update if Google changes script
4. **TypeScript**: Need to add `window.dataLayer` types manually
5. **Testing**: Harder to mock in unit tests

## Recommendation

**Use `@next/third-parties/google` instead** (what we've already implemented):

```tsx
// Simple, optimized, maintained by Next.js team
import { GoogleAnalytics } from '@next/third-parties/google'

<GoogleAnalytics gaId="G-VBS0BTY1RK" />
```

Same functionality, better implementation.
