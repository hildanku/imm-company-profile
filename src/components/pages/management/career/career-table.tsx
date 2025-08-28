import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Plus, Calendar, MapPin, ArrowUpDown } from "lucide-react"
import { useState, useMemo } from "react"
import type { Career } from "@/types"
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState
} from '@tanstack/react-table'
import { formatDate } from "@/lib/utils"

export type CareerRow = Career

type CareerTableProps = {
    careers: CareerRow[]
    loading?: boolean
    onCreate?: () => void
    onEdit?: (career: CareerRow) => void
    onDelete?: (career: CareerRow) => void
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

// function getStatusBadgeVariant(status: string): "default" | "secondary" | "outline" | "destructive" {
//     switch (status) {
//         case 'Open': return 'default'
//         case 'Closed': return 'destructive'
//         default: return 'outline'
//     }
// }

export function CareerTable({ careers, loading, onCreate, onEdit, onDelete }: CareerTableProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [sorting, setSorting] = useState<SortingState>([])
    const filteredData = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return careers
        return careers.filter((c) =>
            [c.title, c.position, c.location, c.description]
                .some((v) => (v ?? '').toString().toLowerCase().includes(term))
        )
    }, [careers, searchTerm])

    const columns: ColumnDef<CareerRow>[] = useMemo(() => [
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Job Title <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            ),
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.title ?? '-'}</div>
                    <div className="text-sm text-muted-foreground">{row.original.position ?? '-'}</div>
                </div>
            )
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => (
                <Badge variant="outline" className="capitalize">
                    {row.original.type ?? '-'}
                </Badge>
            )
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => (
                <div>
                    <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{row.original.location ?? '-'}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{row.original.work_arrangement ?? ''}</div>
                </div>
            )
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0"
                >
                    Status <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            ),
            cell: ({ row }) => (
                <Badge
                    variant={row.original.status === "Open" ? "default" : "destructive"}
                    className="capitalize"
                >
                    {row.original.status ?? '-'}
                </Badge>
            )
        },
        {
            accessorKey: "deadline",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="p-0 flex items-center gap-1"
                >
                    <Calendar className="h-3 w-3" /> Deadline <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {formatDate(row.original.deadline)}
                </span>
            )
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
                            Edit Career
                        </DropdownMenuItem>
                        {onDelete && (
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => onDelete(row.original)}
                            >
                                Delete Career
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ], [onEdit, onDelete])


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
        <div className="border rounded-md">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search careers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64"
                    />
                </div>
                <Button size="sm" onClick={onCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add Career
                </Button>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead>
                    {table.getHeaderGroups().map(hg => (
                        <tr key={hg.id}>
                            {hg.headers.map(h => (
                                <th key={h.id} className="px-4 py-2 text-left border-b">
                                    {flexRender(h.column.columnDef.header, h.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-muted/30">
                            {row.getVisibleCells().map(cell => (
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
                <div className="text-center py-12 text-muted-foreground">No careers found</div>
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
