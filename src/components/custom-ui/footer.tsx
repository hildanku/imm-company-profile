import { Clock, Instagram, Linkedin, MapPin, Phone } from "lucide-react"
import { useLanguage } from '@/hooks/use-language'

export const Footer = () => {
    const { t } = useLanguage()
    return (
        <section className="bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2">Indonesia Mitra Media</h2>
                        <p className="text-gray-300 text-lg mb-8">
                            {t('footer_tagline')}
                        </p>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold mb-4">{t('contact_information')}</h3>
                            <div className="flex items-center space-x-4">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <span>( 0287 ) 551628</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <span>{t('company_address')}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <span>{t('phone_hours')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 lg:mt-27 lg:items-start lg:justify-start">
                        <h3 className="text-xl font-semibold mb-4">{t('follow_us')}</h3>
                        <div className="flex items-center space-x-4">
                            <a href="https://id.linkedin.com/company/cv-indonesia-mitra-media" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                            </a>
                            <span>Linkedin</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="https://www.instagram.com/indonesia.mitra.media" target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                            </a>
                            <span>Instagram</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center py-6 text-sm text-gray-400">
                © 2025. Indonesia Mitra Media
            </div>
        </section>
    )
}
