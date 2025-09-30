# Moon Ring Platform Implementation Guide
## Next.js 14 + Supabase + Stripe Stack

**Version:** 1.0
**Date:** September 18, 2025
**Stack:** Next.js 14 + Supabase + Stripe
**Author:** Winston the Architect

---

## Architecture Overview

This implementation guide covers the complete setup for Moon Ring's platform using the chosen Next.js 14 + Supabase + Stripe stack, designed to scale from marketing website to full ecommerce platform.

### Core Technology Stack

```typescript
// Technology Stack Overview
├── Frontend & Backend
│   ├── Next.js 14 (App Router)
│   ├── TypeScript (Type Safety)
│   ├── Tailwind CSS (Moon Ring Design System)
│   └── React Server Components
├── Database & Auth
│   ├── Supabase (PostgreSQL + Auth + Real-time)
│   ├── Row Level Security (Multi-tenant)
│   └── Supabase Edge Functions
├── Payments & Commerce
│   ├── Stripe (Subscriptions + Billing)
│   ├── Stripe Customer Portal
│   └── Webhook Handling
├── Deployment & Hosting
│   ├── Vercel (Frontend + Edge Functions)
│   ├── Supabase Cloud (Managed Backend)
│   └── GitHub Actions (CI/CD)
└── Monitoring & Analytics
    ├── Vercel Analytics
    ├── Supabase Dashboard
    ├── Stripe Dashboard
    └── Sentry (Error Tracking)
```

---

## Phase 1: Foundation Setup (Week 1-2)

### 1.1 Project Initialization

**Create Next.js 14 Project with App Router:**
```bash
# Initialize project
npx create-next-app@latest moon-ring-platform \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd moon-ring-platform

# Install core dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install stripe @stripe/stripe-js
npm install @tailwindcss/forms @tailwindcss/typography
npm install clsx tailwind-merge lucide-react

# Install development dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D prettier prettier-plugin-tailwindcss
npm install -D eslint-config-prettier
```

**Project Structure:**
```
moon-ring-platform/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/
│   │   │   ├── account/
│   │   │   ├── billing/
│   │   │   └── dashboard/
│   │   ├── (marketing)/
│   │   │   ├── pricing/
│   │   │   ├── features/
│   │   │   └── about/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── stripe/
│   │   │   └── webhooks/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── marketing/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── stripe/
│   │   ├── auth/
│   │   └── utils/
│   └── types/
└── supabase/
    ├── migrations/
    ├── functions/
    └── config.toml
```

### 1.2 Environment Configuration

**Environment Variables (.env.local):**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://...
```

### 1.3 Supabase Setup

**Initialize Supabase Project:**
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize local development
supabase init
supabase start

# Link to cloud project (after creating on dashboard)
supabase link --project-ref your-project-ref
```

**Core Database Schema (migrations/001_initial_schema.sql):**
```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('inactive', 'trialing', 'active', 'past_due', 'canceled')),
  stripe_customer_id TEXT UNIQUE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW())
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid')),
  price_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW())
);

-- Health goals table (Moon Ring specific)
CREATE TABLE public.health_goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('movement', 'sleep', 'stress', 'recovery')),
  title TEXT NOT NULL,
  description TEXT,
  target_value NUMERIC,
  target_unit TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW())
);

-- Goal progress tracking
CREATE TABLE public.goal_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  goal_id UUID REFERENCES public.health_goals(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW())
);

-- Lead capture table (marketing)
CREATE TABLE public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  source TEXT, -- 'homepage', 'pricing', 'blog', etc.
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW())
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Health goals policies
CREATE POLICY "Users can manage own goals" ON public.health_goals
  FOR ALL USING (auth.uid() = user_id);

-- Goal progress policies
CREATE POLICY "Users can manage own progress" ON public.goal_progress
  FOR ALL USING (auth.uid() = user_id);

-- Leads policies (admin only - no public access)
CREATE POLICY "Service role can manage leads" ON public.leads
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable real-time for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscriptions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.health_goals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.goal_progress;
```

---

## Phase 2: Authentication & User Management (Week 2-3)

### 2.1 Supabase Client Configuration

**Supabase Client Setup (src/lib/supabase/client.ts):**
```typescript
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Server Component Client (src/lib/supabase/server.ts):**
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

**Middleware for Auth (src/middleware.ts):**
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  // Protected routes
  const protectedPaths = ['/dashboard', '/account', '/billing']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### 2.2 Authentication Components

**Auth Context (src/lib/auth/context.tsx):**
```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

**Sign Up Form (src/components/auth/signup-form.tsx):**
```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      if (data.user && !data.session) {
        // Email confirmation required
        router.push('/check-email')
      } else {
        // Auto-signed in
        router.push('/dashboard')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-white">
          Full Name
        </label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
          placeholder="Create a password"
        />
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#FF33BA] to-[#FF9966] hover:opacity-90 transition-opacity"
      >
        {loading ? 'Creating Account...' : 'Start Free Trial'}
      </Button>
    </form>
  )
}
```

---

## Phase 3: Stripe Integration & Billing (Week 3-4)

### 3.1 Stripe Configuration

**Stripe Client Setup (src/lib/stripe/client.ts):**
```typescript
import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}
```

**Stripe Server Setup (src/lib/stripe/server.ts):**
```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Moon Ring Platform',
    version: '1.0.0',
  },
})

// Product and Price IDs (set these in Stripe Dashboard)
export const PRICE_IDS = {
  MONTHLY: 'price_monthly_id',
  ANNUAL: 'price_annual_id',
  CORPORATE: 'price_corporate_id',
} as const

export const PRODUCT_IDS = {
  MOON_RING_PLATFORM: 'prod_moon_ring_platform',
} as const
```

### 3.2 Subscription Management

**Checkout Session API (src/app/api/stripe/checkout/route.ts):**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRICE_IDS } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { priceId, successUrl, cancelUrl } = await request.json()
    const supabase = createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create customer profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email || user.email!,
        metadata: {
          supabase_user_id: user.id,
        },
      })

      customerId = customer.id

      // Update profile with customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          user_id: user.id,
        },
      },
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
      tax_id_collection: {
        enabled: true,
      },
      automatic_tax: {
        enabled: true,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
```

**Customer Portal API (src/app/api/stripe/portal/route.ts):**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { returnUrl } = await request.json()
    const supabase = createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No billing account found' },
        { status: 404 }
      )
    }

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/account/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe portal error:', error)
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
```

### 3.3 Webhook Handling

**Stripe Webhook Handler (src/app/api/webhooks/stripe/route.ts):**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
])

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  if (!relevantEvents.has(event.type)) {
    return NextResponse.json({ received: true })
  }

  const supabase = createClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          )
          await handleSubscriptionChange(supabase, subscription)
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(supabase, subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(supabase, subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          )
          await handleSubscriptionChange(supabase, subscription)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        // Handle failed payment - could send email, update status, etc.
        console.log('Payment failed for invoice:', invoice.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSubscriptionChange(
  supabase: any,
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string

  // Get user ID from customer
  const customer = await stripe.customers.retrieve(customerId)
  if (!customer || customer.deleted) return

  const userId = (customer as Stripe.Customer).metadata.supabase_user_id
  if (!userId) return

  // Update or create subscription record
  const subscriptionData = {
    user_id: userId,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    quantity: subscription.items.data[0].quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    trial_start: subscription.trial_start
      ? new Date(subscription.trial_start * 1000).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? new Date(subscription.trial_end * 1000).toISOString()
      : null,
    updated_at: new Date().toISOString(),
  }

  // Upsert subscription
  await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id'
    })

  // Update profile subscription status
  let profileStatus = 'inactive'
  if (subscription.status === 'active') profileStatus = 'active'
  else if (subscription.status === 'trialing') profileStatus = 'trialing'
  else if (subscription.status === 'past_due') profileStatus = 'past_due'
  else if (subscription.status === 'canceled') profileStatus = 'canceled'

  await supabase
    .from('profiles')
    .update({
      subscription_status: profileStatus,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
}

async function handleSubscriptionDeleted(
  supabase: any,
  subscription: Stripe.Subscription
) {
  // Update subscription record
  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscription.id)

  // Update profile status
  const customerId = subscription.customer as string
  const customer = await stripe.customers.retrieve(customerId)

  if (!customer || customer.deleted) return

  const userId = (customer as Stripe.Customer).metadata.supabase_user_id
  if (!userId) return

  await supabase
    .from('profiles')
    .update({
      subscription_status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
}
```

---

## Phase 4: User Dashboard & Real-time Features (Week 4-5)

### 4.1 Dashboard Layout

**Main Dashboard (src/app/(dashboard)/dashboard/page.tsx):**
```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { GoalsList } from '@/components/dashboard/goals-list'
import { ProgressChart } from '@/components/dashboard/progress-chart'
import { RecentActivity } from '@/components/dashboard/recent-activity'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  // Fetch user data
  const [profileResponse, goalsResponse, subscriptionResponse] = await Promise.all([
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single(),
    supabase
      .from('health_goals')
      .select(`
        *,
        goal_progress (
          value,
          unit,
          recorded_at
        )
      `)
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false }),
    supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle()
  ])

  const profile = profileResponse.data
  const goals = goalsResponse.data || []
  const subscription = subscriptionResponse.data

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B023A] to-[#2D1B69]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-white/60 mt-2">
            Track your health goals and build lasting habits
          </p>
        </div>

        {/* Stats Overview */}
        <DashboardStats goals={goals} subscription={subscription} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Goals & Progress */}
          <div className="lg:col-span-2 space-y-8">
            <GoalsList goals={goals} />
            <ProgressChart goals={goals} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <RecentActivity userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 4.2 Real-time Goal Tracking

**Goals List Component (src/components/dashboard/goals-list.tsx):**
```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/database'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Plus, Target, TrendingUp } from 'lucide-react'

type Goal = Database['public']['Tables']['health_goals']['Row'] & {
  goal_progress: Database['public']['Tables']['goal_progress']['Row'][]
}

interface GoalsListProps {
  goals: Goal[]
}

const CATEGORY_COLORS = {
  movement: 'from-[#F7941D] to-[#FFF200]',
  sleep: 'from-[#52ACFF] to-[#725CFA]',
  stress: 'from-[#FF5A5A] to-[#660000]',
  recovery: 'from-[#2CE6FF] to-[#006699]',
}

export function GoalsList({ goals: initialGoals }: GoalsListProps) {
  const [goals, setGoals] = useState(initialGoals)
  const supabase = createClient()

  useEffect(() => {
    // Subscribe to real-time updates
    const channel = supabase
      .channel('goals-updates')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'health_goals'
        },
        (payload) => {
          console.log('Goal updated:', payload)
          // Refetch goals when changes occur
          refetchGoals()
        }
      )
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'goal_progress'
        },
        (payload) => {
          console.log('Progress updated:', payload)
          refetchGoals()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const refetchGoals = async () => {
    const { data } = await supabase
      .from('health_goals')
      .select(`
        *,
        goal_progress (
          value,
          unit,
          recorded_at
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (data) {
      setGoals(data)
    }
  }

  const calculateProgress = (goal: Goal) => {
    if (!goal.goal_progress.length || !goal.target_value) return 0

    const latestProgress = goal.goal_progress
      .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime())[0]

    return Math.min((latestProgress.value / goal.target_value) * 100, 100)
  }

  const getLatestValue = (goal: Goal) => {
    if (!goal.goal_progress.length) return 0

    const latestProgress = goal.goal_progress
      .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime())[0]

    return latestProgress.value
  }

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Target className="h-5 w-5" />
          Active Goals
        </h2>
        <Button className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No goals yet</h3>
          <p className="text-white/60 mb-4">
            Create your first health goal to start tracking progress
          </p>
          <Button className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] hover:opacity-90">
            Create Your First Goal
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = calculateProgress(goal)
            const currentValue = getLatestValue(goal)

            return (
              <div key={goal.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-white">{goal.title}</h3>
                    <p className="text-sm text-white/60 capitalize">
                      {goal.category} • {goal.description}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[goal.category as keyof typeof CATEGORY_COLORS]} text-white text-xs font-medium`}>
                    {goal.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Progress</span>
                    <span className="text-white">
                      {currentValue} / {goal.target_value} {goal.target_unit}
                    </span>
                  </div>

                  <Progress value={progress} className="h-2">
                    <div
                      className={`h-full bg-gradient-to-r ${CATEGORY_COLORS[goal.category as keyof typeof CATEGORY_COLORS]} rounded-full transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    />
                  </Progress>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/60">
                      {progress.toFixed(1)}% complete
                    </span>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Add Progress
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
```

---

## Phase 5: Marketing Pages & SEO (Week 5-6)

### 5.1 Homepage with Moon Ring Design

**Homepage (src/app/page.tsx):**
```typescript
import { HeroSection } from '@/components/marketing/hero-section'
import { FeaturesSection } from '@/components/marketing/features-section'
import { TestimonialsSection } from '@/components/marketing/testimonials-section'
import { PricingSection } from '@/components/marketing/pricing-section'
import { CtaSection } from '@/components/marketing/cta-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moon Ring - Transform Your Wearable Into Lasting Behavioral Change',
  description: 'Turn your abandoned Apple Watch, Fitbit, or Oura Ring into real behavioral change through social accountability. Join 28M+ users unlocking the potential of their wearables.',
  keywords: [
    'wearable accountability',
    'social fitness tracking',
    'behavior change platform',
    'Apple Watch habits',
    'Fitbit motivation',
    'health goal tracking'
  ],
  openGraph: {
    title: 'Moon Ring - Social Accountability for Wearables',
    description: 'Finally unlock the potential of your wearable device with evidence-based behavioral psychology and social accountability.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moon Ring - Transform Your Wearable Into Lasting Change',
    description: 'Social accountability platform that makes your wearable data drive real behavioral change.',
    images: ['/twitter-image.jpg'],
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1B023A] to-[#2D1B69]">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </main>
  )
}
```

**Hero Section (src/components/marketing/hero-section.tsx):**
```typescript
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Watch, Heart, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FF33BA]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FF9966]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          {/* Announcement Bar */}
          <div className="inline-flex items-center px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Zap className="h-4 w-4 text-[#FFF200] mr-2" />
            <span className="text-sm text-white">
              Join 28M+ users transforming their wearable experience
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Transform Your{' '}
            <span className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] bg-clip-text text-transparent">
              Abandoned Wearable
            </span>{' '}
            Into Lasting Change
          </h1>

          <p className="mt-8 text-xl sm:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Turn your Apple Watch, Fitbit, or Oura Ring into a powerful behavior change machine through{' '}
            <strong className="text-white">social accountability</strong> and evidence-based psychology.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#FF33BA] to-[#FF9966] hover:opacity-90 text-white font-semibold px-8 py-4 text-lg"
            >
              <Link href="/signup">
                Start Free 14-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">65%+</div>
              <div className="text-sm text-white/60">Retention Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">28M+</div>
              <div className="text-sm text-white/60">Target Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">90%+</div>
              <div className="text-sm text-white/60">Goal Achievement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.8/5</div>
              <div className="text-sm text-white/60">User Rating</div>
            </div>
          </div>

          {/* Device Integration Preview */}
          <div className="mt-20">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-6">
                Works with your existing devices
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Apple Watch', icon: Watch, color: 'from-[#52ACFF] to-[#725CFA]' },
                  { name: 'Fitbit', icon: Heart, color: 'from-[#F7941D] to-[#FFF200]' },
                  { name: 'Oura Ring', icon: Zap, color: 'from-[#FF5A5A] to-[#660000]' },
                  { name: 'Garmin', icon: Watch, color: 'from-[#2CE6FF] to-[#006699]' },
                ].map((device) => (
                  <div key={device.name} className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${device.color} rounded-xl flex items-center justify-center`}>
                      <device.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm text-white/80">{device.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 5.2 SEO & Performance Optimization

**Sitemap Generation (src/app/sitemap.ts):**
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://moonring.com'

  // Static pages
  const staticPages = [
    '',
    '/pricing',
    '/features',
    '/about',
    '/blog',
    '/support',
    '/privacy',
    '/terms',
    '/corporate',
  ]

  // Blog posts (fetch from CMS in real implementation)
  const blogPosts = [
    '/blog/wearable-psychology-guide',
    '/blog/social-accountability-science',
    '/blog/fitbit-abandonment-solutions',
  ]

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'daily' : 'weekly' as any,
      priority: path === '' ? 1 : 0.8,
    })),
    ...blogPosts.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as any,
      priority: 0.6,
    })),
  ]
}
```

**Robots.txt (src/app/robots.ts):**
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://moonring.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/account/',
        '/api/',
        '/admin/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

---

## Deployment & Production Checklist

### Environment Setup

**Production Environment Variables:**
```bash
# Production .env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_APP_URL=https://moonring.com
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ... etc for all environment variables
```

### Performance Monitoring Setup

**Sentry Configuration (sentry.client.config.ts):**
```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

This comprehensive implementation guide provides the complete foundation for building Moon Ring's platform with the chosen Next.js 14 + Supabase + Stripe stack. The architecture supports scaling from marketing website to full SaaS platform while maintaining excellent performance and user experience.

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Update Moon Ring architecture documentation with Next.js + Supabase + Stripe stack", "status": "completed", "activeForm": "Updating architecture documentation with the chosen stack"}, {"content": "Create implementation roadmap for the new stack", "status": "completed", "activeForm": "Creating implementation roadmap"}, {"content": "Define database schema for Supabase", "status": "completed", "activeForm": "Defining database schema"}, {"content": "Document API structure and authentication flow", "status": "completed", "activeForm": "Documenting API and auth flow"}, {"content": "Create Stripe integration guide", "status": "completed", "activeForm": "Creating Stripe integration guide"}]