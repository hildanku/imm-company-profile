import { LanguageContext } from '@/contexts/language-context'
import { useContext } from 'react'

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useLang must be used within LanguageProvider')
    return context
}