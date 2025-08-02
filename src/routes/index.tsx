import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import { createFileRoute } from '@tanstack/react-router'
import { Award, MapPin } from 'lucide-react'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <section className="bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Badge variant="outline" className="text-white">
                                <Award className="w-4 h-4 mr-2" />
                                <span className="text-white">
                                    Indonesia Mitra Media is a company that was established in 2016.
                                </span>
                            </Badge>
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                Unleashing Boundless Creativity Where Every Idea Finds Its Space
                            </h1>
                            <p className="text-xl text-gray-100 max-w-2xl">
                                We help companies innovate, scale, and succeed in the digital age with cutting-edge solutions and
                                expert consulting.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-white text-gray-600 hover:bg-gray-100">
                                Learn More
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-gray-800 bg-transparent"
                            >
                                View Our Product
                            </Button>
                        </div>

                        <div className="flex items-center space-x-6 pt-4">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5" />
                                <span>Kebumen, Central Java</span>
                            </div>
                        </div>
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
        </section>
    )
}
