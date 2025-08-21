import { careers } from "@/lib/data"
import { CareerCard } from "@/components/career-card"
import { HeaderSection } from "@/components/header-section"
import { SEO } from "@/components/seo"

export default function CareerGalery() {
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
                firstText='Your Next Opportunity'
                secondText='Starts Here'
                description='Ready to build the future with us? Explore open roles and let’s shape something great together.'
            />
            <div className="bg-gray-50 dark:bg-black">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {careers.map((career) => (
                            <CareerCard key={career.id} career={career} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
