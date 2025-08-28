import { Card, CardContent } from '@/components/ui/card'

export function LoadingManagement() {
    return (
        <div className="space-y-4">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            <span className="text-muted-foreground">Loading applications...</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}
