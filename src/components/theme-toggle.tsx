import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()
    return (
        <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            onClick={() => toggleTheme()}
        >
            {theme === 'light' ? <Moon /> : <Sun />}
        </button>
    )
}

export const ThemeToggleMobile = () => {
    const { theme, toggleTheme } = useTheme()
    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => toggleTheme()}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            {theme === 'light' ? (
                <Moon className="w-4 h-4 text-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700" />
            ) : (
                <Sun className="w-4 h-4 text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700" />
            )}
        </Button>
    )
}
