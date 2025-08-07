import { Badge } from "@/components/ui/badge"

interface HeaderProps {
    firstText: string
    secondText: string
    description: string
    badge?: string
}

export function HeaderSection({
    firstText,
    secondText,
    description,
    badge,
}: HeaderProps) {
    return (
        <div className="bg-black dark:bg-slate-950 border-b border-slate-800 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    { badge && <Badge className="mb-4 bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-200">
                        {badge}
                    </Badge>
                    }
                    <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-slate-100 mb-6">
                        {firstText}
                        <span className="block text-slate-300 dark:text-slate-300">
                        {secondText}
                        </span>
                    </h1>
                    <p className="text-lg text-white dark:text-slate-400 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}