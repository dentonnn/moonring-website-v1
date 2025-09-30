-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums for various statuses
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE lead_source AS ENUM ('organic', 'paid', 'social', 'referral', 'direct');
CREATE TYPE conversion_stage AS ENUM ('visitor', 'lead', 'trial', 'customer');
CREATE TYPE subscription_status AS ENUM ('active', 'unsubscribed', 'bounced');

-- Leads table for marketing capture
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    source lead_source DEFAULT 'direct',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    referrer_url TEXT,
    landing_page TEXT,
    lead_score INTEGER DEFAULT 0,
    conversion_stage conversion_stage DEFAULT 'visitor',
    gdpr_consent BOOLEAN DEFAULT false,
    gdpr_consent_date TIMESTAMPTZ,
    gdpr_consent_ip INET,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table for ring purchases
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL DEFAULT ('MR-' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0')),
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    product_variant JSONB NOT NULL, -- {size: 'medium', color: 'black'}
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    status order_status DEFAULT 'pending',
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    tracking_number TEXT,
    fulfillment_provider TEXT,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Basic users for demo access
CREATE TABLE basic_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    demo_access_granted_at TIMESTAMPTZ DEFAULT NOW(),
    demo_access_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email subscriptions management
CREATE TABLE email_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscription_types TEXT[] DEFAULT ARRAY['newsletter'],
    status subscription_status DEFAULT 'active',
    unsubscribe_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
    unsubscribed_at TIMESTAMPTZ,
    unsubscribe_reason TEXT,
    bounce_count INTEGER DEFAULT 0,
    last_email_sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics events for conversion tracking
CREATE TABLE conversion_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    visitor_id TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    event_category TEXT,
    event_properties JSONB DEFAULT '{}'::jsonb,
    page_url TEXT,
    referrer_url TEXT,
    user_agent TEXT,
    ip_address INET,
    country_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product inventory tracking
CREATE TABLE product_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT UNIQUE NOT NULL,
    size TEXT NOT NULL,
    color TEXT NOT NULL,
    quantity_available INTEGER DEFAULT 0,
    quantity_reserved INTEGER DEFAULT 0,
    price_cents INTEGER NOT NULL,
    cost_cents INTEGER,
    reorder_level INTEGER DEFAULT 10,
    reorder_quantity INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_size_color UNIQUE (size, color)
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_conversion_stage ON leads(conversion_stage);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_conversion_events_session_id ON conversion_events(session_id);
CREATE INDEX idx_conversion_events_visitor_id ON conversion_events(visitor_id);
CREATE INDEX idx_conversion_events_created_at ON conversion_events(created_at DESC);
CREATE INDEX idx_email_subscriptions_email ON email_subscriptions(email);
CREATE INDEX idx_email_subscriptions_status ON email_subscriptions(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_basic_users_updated_at BEFORE UPDATE ON basic_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_subscriptions_updated_at BEFORE UPDATE ON email_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_inventory_updated_at BEFORE UPDATE ON product_inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE basic_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_inventory ENABLE ROW LEVEL SECURITY;

-- Leads policies (anyone can insert, only admins can read/update/delete)
CREATE POLICY "Anyone can create leads" ON leads
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Only admins can view leads" ON leads
    FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

-- Orders policies (authenticated users can view their own, admins can see all)
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT TO authenticated
    USING (customer_email = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can modify orders" ON orders
    FOR ALL TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

-- Basic users policies (users can read own data)
CREATE POLICY "Users can view own profile" ON basic_users
    FOR SELECT TO authenticated
    USING (id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update own profile" ON basic_users
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Email subscriptions policies
CREATE POLICY "Anyone can subscribe" ON email_subscriptions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Users can manage own subscriptions" ON email_subscriptions
    FOR ALL TO authenticated
    USING (email = auth.jwt() ->> 'email' OR auth.jwt() ->> 'role' = 'admin');

-- Conversion events policies (anyone can insert, only admins can read)
CREATE POLICY "Anyone can track events" ON conversion_events
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Only admins can view analytics" ON conversion_events
    FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

-- Product inventory policies (public read, admin write)
CREATE POLICY "Anyone can view inventory" ON product_inventory
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "Only admins can manage inventory" ON product_inventory
    FOR ALL TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

-- Insert initial product inventory
INSERT INTO product_inventory (sku, size, color, quantity_available, price_cents)
VALUES
    ('MR-SM-BLK', 'small', 'black', 100, 29900),
    ('MR-MD-BLK', 'medium', 'black', 100, 29900),
    ('MR-LG-BLK', 'large', 'black', 100, 29900),
    ('MR-SM-SLV', 'small', 'silver', 100, 29900),
    ('MR-MD-SLV', 'medium', 'silver', 100, 29900),
    ('MR-LG-SLV', 'large', 'silver', 100, 29900),
    ('MR-SM-GLD', 'small', 'gold', 50, 34900),
    ('MR-MD-GLD', 'medium', 'gold', 50, 34900),
    ('MR-LG-GLD', 'large', 'gold', 50, 34900);