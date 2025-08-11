import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Globe, Heart } from 'lucide-react'
import { milestones, stats } from '@/lib/data'
import { HeaderSection } from '@/components/header-section'

export const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <HeaderSection
                firstText='Make Your Business'
                secondText='More Unique'
                description='From a modest kiosk in Kebumen to serving clients across Indonesia and Asia, our journey is powered by innovative digital marketing and unwavering dedication.'
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-16 mb-16">
                    <div className="space-y-6">
                        <div>
                            <Badge className="mb-4 bg-gray-900 text-white">
                                Our Story
                            </Badge>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                                Indonesia Mitra Media
                            </h2>
                            <p className="text-gray-600 dark:text-white">
                                Established in 2016 in the heart of Kebumen, Indonesia, our journey began with
                                a simple vision and a modest kiosk. What started as a small business with
                                conventional marketing methods has transformed into a digital powerhouse.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Global Reach</h3>
                                    <p className="text-gray-600 text-sm dark:text-gray-300">
                                        We now serve clients from nearly every city in Indonesia and several countries across Asia.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Digital Excellence</h3>
                                    <p className="text-gray-600 text-sm dark:text-gray-300">
                                        We attract 20,000 to 40,000 potential customers who visit our social media platforms daily.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Heart className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1 dark:text-white">Team Growth</h3>
                                    <p className="text-gray-600 text-sm dark:text-gray-300">
                                        From a handful of visitors to over 140 dedicated employees and 1,000+ customers monthly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <Badge className="mb-4 bg-gray-700 text-white">
                                Our Journey
                            </Badge>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">Key Milestones</h2>
                        </div>

                        <div className="space-y-6">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                            {milestone.year.slice(-2)}
                                        </div>
                                        {index < milestones.length - 1 && (
                                            <div className="w-px h-12 bg-gray-300 mt-2"></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {milestone.year}
                                        </span>
                                        <h3 className="font-bold text-gray-900 mt-2 mb-1 dark:text-white">{milestone.title}</h3>
                                        <p className="text-gray-600 text-sm dark:text-gray-300">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border p-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Ready to Make Your Business More Unique?
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                        Join over 1,000 satisfied customers who trust Indonesia Mitra Media
                        to transform their business through innovative digital marketing solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                            Get Started Today
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
