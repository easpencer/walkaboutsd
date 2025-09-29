import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NeighborhoodPageTemplate } from '@/components/NeighborhoodPageTemplate'
import { getNeighborhoodById, neighborhoods } from '@/data/neighborhoods'

interface PageProps {
  params: {
    neighborhood: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const neighborhood = getNeighborhoodById(params.neighborhood)

  if (!neighborhood) {
    return {
      title: 'Neighborhood Not Found | WalkaboutSD',
      description: 'The neighborhood you are looking for does not exist.'
    }
  }

  return {
    title: `${neighborhood.name} Walking Tours | WalkaboutSD`,
    description: neighborhood.description,
    keywords: neighborhood.seoKeywords,
    openGraph: {
      title: `${neighborhood.name} Walking Tours | WalkaboutSD`,
      description: neighborhood.description,
      images: [
        {
          url: neighborhood.heroImage,
          width: 1200,
          height: 630,
          alt: `${neighborhood.name} neighborhood in San Diego`
        }
      ]
    }
  }
}

export async function generateStaticParams() {
  return neighborhoods.map((neighborhood) => ({
    neighborhood: neighborhood.id
  }))
}

export default function NeighborhoodPage({ params }: PageProps) {
  const neighborhood = getNeighborhoodById(params.neighborhood)

  if (!neighborhood) {
    notFound()
  }

  return <NeighborhoodPageTemplate neighborhood={neighborhood} />
}