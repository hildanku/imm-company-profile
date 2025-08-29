import { Spinner } from '@/components/ui/spinner'

export function Loading() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner className="h-8 w-8" />
            <span className="ml-2 text-lg">Loading post...</span>
        </div>
    )
}