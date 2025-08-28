import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Target, Users } from 'lucide-react'
import { SUPABASE_OBJECT_URL } from '@/lib/const'
import ProductGallery from '@/components/product-gallery'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import { SEO } from '@/components/seo'
import { useLanguage } from '@/hooks/use-language'

export function Index() {
    const { t } = useLanguage()
    return (
        <>
            <SEO
                title="IMM - Indonesia Mitra Media "
                description="Indonesia Mitra Media - Unleashing Boundless Creativity Where Every Idea Finds Its Space. We help companies innovate, scale, and succeed in the digital age."
                keywords="IMM, Indonesia Mitra Media, creative agency, digital strategy, brand design, consulting"
                ogType="website"
                ogUrl="/"
            />
            <div className="bg-white text-black dark:bg-black dark:text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 overflow-x-hidden">
                            <div className="space-y-2">
                                <Badge variant="outline" className="dark:text-white border-gray-300 dark:border-gray-600 max-w-full">
                                    <Award className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span className="truncate">
                                        {t('company_intro')}
                                    </span>
                                </Badge>
                                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                    {t('hero_tagline')}
                                </h1>
                                <p className="text-xl max-w-2xl">
                                    {t('hero_description')}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-white hover:bg-gray-100">
                                    {t('more_about_us')}
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <ImageZoom>
                                <img
                                    src={`${SUPABASE_OBJECT_URL}/assets/hero-section.jpg`}
                                    alt="hero section"
                                    className="rounded-lg shadow-2xl"
                                    loading="lazy"
                                />
                            </ImageZoom>
                        </div>
                    </div>
                </div>
                <section className="py-16 bg-black text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="space-y-2">
                                <div className="text-4xl font-bold text-white">500+</div>
                                <div className="text-gray-300">{t('projects_completed')}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold text-white">150+</div>
                                <div className="text-gray-300">{t('happy_clients')}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold text-white">8+</div>
                                <div className="text-gray-300">{t('years_experience')}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl font-bold text-white">24/7</div>
                                <div className="text-gray-300">{t('support_available')}</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 bg-gray-50 dark:bg-black">
                    <div className="container mx-auto px-4">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                {t('services_title')}
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto dark:text-white">
                                {t('services_description')}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <CardContent className="space-y-4 p-0">
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <Target className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('digital_strategy')}</h3>
                                    <p className="text-gray-600 dark:text-gray-50">
                                        {t('digital_strategy_desc')}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <CardContent className="space-y-4 p-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Award className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('brand_design')}</h3>
                                    <p className="text-gray-600 dark:text-gray-50">
                                        {t('brand_design_desc')}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <CardContent className="space-y-4 p-0">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Users className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('consulting')}</h3>
                                    <p className="text-gray-600 dark:text-gray-50">
                                        {t('consulting_desc')}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <ProductGallery />
            </div>
        </>

    )
}
