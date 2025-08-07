import { Mail, MapPin, Phone } from "lucide-react"
import { ContactMap } from "@/components/contact-map"

const contactInfo = [
    {
        icon: MapPin,
        title: "Our Location",
        content: "Kebumen, Jawa Tengah",
        detail: "9HFM+JMW, RT.01/RW.04, Kepel, Candi, Kec. Karanganyar"
    },
    {
        icon: Mail,
        title: "Email",
        content: "indonesia.mitra.media@gmail.com",
        detail: "We'll respond within 24 hours"
    },
    {
        icon: Phone,
        title: "Phone",
        content: "( 0287 ) 551628",
        detail: "Available Mon-Sat 9AM-5PM"
    }
]

export const ContactUs = () => {
    const businessLocation = {
        lat: -7.625847,
        lng: 109.584169,
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-black dark:bg-slate-950 border-b border-slate-800 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-slate-100 mb-4">
                            Stay Connected
                            <span className="block text-slate-300 dark:text-slate-300">
                                With Us
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
                            Ready to transform your business? Get in touch with our team and let's discuss
                            how we can help make your business more unique.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-slate-900 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <info.icon className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {info.title}
                            </h2>
                            <p className="text-gray-900 dark:text-gray-100 font-medium mb-2">
                                {info.content}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {info.detail}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Find Us on the Map
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Visit our office in Kebumen, Central Java
                    </p>
                </div>
                <ContactMap
                    apiKey={import.meta.env.VITE_MAPS_API_KEY}
                    center={businessLocation}
                    zoom={16}
                    markerTitle="Our Office"
                    markerDescription="9HFM+JMW, RT.01/RW.04, Kepel, Candi, Kec. Karanganyar, Kabupaten Kebumen, Jawa Tengah 54364"
                    height="400px"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-600"
                />
            </div>
        </div>
    )
}
