import { useLanguage } from '@/hooks/use-language'
import { Button } from '@/components/ui/button'

interface LanguageSelectorProps {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    className?: string
}

export function LanguageToggle({
    variant = 'ghost',
    size = 'sm',
    className = 'rounded-full',
}: LanguageSelectorProps) {
    const { language, toggleLanguage, t } = useLanguage()

    return (
        <Button
            variant={variant}
            size={size}
            onClick={toggleLanguage}
            className={`${className} w-10 h-10 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors`}
            aria-label={t('switch_language')}
            title={t('switch_language')}
        >
            {language === 'id' ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="20" height="15" className="">
                        <rect width="20" height="15" fill="#fff" />
                        <rect width="20" height="7.5" fill="#ff0000" />
                    </svg>
                    <span className="sr-only">Indonesia</span>
                </>
            ) : (
                <>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="20" height="15" className="">
                        <rect width="20" height="15" fill="#012169" />
                        <path d="M0,0 L20,15 M20,0 L0,15" stroke="#fff" strokeWidth="3" />
                        <path d="M0,0 L20,15 M20,0 L0,15" stroke="#c8102e" strokeWidth="2" />
                        <path d="M10,0 L10,15 M0,7.5 L20,7.5" stroke="#fff" strokeWidth="5" />
                        <path d="M10,0 L10,15 M0,7.5 L20,7.5" stroke="#c8102e" strokeWidth="3" />
                    </svg>
                    <span className="sr-only">English</span>
                </>
            )}
        </Button>
    )
}
