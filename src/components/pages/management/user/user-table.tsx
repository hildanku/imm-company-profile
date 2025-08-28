import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, UserPlus, Mail, Clock, Calendar, Copy, ArrowUpDown } from "lucide-react"
import { useState, useMemo } from "react"
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState
} from "@tanstack/react-table"
import { formatDT } from "@/lib/utils"

export type UserRow = {
    id: string
    email: string
    name: string | null
    role?: string | null
    profile_role?: string | null
    avatar_url?: string | null
    last_sign_in_at?: string | null
    created_at: string
}

type UserTableProps = {
    users: UserRow[]
    loading?: boolean
    onCreate?: () => void
    onEdit?: (user: UserRow) => void
    onDelete?: (user: UserRow) => void
}

function getRoleBadgeVariant(role: string) {
    switch (role.toLowerCase()) {
        case "admin":
            return "destructive"
        case "manager":
            return "default"
        case "editor":
            return "secondary"
        default:
            return "outline"
    }
}

export function UserTable({ users, loading, onCreate, onEdit, onDelete }: UserTableProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [sorting, setSorting] = useState<SortingState>([])

    const filteredData = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return users
        return users.filter((u) =>
            [u.name, u.email, u.role, u.profile_role]
                .filter(Boolean)
                .some((v) => (v ?? "").toString().toLowerCase().includes(term))
        )
    }, [users, searchTerm])

    const columns: ColumnDef<UserRow>[] = useMemo(
        () => [
            {
                accessorKey: "name",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0"
                    >
                        User <ArrowUpDown className="ml-2 h-3 w-3" />
                    </Button>
                ),
                cell: ({ row }) => {
                    const user = row.original
                    const displayName = user.name || "No name"
                    const initials = displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    return (
                        <div className="flex items-center gap-3">
                            {user.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={displayName}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                    {initials}
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="font-medium truncate">{displayName}</div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground truncate">
                                    <Mail className="h-3 w-3" />
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: "role",
                header: "Role",
                cell: ({ row }) => {
                    const role = row.original.profile_role ?? row.original.role ?? "viewer"
                    return (
                        <Badge variant={getRoleBadgeVariant(role)} className="capitalize font-medium">
                            {role}
                        </Badge>
                    )
                },
            },
            {
                accessorKey: "last_sign_in_at",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 hidden md:flex gap-1"
                    >
                        <Clock className="h-3 w-3" /> Last Sign-in
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <span className="text-sm text-muted-foreground hidden md:block">
                        {row.original.last_sign_in_at
                            ? formatDT(row.original.last_sign_in_at)
                            : <span className="text-amber-600">Never</span>}
                    </span>
                ),
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
        return (
            <div className="space-y-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                <span className="text-muted-foreground">Loading users...</span>
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
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64"
                    />
                </div>
                <Button size="sm" onClick={onCreate}>
                    <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
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

