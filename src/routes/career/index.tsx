import CareerGalery from '@/components/pages/career'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/career/')({
    component: CareerGalery,
})
