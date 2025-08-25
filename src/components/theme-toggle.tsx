import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
    isMobile?: boolean
}

export const ThemeToggle = ({ isMobile = false }: ThemeToggleProps) => {
    console.log(isMobile)
    const { theme, toggleTheme } = useTheme()
    return (
        <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
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
