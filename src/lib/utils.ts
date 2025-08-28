import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// USER
export function formatDT(v?: string | null) {
    if (!v) return "-"
    const d = new Date(v)
    return isNaN(d.getTime())
        ? "-"
        : d.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
}

export function formatDate(dateString?: string | null) {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}