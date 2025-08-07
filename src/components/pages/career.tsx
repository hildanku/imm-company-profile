import { careers } from "@/lib/data"
import { CareerCard } from "@/components/career-card"

export default function CareerGalery() {
    return (
        <>
            <div className="bg-black dark:bg-slate-950 border-b border-slate-800 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-slate-100 mb-4">
                            Your Next Opportunity
                            <span className="block text-slate-300 dark:text-slate-300">
                                Starts Here
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
                            Ready to build the future with us? Explore open roles and let’s shape something great together.                        </p>
                    </div>
                </div>
            </div>
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
