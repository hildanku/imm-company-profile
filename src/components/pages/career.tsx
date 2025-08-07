import { careers } from "@/lib/data"
import { CareerCard } from "@/components/career-card"

export default function CareerGalery() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">List Opportunity</h1>
                <p className="text-gray-600 dark:text-white">Discover our latest collection of premium products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {careers.map((career) => (
                    <CareerCard key={career.id} career={career} />
                ))}
            </div>
        </div>
    )
}
