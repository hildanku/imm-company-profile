import { useLanguage } from '@/hooks/use-language'
import { Button } from '@/components/ui/button'

interface LanguageSelectorProps {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    className?: string
}

export function LanguageToggle({
    variant = 'ghost',
    size = 'lg',
    className = 'rounded-full',
}: LanguageSelectorProps) {
    const { language, toggleLanguage, t } = useLanguage()

    return (
        <Button
            variant={variant}
            size={size}
            onClick={toggleLanguage}
            // className={`${className}`}
            className={`${className} size-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md`}
            aria-label={t('switch_language')}
            title={t('switch_language')}
        >
            {language === 'id' ? (
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="20" height="15" className="mr-1">
                        <rect width="20" height="15" fill="#fff" />
                        <rect width="20" height="7.5" fill="#ff0000" />
                    </svg>
                    <span className="sr-only">Indonesia</span>
                </span>
            ) : (
                <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="20" height="15" className="mr-1">
                        <rect width="20" height="15" fill="#012169" />
                        <path d="M0,0 L20,15 M20,0 L0,15" stroke="#fff" strokeWidth="3" />
                        <path d="M0,0 L20,15 M20,0 L0,15" stroke="#c8102e" strokeWidth="2" />
                        <path d="M10,0 L10,15 M0,7.5 L20,7.5" stroke="#fff" strokeWidth="5" />
                        <path d="M10,0 L10,15 M0,7.5 L20,7.5" stroke="#c8102e" strokeWidth="3" />
                    </svg>
                    <span className="sr-only">English</span>
                </span>
            )}
        </Button>
    )
}
