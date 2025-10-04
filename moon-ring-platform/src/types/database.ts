export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          email: string
          name: string | null
          source: 'organic' | 'paid' | 'social' | 'referral' | 'direct'
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_term: string | null
          utm_content: string | null
          referrer_url: string | null
          landing_page: string | null
          lead_score: number
          conversion_stage: 'visitor' | 'lead' | 'trial' | 'customer'
          gdpr_consent: boolean
          gdpr_consent_date: string | null
          gdpr_consent_ip: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          source?: 'organic' | 'paid' | 'social' | 'referral' | 'direct'
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_term?: string | null
          utm_content?: string | null
          referrer_url?: string | null
          landing_page?: string | null
          lead_score?: number
          conversion_stage?: 'visitor' | 'lead' | 'trial' | 'customer'
          gdpr_consent?: boolean
          gdpr_consent_date?: string | null
          gdpr_consent_ip?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          source?: 'organic' | 'paid' | 'social' | 'referral' | 'direct'
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_term?: string | null
          utm_content?: string | null
          referrer_url?: string | null
          landing_page?: string | null
          lead_score?: number
          conversion_stage?: 'visitor' | 'lead' | 'trial' | 'customer'
          gdpr_consent?: boolean
          gdpr_consent_date?: string | null
          gdpr_consent_ip?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_email: string
          customer_name: string | null
          stripe_payment_intent_id: string | null
          stripe_customer_id: string | null
          product_variant: Json
          amount_cents: number
          currency: string
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          shipping_address: Json
          billing_address: Json | null
          tracking_number: string | null
          fulfillment_provider: string | null
          shipped_at: string | null
          delivered_at: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number?: string
          customer_email: string
          customer_name?: string | null
          stripe_payment_intent_id?: string | null
          stripe_customer_id?: string | null
          product_variant: Json
          amount_cents: number
          currency?: string
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          shipping_address: Json
          billing_address?: Json | null
          tracking_number?: string | null
          fulfillment_provider?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_email?: string
          customer_name?: string | null
          stripe_payment_intent_id?: string | null
          stripe_customer_id?: string | null
          product_variant?: Json
          amount_cents?: number
          currency?: string
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          shipping_address?: Json
          billing_address?: Json | null
          tracking_number?: string | null
          fulfillment_provider?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      basic_users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          demo_access_granted_at: string
          demo_access_expires_at: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          demo_access_granted_at?: string
          demo_access_expires_at?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          demo_access_granted_at?: string
          demo_access_expires_at?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      email_subscriptions: {
        Row: {
          id: string
          email: string
          subscription_types: string[]
          status: 'active' | 'unsubscribed' | 'bounced'
          unsubscribe_token: string
          unsubscribed_at: string | null
          unsubscribe_reason: string | null
          bounce_count: number
          last_email_sent_at: string | null
          created_at: string
          updated_at: string
          // Newsletter extensions (migration 002)
          name: string | null
          gdpr_consent: boolean
          gdpr_consent_date: string | null
          gdpr_consent_ip: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          utm_term: string | null
          utm_content: string | null
          referrer_url: string | null
          landing_page: string | null
          signup_source: string | null
          metadata: Json
        }
        Insert: {
          id?: string
          email: string
          subscription_types?: string[]
          status?: 'active' | 'unsubscribed' | 'bounced'
          unsubscribe_token?: string
          unsubscribed_at?: string | null
          unsubscribe_reason?: string | null
          bounce_count?: number
          last_email_sent_at?: string | null
          created_at?: string
          updated_at?: string
          // Newsletter extensions (migration 002)
          name?: string | null
          gdpr_consent?: boolean
          gdpr_consent_date?: string | null
          gdpr_consent_ip?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_term?: string | null
          utm_content?: string | null
          referrer_url?: string | null
          landing_page?: string | null
          signup_source?: string | null
          metadata?: Json
        }
        Update: {
          id?: string
          email?: string
          subscription_types?: string[]
          status?: 'active' | 'unsubscribed' | 'bounced'
          unsubscribe_token?: string
          unsubscribed_at?: string | null
          unsubscribe_reason?: string | null
          bounce_count?: number
          last_email_sent_at?: string | null
          created_at?: string
          updated_at?: string
          // Newsletter extensions (migration 002)
          name?: string | null
          gdpr_consent?: boolean
          gdpr_consent_date?: string | null
          gdpr_consent_ip?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          utm_term?: string | null
          utm_content?: string | null
          referrer_url?: string | null
          landing_page?: string | null
          signup_source?: string | null
          metadata?: Json
        }
      }
      conversion_events: {
        Row: {
          id: string
          session_id: string
          visitor_id: string | null
          user_id: string | null
          event_type: string
          event_category: string | null
          event_properties: Json
          page_url: string | null
          referrer_url: string | null
          user_agent: string | null
          ip_address: string | null
          country_code: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          visitor_id?: string | null
          user_id?: string | null
          event_type: string
          event_category?: string | null
          event_properties?: Json
          page_url?: string | null
          referrer_url?: string | null
          user_agent?: string | null
          ip_address?: string | null
          country_code?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          visitor_id?: string | null
          user_id?: string | null
          event_type?: string
          event_category?: string | null
          event_properties?: Json
          page_url?: string | null
          referrer_url?: string | null
          user_agent?: string | null
          ip_address?: string | null
          country_code?: string | null
          created_at?: string
        }
      }
      product_inventory: {
        Row: {
          id: string
          sku: string
          size: string
          color: string
          quantity_available: number
          quantity_reserved: number
          price_cents: number
          cost_cents: number | null
          reorder_level: number
          reorder_quantity: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          size: string
          color: string
          quantity_available?: number
          quantity_reserved?: number
          price_cents: number
          cost_cents?: number | null
          reorder_level?: number
          reorder_quantity?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          size?: string
          color?: string
          quantity_available?: number
          quantity_reserved?: number
          price_cents?: number
          cost_cents?: number | null
          reorder_level?: number
          reorder_quantity?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
      lead_source: 'organic' | 'paid' | 'social' | 'referral' | 'direct'
      conversion_stage: 'visitor' | 'lead' | 'trial' | 'customer'
      subscription_status: 'active' | 'unsubscribed' | 'bounced'
    }
  }
}