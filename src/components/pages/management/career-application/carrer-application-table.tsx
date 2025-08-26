import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Plus, Calendar, MapPin, Briefcase } from "lucide-react"
import { useState, useEffect } from "react"
import type { CareerApplication } from "@/types"

export type CareerApplicationRow = CareerApplication

type CareerApplicationTableProps = {
    careerApplication: CareerApplicationRow[]
    loading?: boolean
    onCreate?: () => void
    onEdit?: (careerApplication: CareerApplicationRow) => void
    onDelete?: (careerApplication: CareerApplicationRow) => void
}

function formatDate(dateString?: string | null) {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

// function getJobTypeBadgeVariant(jobType: string): "default" | "secondary" | "outline" | "destructive" {
//     switch (jobType) {
//         case 'FullTime': return 'default'
//         case 'PartTime': return 'secondary'
//         case 'Freelance': return 'outline'
//         case 'Internship': return 'destructive'
//         default: return 'outline'
//     }
// }

function getStatusBadgeVariant(status: string): "default" | "secondary" | "outline" | "destructive" {
    switch (status) {
        case 'Pending': return 'default'
        case 'Rejected': return 'destructive'
        default: return 'outline'
    }
}

export function CareerApplicationTable({ careerApplication, loading, onCreate, onEdit, onDelete }: CareerApplicationTableProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredCareers, setFilteredCareers] = useState(careerApplication)

    useEffect(() => {
        const filtered = careerApplication.filter(application =>
            application.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.phone.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredCareers(filtered)
    }, [careerApplication, searchTerm])

    if (loading) {
        return (
            <div className="space-y-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                <span className="text-muted-foreground">Loading careers...</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Careers</CardTitle>
                        <CardDescription>
                            Manage job openings and career opportunities
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search careers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 w-64"
                            />
                        </div>
                        <Button onClick={onCreate} size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Career
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {filteredCareers.length === 0 ? (
                    <div className="text-center py-12 px-6">
                        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                            <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                            {searchTerm ? "No careers found" : "No careers yet"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first job opening"}
                        </p>
                        {!searchTerm && (
                            <Button onClick={onCreate}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create First Job Opening
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[300px]">Job Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Deadline
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-right w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCareers.map((career) => (
                                    <TableRow key={career.id} className="group">
                                        <TableCell>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-medium truncate">
                                                    {career.full_name}
                                                </div>
                                                <div className="text-sm text-muted-foreground truncate">
                                                    {career.email} - {career.phone}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* <TableCell>
                                            <Badge
                                                variant={getJobTypeBadgeVariant(career.)}
                                                className="capitalize font-medium"
                                            >
                                                {career.type}
                                            </Badge>
                                        </TableCell> */}

                                        <TableCell>
                                            <div className="flex items-center gap-1 text-sm">
                                                <MapPin className="h-3 w-3" />
                                                <span>{career.portfolio_url}</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {career.cv_url}
                                            </div>

                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant={getStatusBadgeVariant(career.status)}
                                                className="capitalize font-medium"
                                            >
                                                {career.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                            {formatDate(career.created_at)}
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                                    <DropdownMenuItem onClick={() => onEdit?.(career)}>
                                                        Edit Career
                                                    </DropdownMenuItem>

                                                    {onDelete && (
                                                        <DropdownMenuItem
                                                            className="text-destructive focus:text-destructive"
                                                            onClick={() => onDelete(career)}
                                                        >
                                                            Delete Career
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
