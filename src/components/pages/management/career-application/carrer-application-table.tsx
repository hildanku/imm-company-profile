import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Calendar, ArrowUpDown, Copy } from "lucide-react"
import { useState, useMemo } from "react"
import type { CareerApplication } from "@/types"
import { formatDT } from "@/lib/utils"
import { LoadingManagement } from "@/components/ui/loading-management"
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export type CareerApplicationRow = CareerApplication

type CareerApplicationTableProps = {
    careerApplication: CareerApplicationRow[]
    loading?: boolean
    onCreate?: () => void
    onEdit?: (careerApplication: CareerApplicationRow) => void
    onDelete?: (careerApplication: CareerApplicationRow) => void
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
        case 'Reviewed': return 'outline'
        case 'Accepted': return 'secondary'
        default: return 'outline'
    }
}

export function CareerApplicationTable({ careerApplication, loading, onEdit, onDelete }: CareerApplicationTableProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [sorting, setSorting] = useState<SortingState>([])

    const filteredData = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return careerApplication

        return careerApplication.filter((c) =>
            [c.full_name, c.email, c.status, c.phone]
                .some((v) => (v ?? '').toString().toLowerCase().includes(term))
        )
    }, [careerApplication, searchTerm])

    const columns: ColumnDef<CareerApplicationRow>[] = useMemo(
        () => [
            {
                accessorKey: "full_name",
                header: "Applicant",
                cell: ({ row }) => row.original.full_name
            },
            {
                accessorKey: "email",
                header: "Email",
                cell: ({ row }) => row.original.email
            },
            {
                accessorKey: "career",
                header: "Job Detail",
                cell: ({ row }) => {
                    const jobTitle = row.original.career?.title
                    const position = row.original.career?.position
                    return (
                        <Badge variant='outline' className="capitalize font-medium">
                            {jobTitle} - {position}
                        </Badge>
                    )
                }
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.original.status
                    return (
                        <Badge variant={getStatusBadgeVariant(status)} className="capitalize font-medium">
                            {status}
                        </Badge>
                    )
                }
            },
            {
                accessorKey: "created_at",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 hidden lg:flex gap-1"
                    >
                        <Calendar className="h-3 w-3" /> Created
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <span className="text-sm text-muted-foreground hidden lg:block">
                        {formatDT(row.original.created_at)}
                    </span>
                ),
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
                                Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.email)}>
                                <Copy className="mr-2 h-3 w-3" />
                                Copy Email
                            </DropdownMenuItem>
                            {onDelete && (
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => onDelete(row.original)}
                                >
                                    Delete User
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [onEdit, onDelete]
    )

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (loading) {
        <LoadingManagement />
    }

    return (
        <div className="border rounded-md">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64"
                    />
                </div>
                {/* <Button size="sm" onClick={onCreate}>
                    <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
                */}
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((h) => (
                                <th key={h.id} className="px-4 py-2 text-left border-b">
                                    {flexRender(h.column.columnDef.header, h.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-muted/30">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 border-b">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Empty state */}
            {filteredData.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">No users found</div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between p-4">
                <Button
                    size="sm"
                    variant="outline"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
