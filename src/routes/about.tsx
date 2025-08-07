import { AboutUs } from '@/components/pages/about-us-remake'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: AboutUs,
})
