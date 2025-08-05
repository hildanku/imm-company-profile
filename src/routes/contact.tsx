import ContactUs from '@/components/pages/contact-us'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
    component: ContactUs,
})
