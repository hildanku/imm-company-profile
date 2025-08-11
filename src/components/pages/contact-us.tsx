import { ContactMap } from "@/components/contact-map"
import { contactInfo } from "@/lib/data"
import { HeaderSection } from "../header-section"

export const ContactUs = () => {
    const businessLocation = {
        lat: -7.625847,
        lng: 109.584169,
    }

    return (
        <>
            <HeaderSection
                firstText='Stay Connected'
                secondText='With Us'
                description='Ready to transform your business? Get in touch with our team and let&apos;s discuss how we can help make your business more unique.'
            />
            <div className="min-h-screen bg-gray-50 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-800 p-8 text-center hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-slate-900 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <info.icon className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {info.title}
                                </h2>
                                <p className="text-gray-900 dark:text-gray-100 font-medium mb-2 break-words">
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
                        className="pt-0 pb-0 w-full rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                </div>
            </div>
        </>
    )
}
