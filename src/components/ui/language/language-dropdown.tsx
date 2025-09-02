import { useLanguage } from '@/hooks/use-language'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface LanguageDropdownProps {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    className?: string
}

export function LanguageDropdown({
    variant = 'outline',
    size = 'sm',
    className = '',
}: LanguageDropdownProps) {
    const { language, toggleLanguage, t } = useLanguage()

    const languageOptions = [
        { code: 'id', label: 'Indonesia' },
        { code: 'en', label: 'English' },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={variant}
                    size={size}
                    className={className}
                    aria-label={t('language')}
                >
                    {language === 'id' ? 'ID' : 'EN'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languageOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.code}
                        onClick={toggleLanguage}
                        className={language === option.code ? 'bg-muted' : ''}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
