import ProductGallery from '@/components/product-gallery'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import { createFileRoute } from '@tanstack/react-router'
import { Award, Target, Users } from 'lucide-react'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <section className="bg-white text-black dark:bg-black dark:text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Badge variant="outline" className="dark:text-white border-gray-300 dark:border-gray-600">
                                <Award className="w-4 h-4 mr-2" />
                                <span>
                                    Indonesia Mitra Media is a company that was established in 2016.
                                </span>
                            </Badge>
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                Unleashing Boundless Creativity Where Every Idea Finds Its Space
                            </h1>
                            <p className="text-xl max-w-2xl">
                                We help companies innovate, scale, and succeed in the digital age with cutting-edge solutions and
                                expert consulting.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white hover:bg-gray-100">
                                More about us
                            </Button>
                            {/* <Button
                                size="lg"
                                variant="outline"
                                className="bg-white hover:bg-gray-100"
                            >
                                View Our Product
                            </Button>  */}
                        </div>

                        {/* 
                        <div className="flex items-center space-x-6 pt-4">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5" />
                                <span>Kebumen, Central Java</span>
                            </div>
                        </div> */}
                    </div>
                    <div className="relative">
                        <ImageZoom>
                            <img
                                src="./assets/hero-section.jpg"
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
                            <div className="text-gray-300">Projects Completed</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-white">150+</div>
                            <div className="text-gray-300">Happy Clients</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-white">8+</div>
                            <div className="text-gray-300">Years Experience</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-white">24/7</div>
                            <div className="text-gray-300">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        {/* <Badge variant="outline" className="text-amber-600 border-amber-600">
                            Our Services
                        </Badge> */}
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            Comprehensive Solutions for Your Business
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We offer a wide range of services to help your business grow and succeed in today's competitive market.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <CardContent className="space-y-4 p-0">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <Target className="h-6 w-6 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Digital Strategy</h3>
                                <p className="text-gray-600">
                                    Comprehensive digital strategies to help your business reach its full potential online.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <CardContent className="space-y-4 p-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Award className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Brand Design</h3>
                                <p className="text-gray-600">
                                    Creative branding solutions that make your business stand out from the competition.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <CardContent className="space-y-4 p-0">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Consulting</h3>
                                <p className="text-gray-600">
                                    Expert consulting services to guide your business through digital transformation.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <ProductGallery />
        </section>
    )
}
