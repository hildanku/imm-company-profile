import { useState, useEffect } from "react"
import { CareerCard } from "@/components/career-card"
import { HeaderSection } from "@/components/header-section"
import { SEO } from "@/components/seo"
import { careerRepository } from "@/lib/repository/career"
import type { Career } from "@/types"
import { Spinner } from "@/components/ui/spinner"
import { useLanguage } from "@/hooks/use-language"

export default function CareerGalery() {
    const [careers, setCareers] = useState<Career[]>([])
    const [loading, setLoading] = useState(true)
    const { t } = useLanguage()

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                setLoading(true)
                const result = await careerRepository.list({
                    sort: 'deadline',
                    order: 'ASC',
                    limit: 100,
                    status: 'Open'
                })
                setCareers(result.items)
            } catch (error) {
                console.error('Error fetching careers:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCareers()
    }, [])

    return (
        <>
            <SEO
                title="Careers - Indonesia Mitra Media"
                description="Ready to build the future with us? Explore open roles and let's shape something great together at Indonesia Mitra Media."
                keywords="IMM, Indonesia Mitra Media, careers, jobs, employment, opportunities"
                ogType="website"
                ogUrl="/career"
                ogImage="/assets/careers/imm.jpg"
            />
            <HeaderSection
                firstText={t('career_hero_title')}
                secondText={t('career_hero_second_title')}
                description={t('career_hero_desc')}
            />
            <div className="bg-gray-50 dark:bg-black">
                <div className="container mx-auto px-4 py-8">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Spinner className="h-8 w-8" />
                            <span className="ml-2 text-lg">Loading careers...</span>
                        </div>
                    ) : careers.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-medium mb-2">No open positions at the moment</h3>
                            <p className="text-muted-foreground">
                                Please check back later for new opportunities
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {careers.map((career) => (
                                <CareerCard key={career.id} career={career} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
