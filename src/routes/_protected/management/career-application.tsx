import { CareerApplicationTable } from '@/components/pages/management/career-application/carrer-application-table'
import { CareerUpsert } from '@/components/pages/management/career-application/upsert'
import { careerApplicationRepository } from '@/lib/repository/career-application'
import type { CareerApplication } from '@/types'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute(
  '/_protected/management/career-application',
)({
  component: CareerApplicationManagementDashboard,
})

function CareerApplicationManagementDashboard() {
    const [careers, setCareers] = useState<CareerApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCareer, setSelectedCareer] = useState<CareerApplication | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const loadCareers = async () => {
        try {
            setLoading(true)
            const result = await careerApplicationRepository.list({})
            setCareers(result.items)
        } catch (error) {
            console.error('Error loading careers:', error)
            toast.error('Failed to load careers')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCareers()
    }, [])

    const handleCreateClick = () => {
        setSelectedCareer(null)
        setIsCreating(true)
    }

    const handleEditClick = (career: CareerApplication) => {
        setSelectedCareer(career)
        setIsCreating(true)
    }

    const handleDeleteClick = async (career: CareerApplication) => {
        if (window.confirm(`Are you sure you want to delete application for "${career.full_name}"?`)) {
            try {
                const success = await careerApplicationRepository.delete({ id: career.id })
                if (success) {
                    toast.success('Application deleted successfully')
                    loadCareers()
                } else {
                    toast.error('Failed to delete application')
                }
            } catch (error) {
                console.error('Error deleting application:', error)
                toast.error('An unexpected error occurred')
            }
        }
    }

    const handleFormSuccess = () => {
        setSelectedCareer(null)
        setIsCreating(false)
        loadCareers()
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
                        ← Back to Applications
                    </button>
                </div>
                <CareerUpsert careerApplication={selectedCareer || undefined} onSuccess={handleFormSuccess} />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <CareerApplicationTable
                careerApplication={careers}
                loading={loading}
                onCreate={handleCreateClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
        </div>
    )
}
