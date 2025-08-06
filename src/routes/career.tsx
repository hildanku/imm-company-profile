import CareerGalery from '@/components/career-card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/career')({
  component: CareerGalery,
})