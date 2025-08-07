import { careers } from "@/lib/data"
import { CareerCard } from "@/components/career-card"
import { HeaderSection } from "../header-section"

export default function CareerGalery() {
    return (
        <>
            <HeaderSection
                firstText='Your Next Opportunity'
                secondText='Starts Here'
                description='Ready to build the future with us? Explore open roles and let’s shape something great together.'
            />
            <div className="bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {careers.map((career) => (
                            <CareerCard key={career.id} career={career} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
