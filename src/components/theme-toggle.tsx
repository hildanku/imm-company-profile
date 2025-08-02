import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun } from "lucide-react"

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()
    return (
        <button
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            onClick={() => toggleTheme()}
        >
            {theme === 'light' ? <Moon /> : <Sun />}
        </button>
    )
}