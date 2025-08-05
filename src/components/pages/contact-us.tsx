import { Mail, MapIcon, Phone } from "lucide-react";
import { ContactMap } from "../contact-map";
import { Separator } from "../ui/separator";

export default function ContactUs() {
    // const businessLocation = {
    //     lat: Number(import.meta.env.VITE_LATITUDE), // -7.625847, 109.584169
    //     lng: Number(import.meta.env.VITE_LONGITUDE),
    //   }

    const businessLocation = {
        lat: -7.625847,
        lng: 109.584169,
    }

    return (
        <section className="bg-white text-black dark:text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col gap-2.5 text-center mx-auto">
                    <h1 className="text-3xl font-semibold">Stay Connected With Us</h1>
                    
                    {/* <p className="text-gray-600">
                        Stay Connected With Us.</p> */}
                        {/* <div className="flex flex-col items-center gap-2">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <span>( 0287 ) 551628</span>
                            </div>
                            <Map className="w-10 h-10 mx-auto text-black" />
                            Jl. Kepel, Kepel, Candi, Kec. Karanganyar, Kabupaten Kebumen, Jawa Tengah 54364
                        </div>
                        </div> */}
                </div>
                <div className="grid md:grid-cols-3 mt-8 items-center">
                    <div className="flex flex-col items-center gap-2.5 border-r">
                        <MapIcon className="w-10 h-10 text-black" />
                        <h2 className="text-xl">Our Location</h2>
                        <p className="text-lg">Kebumen</p>
                    </div>
                    <div className="flex flex-col items-center gap-2.5 border-r">
                        <Mail className="w-10 h-10 text-black" />
                        <h2 className="text-xl">Email</h2>
                        <p className="text-lg">indonesia.mitra.media@gmail.com</p>
                    </div>
                    <div className="flex flex-col items-center gap-2.5">
                        <Phone className="w-10 h-10 text-black" />
                        <h2 className="text-xl">Phone</h2>
                        <p className="text-lg">( 0287 ) 551628</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-center">Find Us on the Map</h2>
                    <ContactMap
                        apiKey={import.meta.env.VITE_MAPS_API_KEY}
                        center={businessLocation}
                        zoom={16}
                        markerTitle="Our Office"
                        markerDescription="9HFM+JMW, RT.01/RW.04, Kepel, Candi, Kec. Karanganyar, Kabupaten Kebumen, Jawa Tengah 54364"
                        height="400px"
                        className="w-full py-0 rounded-none"
                    />
                </div>
                <Separator className="my-8" />
            </div>
        </section>
    )
}
