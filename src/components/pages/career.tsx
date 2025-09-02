import { CareerCard } from "@/components/career-card"
import { HeaderSection } from "@/components/header-section"
import { SEO } from "@/components/seo"
import { careerRepository } from "@/lib/repository/career"
import { useLanguage } from "@/hooks/use-language"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "../ui/loading"

export default function CareerGalery() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['careers'],
        queryFn: async () => careerRepository.list({
            sort: 'deadline',
            order: 'ASC',
            limit: 100,
            status: 'Open'
        })
    })

    const careers = data?.items ?? []
    const { t } = useLanguage()

    if(isLoading) {
        return (
            <Loading />
        )
    }
    
    if(isError || !careers || careers.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h3 className="text-xl font-medium mb-2">Error loading careers</h3>
                <p className="text-muted-foreground">
                    Please try again later or contact support if the issue persists.
                </p>
            </div>
        )
    }

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
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {careers.map((career) => (
                            <CareerCard key={career.id} career={career} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
