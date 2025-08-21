import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, UserPlus, Mail, Clock, Calendar, Copy } from "lucide-react"
import { useState, useEffect } from "react"

export type UserRow = {
    id: number | string
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

function formatDT(v?: string | null) {
    if (!v) return "-"
    const d = new Date(v)
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function getRoleBadgeVariant(role: string) {
    switch (role.toLowerCase()) {
        case 'admin': return 'destructive'
        case 'manager': return 'default'
        case 'editor': return 'secondary'
        default: return 'outline'
    }
}

export function UserTable({ users, loading, onCreate, onEdit, onDelete }: UserTableProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredUsers, setFilteredUsers] = useState(users)

    useEffect(() => {
        const filtered = users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.profile_role ?? user.role ?? "viewer").toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
    }, [users, searchTerm])

    const handleCopyEmail = async (email: string) => {
        try {
            await navigator.clipboard.writeText(email)
        } catch (err) {
            console.error('Failed to copy email:', err)
        }
    }

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
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>
                            List of all users in the system
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 w-64"
                            />
                        </div>
                        <Button onClick={onCreate} size="sm">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12 px-6">
                        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                            <UserPlus className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                            {searchTerm ? "No users found" : "No users yet"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first user"}
                        </p>
                        {!searchTerm && (
                            <Button onClick={onCreate}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Create First User
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[300px]">User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            Last Sign-in
                                        </div>
                                    </TableHead>
                                    <TableHead className="hidden lg:table-cell">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Created
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-right w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => {
                                    const role = user.profile_role ?? user.role ?? "viewer"
                                    const displayName = user.name || "No name"
                                    const initials = user.name ?
                                        user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) :
                                        user.email.slice(0, 2).toUpperCase()

                                    return (
                                        <TableRow key={user.id} className="group">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {user.avatar_url ? (
                                                        <img
                                                            src={user.avatar_url}
                                                            alt={displayName}
                                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-background"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-sm font-medium border">
                                                            {initials}
                                                        </div>
                                                    )}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-medium truncate">
                                                            {displayName}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground truncate">
                                                            <Mail className="h-3 w-3" />
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    variant={getRoleBadgeVariant(role)}
                                                    className="capitalize font-medium"
                                                >
                                                    {role}
                                                </Badge>
                                            </TableCell>

                                            <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                                {user.last_sign_in_at ? formatDT(user.last_sign_in_at) : (
                                                    <span className="text-amber-600 font-medium">Never</span>
                                                )}
                                            </TableCell>

                                            <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                                                {formatDT(user.created_at)}
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

                                                        <DropdownMenuItem onClick={() => onEdit?.(user)}>
                                                            Edit User
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() => handleCopyEmail(user.email)}
                                                        >
                                                            <Copy className="mr-2 h-3 w-3" />
                                                            Copy Email
                                                        </DropdownMenuItem>

                                                        {onDelete && (
                                                            <DropdownMenuItem
                                                                className="text-destructive focus:text-destructive"
                                                                onClick={() => onDelete(user)}
                                                            >
                                                                Delete User
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
