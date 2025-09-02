import { CareerApplicationTable } from '@/components/pages/management/career-application/carrer-application-table'
import { CareerApplicationUpsert } from '@/components/pages/management/career-application/upsert'
import { Loading } from '@/components/ui/loading'
import { careerApplicationRepository } from '@/lib/repository/career-application'
import type { CareerApplication } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute(
    '/_protected/management/career-application',
)({
    component: CareerApplicationManagementDashboard,
})

function CareerApplicationManagementDashboard() {

    const queryClient = useQueryClient()
    const [selectedCareer, setSelectedCareer] = useState<CareerApplication | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['career-applications'],
        queryFn: () => careerApplicationRepository.list()
    })

    const careerApplication = data?.items ?? []

    const deleteMutation = useMutation({
        mutationFn: async (career: CareerApplication) => {
            return careerApplicationRepository.delete({ id: career.id })
        },
        onSuccess: (_, career) => {
            toast.success(`Application for "${career.full_name}" deleted successfully`)
            queryClient.invalidateQueries({ queryKey: ['career-applications'] })
        },
        onError: () => {
            toast.error('Failed to delete application')
        },
    })

    const handleCreateClick = () => {
        setSelectedCareer(null)
        setIsCreating(true)
    }

    const handleEditClick = (career: CareerApplication) => {
        setSelectedCareer(career)
        setIsCreating(true)
    }

    const handleDeleteClick = (career: CareerApplication) => {
        if (window.confirm(`Are you sure you want to delete application for "${career.full_name}"?`)) {
            deleteMutation.mutate(career)
        }
    }

    const handleFormSuccess = () => {
        setSelectedCareer(null)
        setIsCreating(false)
        queryClient.invalidateQueries({ queryKey: ['career-applications'] })
    }

    const handleBackToList = () => {
        setSelectedCareer(null)
        setIsCreating(false)
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isCreating) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="mb-6">
                    <button
                        onClick={handleBackToList}
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                        ← Back to Applications
                    </button>
                </div>
                <CareerApplicationUpsert careerApplication={selectedCareer || undefined} onSuccess={handleFormSuccess} />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <CareerApplicationTable
                careerApplication={careerApplication}
                loading={isLoading}
                onCreate={handleCreateClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
        </div>
    )
}
