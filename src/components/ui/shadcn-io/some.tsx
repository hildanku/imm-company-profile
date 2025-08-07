import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, TrendingUp, Globe, Heart } from 'lucide-react';

const AboutUs = () => {
    const stats = [
        { icon: Users, label: "Employees", value: "140+" },
        { icon: Users, label: "Monthly Customers", value: "1,000+" },
        { icon: TrendingUp, label: "Daily Social Media Visitors", value: "20K-40K" },
        { icon: Calendar, label: "Years of Experience", value: "8+" }
    ];

    const milestones = [
        {
            year: "2016",
            title: "Humble Beginnings",
            description: "Started as a modest kiosk in Kebumen, Indonesia with conventional marketing methods"
        },
        {
            year: "2020",
            title: "Digital Transformation",
            description: "Embraced digital marketing systems and began expanding our reach"
        },
        {
            year: "2024",
            title: "Regional Success",
            description: "Serving clients across Indonesia and multiple Asian countries"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <Badge className="mb-4 bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
                            Since 2016
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Make Your Business
                            <span className="block text-gray-300">
                                More Unique
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            From a modest kiosk in Kebumen to serving clients across Indonesia and Asia,
                            our journey is powered by innovative digital marketing and unwavering dedication.
                        </p>
                    </div>
                </div>

                {/* Subtle geometric elements */}
                <div className="absolute top-20 left-10 w-20 h-20 border border-gray-700 rounded-full opacity-30"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 border border-gray-600 rounded-full opacity-20"></div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-black mb-2">{stat.value}</h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Story Section */}
                    <div className="space-y-8">
                        <div>
                            <Badge className="mb-4 bg-black text-white border-0 hover:bg-gray-800">
                                Our Story
                            </Badge>
                            <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
                                Indonesia Mitra Media
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Established in 2016 in the heart of Kebumen, Indonesia, our journey began with
                                a simple vision and a modest kiosk. What started as a small business with
                                conventional marketing methods has transformed into a digital powerhouse.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-black mb-2">Global Reach</h3>
                                    <p className="text-gray-600">
                                        We now serve clients from nearly every city in Indonesia and several countries across Asia,
                                        breaking geographical boundaries through digital innovation.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-black mb-2">Digital Excellence</h3>
                                    <p className="text-gray-600">
                                        Through effective and extensive use of digital marketing systems, we attract
                                        20,000 to 40,000 potential customers who visit our social media platforms daily.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-black mb-2">Team Growth</h3>
                                    <p className="text-gray-600">
                                        From a handful of visitors to over 140 dedicated employees and more than
                                        1,000 satisfied customers each month - our growth reflects our commitment to excellence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="space-y-8">
                        <div>
                            <Badge className="mb-4 bg-gray-800 text-white border-0 hover:bg-gray-700">
                                Our Journey
                            </Badge>
                            <h2 className="text-3xl font-bold text-black mb-8">Key Milestones</h2>
                        </div>

                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="relative">
                                    <div className="flex items-start space-x-6">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">
                                                {milestone.year.slice(-2)}
                                            </div>
                                            {index < milestones.length - 1 && (
                                                <div className="w-px h-16 bg-gray-300 mt-4"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 pb-8">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="text-sm font-semibold text-black bg-gray-100 px-3 py-1 rounded-full border">
                                                    {milestone.year}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-black mb-2">{milestone.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                        Ready to Make Your Business More Unique?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join over 1,000 satisfied customers who trust Indonesia Mitra Media
                        to transform their business through innovative digital marketing solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Get Started Today
                        </button>
                        <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
