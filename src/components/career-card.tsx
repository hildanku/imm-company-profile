import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Career } from "@/types"
import { Badge } from "@/components/ui/badge"
//import { careers } from "@/lib/data"

export function CareerCard({ career }: { career: Career }) {

    return (
        <Card className="pt-0 pb-1 group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardHeader className="p-0 relative">
                <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                        src={career.image || "/placeholder.svg"}
                        alt={career.job_title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </CardHeader>
            <CardContent className="px-4">
                <div className="mb-2 gap-1 flex flex-wrap">
                    <Badge variant="outline" className="text-xs">
                        {career.work_arrangement}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {career.job_type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {career.job_position}
                    </Badge>
                </div>
                <CardTitle className="text-lg mb-2">{career.job_title}</CardTitle>
                <CardDescription className="text-sm mb-1 line-clamp-2">{career.job_description}</CardDescription>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <p>Placement: {career.job_location}</p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row gap-2 p-4">
                <Button className="flex-1" size="sm" variant="outline">
                    Detail
                </Button>
                <Button className="flex-1" size="sm">
                    Apply
                </Button>
            </CardFooter>
        </Card>
    )
}
