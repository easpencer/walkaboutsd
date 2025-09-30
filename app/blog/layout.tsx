import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}