import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { Career } from '@/types'
import { careerRepository } from '@/lib/repository/career'
import { CareerTable } from '@/components/pages/management/career/career-table'
import { CareerUpsert } from '@/components/pages/management/career/upsert'
import { toast } from 'sonner'

export const Route = createFileRoute('/_protected/management/career')({
    component: CareerManagementDashboard,
})

function CareerManagementDashboard() {
    const [careers, setCareers] = useState<Career[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)
    const [isCreating, setIsCreating] = useState(false)

    const loadCareers = async () => {
        try {
            setLoading(true)
            const result = await careerRepository.list({})
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

    const handleEditClick = (career: Career) => {
        setSelectedCareer(career)
        setIsCreating(true)
    }

    const handleDeleteClick = async (career: Career) => {
        if (window.confirm(`Are you sure you want to delete "${career.title}"?`)) {
            try {
                const success = await careerRepository.delete({ id: Number(career.id) })
                if (success) {
                    toast.success('Career deleted successfully')
                    loadCareers()
                } else {
                    toast.error('Failed to delete career')
                }
            } catch (error) {
                console.error('Error deleting career:', error)
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
                loading={loading}
                onCreate={handleCreateClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />
        </div>
    )
}
