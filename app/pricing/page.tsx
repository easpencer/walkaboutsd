import { PricingPlans } from '@/components/PricingPlans'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing Plans | WalkaboutSD - Premium Walking Tours & Experiences',
  description: 'Choose your perfect San Diego walking adventure. From free exploration to VIP experiences with private guides and premium features.',
  openGraph: {
    title: 'Pricing Plans | WalkaboutSD',
    description: 'Premium walking tours and experiences in San Diego. Free plans available.',
    url: 'https://walkaboutsd.com/pricing',
  },
  keywords: ['San Diego tours pricing', 'walking tour prices', 'premium experiences', 'VIP tours'],
}

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20">
      <PricingPlans />
    </div>
  )
}