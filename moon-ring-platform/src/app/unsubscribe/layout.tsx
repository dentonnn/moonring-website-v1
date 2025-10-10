import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata(
  'Unsubscribe | Moon Ring',
  'Manage your email preferences and unsubscribe from Moon Ring updates.',
  '/unsubscribe'
)

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
  return children
}

