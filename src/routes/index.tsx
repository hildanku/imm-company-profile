import ProductGallery from '@/components/product-gallery'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import { createFileRoute } from '@tanstack/react-router'
import { Award } from 'lucide-react'

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
            <ProductGallery />
        </section>
    )
}
