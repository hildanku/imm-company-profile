import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { careerRepository } from '@/lib/repository/career'
import type { Career } from '@/types'
import { SEO } from '@/components/seo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { HeaderSection } from '@/components/header-section'

export const Route = createFileRoute('/career/$id')({
    component: CareerDetailPage,
})

function CareerDetailPage() {
    const { id } = Route.useParams()
    const [career, setCareer] = useState<Career | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                setLoading(true)
                const careerData = await careerRepository.findByUUID({ uuid: id })
                if (careerData) {
                    setCareer(careerData)
                } else {
                    setError('Career not found')
                }
            } catch (err) {
                console.error('Error fetching career:', err)
                setError('Failed to load career details')
            } finally {
                setLoading(false)
            }
        }

        fetchCareer()
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Spinner className="h-8 w-8" />
                <span className="ml-2 text-lg">Loading career details...</span>
            </div>
        )
    }

    if (error || !career) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Career not found'}</h2>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        )
    }

    return (
        <>
            <SEO
                title={`${career.title} - Indonesia Mitra Media Careers`}
                description={career.description.substring(0, 160)}
                keywords={`IMM, Indonesia Mitra Media, careers, ${career.title}, ${career.position}, ${career.type}, ${career.location}`}
                ogType="website"
                ogUrl={`/career/${id}`}
                ogImage={career.image || "/assets/careers/imm.jpg"}
            />

            <HeaderSection
                firstText={career.title}
                secondText={career.position}
                description={`${career.type} · ${career.location} · ${career.work_arrangement}`}
            />

            <div className="bg-gray-50 dark:bg-black">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                        {career.image && (
                            <div className="w-full h-64 overflow-hidden">
                                <img
                                    src={career.image}
                                    alt={career.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline">{career.work_arrangement}</Badge>
                                <Badge variant="outline">{career.type}</Badge>
                                <Badge variant="outline">{career.position}</Badge>
                                <Badge variant={career.status === 'Open' ? 'default' : 'destructive'}>
                                    {career.status}
                                </Badge>
                            </div>

                            <h1 className="text-3xl font-bold mb-2">{career.title}</h1>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                Location: {career.location} • Deadline: {new Date(career.deadline).toLocaleDateString()}
                            </p>

                            <div className="prose dark:prose-invert max-w-none mb-8">
                                <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                                <div className="whitespace-pre-line">
                                    {career.description}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <Button
                                    size="lg"
                                    className="flex-1"
                                    onClick={() => window.history.back()}
                                    variant="outline"
                                >
                                    Back to Careers
                                </Button>
                                <Button
                                    size="lg"
                                    className="flex-1"
                                    disabled={career.status !== 'Open'}
                                    onClick={() => window.open(`mailto:careers@indonesiamitramedia.com?subject=Application for ${career.title} - ${career.position}`)}
                                >
                                    Apply Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
