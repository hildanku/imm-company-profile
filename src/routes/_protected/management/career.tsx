import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Career } from '@/types'
import { careerRepository } from '@/lib/repository/career'
import { CareerTable } from '@/components/pages/management/career/career-table'
import { CareerUpsert } from '@/components/pages/management/career/upsert'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/_protected/management/career')({
    component: CareerManagementDashboard,
})

function CareerManagementDashboard() {
    const queryClient = useQueryClient()
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    // WIP: isError or Error
    const { data, isLoading } = useQuery({
        queryKey: ['careers'],
        queryFn: async () => careerRepository.list({}),
    })

    const careers = data?.items ?? []

    const deleteMutation = useMutation({
        mutationFn: (careerId: number) => careerRepository.delete({ id: careerId }),
        onSuccess: () => {
            toast.success('Career deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['careers'] })
        },
        onError: () => toast.error('Failed to delete career'),
    })

    const handleCreateClick = () => {
        setSelectedCareer(null)
        setIsCreating(true)
    }

    const handleEditClick = (career: Career) => {
        setSelectedCareer(career)
        setIsCreating(true)
    }

    const handleDeleteClick = (career: Career) => {
        if (window.confirm(`Are you sure you want to delete "${career.title}"?`)) {
            deleteMutation.mutate(Number(career.id))
        }
    }

    const handleFormSuccess = () => {
        setSelectedCareer(null)
        setIsCreating(false)
        queryClient.invalidateQueries({ queryKey: ['careers'] })
    }

    const handleBackToList = () => {
        setSelectedCareer(null)
        setIsCreating(false)
    }

    if (isCreating) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="mb-6">
                    <button
                        onClick={handleBackToList}
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                        ← Back to Careers
                    </button>
                </div>
                <CareerUpsert career={selectedCareer || undefined} onSuccess={handleFormSuccess} />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <CareerTable
                careers={careers}
                loading={isLoading}
                onCreate={handleCreateClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
        </div>
    )
}
