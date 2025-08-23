import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { careerRepository } from '@/lib/repository/career'
import type { Career } from '@/types'
import { SEO } from '@/components/seo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'

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
            <div className="flex justify-center items-center min-h-[80vh]">
                <Spinner className="h-8 w-8" />
                <span className="ml-2 text-lg">Loading career details...</span>
            </div>
        )
    }

    if (error || !career) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[80vh]">
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
            
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-6">
                        <Link to="/career" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to all careers
                        </Link>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        {career.image && (
                            <div className="w-full h-80 overflow-hidden">
                                <img
                                    src={career.image}
                                    alt={career.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-8">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <Badge variant="outline" className="px-3 py-1 text-sm">{career.work_arrangement}</Badge>
                                <Badge variant="outline" className="px-3 py-1 text-sm">{career.type}</Badge>
                                <Badge variant="outline" className="px-3 py-1 text-sm">{career.position}</Badge>
                                <Badge 
                                    variant={career.status === 'Open' ? 'default' : 'destructive'}
                                    className="px-3 py-1 text-sm"
                                >
                                    {career.status}
                                </Badge>
                            </div>
                            
                            <h1 className="text-4xl font-bold mb-3">{career.title}</h1>
                            <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-4">{career.position}</h2>
                            
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 dark:text-gray-300 mb-8">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {career.location}
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Deadline: {new Date(career.deadline).toLocaleDateString()}
                                </div>
                            </div>
                            
                            <div className="prose dark:prose-invert max-w-none mb-10">
                                <h3 className="text-2xl font-semibold mb-4">Job Description</h3>
                                <div className="whitespace-pre-line text-lg">
                                    {career.description}
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                                <Button
                                    size="lg"
                                    className="flex-1 py-6"
                                    onClick={() => window.history.back()}
                                    variant="outline"
                                >
                                    Back to Careers
                                </Button>
                                <Button
                                    size="lg"
                                    className="flex-1 py-6"
                                    disabled={career.status !== 'Open'}
                                    onClick={() => window.location.href = `/career/apply/${id}`}
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
