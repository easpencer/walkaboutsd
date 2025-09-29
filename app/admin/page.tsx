import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | WalkaboutSD',
  description: 'Manage walkabouts, experiences, pricing, and content for WalkaboutSD',
  robots: 'noindex, nofollow'
}

export default function AdminPage() {
  return <AdminDashboard />
}