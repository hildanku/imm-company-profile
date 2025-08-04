import { Clock, MapPin, Phone } from "lucide-react"
import { Separator } from "./ui/separator"

export const Footer = () => {

    return (
        <section className="bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2">Indonesia Mitra Media</h2>
                        <p className="text-gray-300 text-lg mb-8">
                            Make your business be #1
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <span>( 0287 ) 551628</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <span>Jl. Kepel, Kepel, Candi, Kec. Karanganyar, Kabupaten Kebumen, Jawa Tengah 54364</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <span>09.00 AM - 05.00 PM</span>
                            </div>
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
