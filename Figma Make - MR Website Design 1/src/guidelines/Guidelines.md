MOON RING WEBSITE - FIGMA MAKE GUIDELINES

  System Guidelines

  General Rules

  - Behavioral Psychology First: Every design
  element must demonstrate commitment
  psychology through visual design, not
  explanation. Show social accountability and
  commitment formation through interactions,
  animations, and visual metaphors.
  - Mobile-First Responsive: Start with mobile
   layout (320px) and scale up. Use flexbox
  and CSS Grid for layouts. Absolute
  positioning only for decorative elements or
  overlays.
  - Conversion-Optimized Structure: Each
  section must have a clear conversion goal
  leading users toward trial signup. Remove
  friction at every step.
  - Glass-Morphism Consistency: Apply glass
  effects consistently: background: 
  rgba(255,255,255,0.08), backdrop-filter: 
  blur(20px), border: 1px solid 
  rgba(255,255,255,0.1)
  - Performance Priority: Keep sections
  modular and lightweight. Lazy load images.
  Use CSS transforms for animations (never
  animate width/height).
  - Accessibility Standards: Maintain WCAG AA
  compliance. All interactive elements need
  4.5:1 contrast ratio and 48px touch targets
  on mobile.

  Layout Principles

  - Maximum container width: 1280px with auto
  margins for centering
  - Section vertical spacing: 80px on desktop,
   60px on tablet, 40px on mobile
  - Component spacing: 48px between major
  components, 24px between related elements
  - Padding: 48px horizontal on desktop, 32px
  tablet, 24px mobile
  - Use CSS Grid for complex layouts, Flexbox
  for component-level layouts
  - Never use more than 3 columns on tablet,
  single column on mobile

  ---
  Design System Guidelines

  Color System

  - Primary Action Color: Always use
  pink-to-orange gradient
  linear-gradient(135deg, #FF33BA 0%, #FF9966 
  100%) for primary CTAs
  - Background Gradients: Deep purple gradient
   linear-gradient(180deg, #1B023A 0%, #2D1B69
   100%) for dark sections
  - Health Category Colors:
    - Sleep: Always use #52ACFF to #725CFA
  gradient
    - Movement: Always use #F7941D to #FFF200
  gradient
    - Stress: Always use #FF5A5A to #660000
  gradient
    - Recovery: Always use #2CE6FF to #006699
  gradient
  - Text on Dark: Pure white #FFFFFF for
  headlines, rgba(255,255,255,0.8) for body
  text
  - Text on Light: Deep purple #1B023A for
  headlines, rgba(27,2,58,0.7) for body text

  Typography

  - Base font-size: 16px (1rem) for optimal
  mobile readability
  - Font family: Inter (load variable font for
   performance)
  - Headlines scale: H1 clamp(32px, 8vw, 
  56px), H2 clamp(24px, 6vw, 40px), H3
  clamp(20px, 5vw, 28px)
  - Body text: 16px on mobile, 18px on desktop
  - Line heights: Headlines 1.1-1.2, Body text
   1.5-1.6
  - Always use semibold (600) or bold (700)
  for headlines, regular (400) for body
  - Commitment-related terms should always be
  highlighted with pink color #FF33BA

  Spacing & Grid

  - Use 8px base unit for all spacing (8, 16,
  24, 32, 48, 64, 80)
  - Mobile grid: 4 columns with 16px gutters
  - Tablet grid: 8 columns with 24px gutters
  - Desktop grid: 12 columns with 32px gutters
  - Card padding: Always 24px on mobile, 32px
  on desktop
  - Never use spacing smaller than 8px between
   interactive elements

  ---
  Component Guidelines

  Buttons

  Primary Button (Conversion CTAs)
  - Purpose: Drive trial signups and primary
  conversions
  - Visual Style: Pink-orange gradient
  background, white text, no border
  - Size: Minimum 320px width on mobile, 56px
  height always
  - Border Radius: Full rounded (28px for 56px
   height)
  - Hover: Scale to 1.05, add glow effect
  box-shadow: 0 8px 32px rgba(255,51,186,0.3)
  - Text: Always action-oriented ("Start Free
  Trial", "Create Commitment")
  - Usage: Maximum one primary button per
  viewport

  Secondary Button (Exploration CTAs)
  - Purpose: Encourage exploration without
  commitment
  - Visual Style: Transparent background, pink
   border (2px), pink text
  - Size: Fit-content width with 32px
  horizontal padding, 48px height
  - Hover: Fill with pink gradient, text
  becomes white
  - Text: Curiosity-driven ("See Psychology in
   Action", "Watch Demo")
  - Usage: Can appear alongside primary button
   for alternative paths

  Text Links
  - Purpose: Tertiary actions and navigation
  - Visual Style: Pink text #FF33BA, no
  underline default, underline on hover
  - Size: Inherit font size, 44px touch target
   on mobile
  - Usage: "Learn more" links, footer
  navigation, help text

  Cards

  Glass-Morphism Cards (Primary)
  - Background: rgba(255,255,255,0.08) on dark
   backgrounds
  - Backdrop Filter: blur(20px) with
  -webkit-backdrop-filter fallback
  - Border: 1px solid rgba(255,255,255,0.1)
  - Border Radius: 16px for standard cards,
  24px for featured cards
  - Padding: 24px on mobile, 32px on desktop
  - Shadow: 0 8px 32px rgba(0,0,0,0.1)
  - Hover: Lift effect translateY(-4px) and
  enhanced shadow

  Success Story Cards
  - Must include: User avatar (anonymized),
  commitment streak number, category badge
  - Quote should emphasize behavioral change,
  not features
  - Always show accountability element ("with
  partner Sarah", "rescued 3 times")
  - Progress metrics use category-appropriate
  colors

  Commitment Demo Cards
  - Health category cards: Always 160x120px
  with category gradient
  - Include relevant icon (moon for sleep,
  runner for movement, etc.)
  - Hover state: Glow effect with category
  color
  - Selected state: Scale to 1.1 with stronger
   glow

  Forms

  Input Fields
  - Height: 56px for optimal touch targets
  - Background: Glass-morphism style on dark
  backgrounds, light gray #F5F5F5 on white
  - Border: 2px transparent default, pink on
  focus
  - Border Radius: 12px
  - Padding: 16px horizontal
  - Placeholder: Always include helpful
  placeholder text
  - Icons: Place icons inside field on left
  side (email, lock, user icons)

  Form Validation
  - Success: Green checkmark icon appears on
  right side
  - Error: Red border with shake animation,
  error text below
  - Loading: Pink gradient shimmer across
  field
  - Always provide inline validation, not just
   on submit

  Navigation

  Header Navigation
  - Height: 72px fixed
  - Background: Transparent initially,
  glass-morphism after 100px scroll
  - Logo: Left side, always links to top of
  page
  - Menu Items: Center on desktop, hamburger
  on mobile/tablet
  - CTAs: Right side, "Sign In" secondary,
  "Start Trial" primary
  - Mobile Menu: Full-screen overlay with
  glass-morphism background

  Mobile Hamburger
  - Size: 48x48px touch target
  - Icon: Three lines, 24px wide, transform to
   X on open
  - Animation: Top and bottom lines rotate to
  form X, middle line fades

  Content Sections

  Hero Section
  - Always full viewport height on desktop,
  minimum 600px mobile
  - Background: Deep purple gradient, can add
  subtle geometric patterns
  - Content: Centered with max-width 800px for
   readability
  - Must include: Headline, subtext, dual
  CTAs, social proof elements
  - App mockup: iPhone 15 Pro frame with
  glass-morphism UI preview

  Demo Section
  - Background: White or light gray #F8F9FA
  - 3-step flow: Each step clearly numbered
  and separated
  - Interactive elements: Make it feel
  clickable even if static
  - Progress indicator: Show steps 1-2-3 with
  connecting line

  Social Proof Section
  - Testimonials: Real quotes emphasizing
  behavioral psychology
  - Metrics: Large numbers with animation
  potential (counter effect)
  - Trust badges: HIPAA, success rate, user
  rating
  - Community indicators: Avatar groups
  showing active users

  ---
  Interaction Guidelines

  Animations

  - Duration: 300ms for micro-interactions,
  600ms for section transitions
  - Easing: Use cubic-bezier(0.4, 0, 0.2, 1)
  for smooth feel
  - Scroll animations: Fade in with
  translateY(20px) to translateY(0)
  - Never animate properties other than
  transform and opacity
  - Respect prefers-reduced-motion media query

  Hover States

  - Buttons: Scale and glow effect
  - Cards: Lift with shadow enhancement
  - Links: Color transition and underline
  - Always provide hover feedback within 100ms

  Loading States

  - Skeleton screens for content areas
  - Pink gradient shimmer for loading
  indication
  - Maintain layout to prevent content shift
  - Show progress for multi-step processes

  ---
  Mobile-Specific Guidelines

  - Touch targets: Minimum 48x48px, 8px
  spacing between targets
  - Swipe gestures: Support horizontal swipe
  for carousels
  - Scrolling: Use momentum scrolling, hide
  scrollbars
  - Forms: Show appropriate keyboard (email,
  number)
  - Navigation: Fixed bottom bar for primary
  actions
  - Images: Use responsive images with 2x for
  retina
  - Font sizes: Never smaller than 14px on
  mobile

  ---
  Performance Guidelines

  - Images: WebP format with PNG fallback,
  lazy load below fold
  - Fonts: Preload Inter variable font, use
  font-display: swap
  - CSS: Critical CSS inline, rest async
  - Animations: GPU-accelerated only
  (transform, opacity)
  - JavaScript: Minimal, defer non-critical
  scripts
  - Target metrics: LCP <2.5s, FID <100ms, CLS
   <0.1

  ---
  Content Guidelines

  Headlines

  - Lead with transformation, not features
  - Use "you/your" language for personal
  connection
  - Keep under 10 words for mobile readability
  - Always include emotional or aspirational
  element

  Body Copy

  - 2-3 lines maximum per paragraph
  - Use commitment psychology terminology
  consistently
  - Emphasize social accountability over
  individual effort
  - Include specific numbers and timeframes

  CTAs

  - Start with action verb
  - Create urgency without being pushy
  - Reference community momentum
  - Test variations: "Start Free Trial" vs
  "Join 28,000+ Users"