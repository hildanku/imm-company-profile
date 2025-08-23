import { strings } from '@/lib/language'
import { type Language, type LanguageContextType } from '@/types'
import React, { createContext, useEffect, useState } from 'react'

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem('language') as Language) || 'id'
    })

    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'id' ? 'en' : 'id'))
    }

    const t = (id: string) => strings[language][id as keyof typeof strings['id']] || id

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}
