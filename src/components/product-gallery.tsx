import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Product } from "@/types"


const products: Product[] = [
    {
        id: 1,
        name: "Invitationery",
        description: "Creates high-quality physical invitations for weddings, birthdays, and other special occasions with elegant and exclusive designs.",
        image_path: "./assets/INVITATIONERY.jpg",
        url_product: "https://invitationery.com/"
    },
    {
        id: 2,
        name: "Invitto",
        description: "Offers complete invitation packages, including custom prints, premium boxes, and digital cards for various events.",
        image_path: "./assets/INVITTO.jpg",
        url_product: "https://invitto.com/"
    },
    {
        id: 3,
        name: "Galeria Invitation",
        description: "Specializes in physical invitation design and printing, focusing on luxury materials and high-end finishes.",
        image_path: "./assets/GALERIA.jpg",
        url_product: "https://galeriainvitation.com/"
    },
    {
        id: 4,
        name: "Expose",
        description: "Provides high-quality printing services for invitations, brochures, banners, and other promotional materials.",
        image_path: "./assets/EXPOSE.jpg",
        url_product: "https://galeriainvitation.com/"
    },
    {
        id: 5,
        name: "IMM Enterprise",
        description: "Delivers creative and professional event planning services for a wide range of private and corporate events.",
        image_path: "./assets/ENTERPRISE.jpg",
        url_product: "https://galeriainvitation.com/"
    },
    {
        id: 6,
        name: "Luxea Wear",
        description: "A modern clothing brand offering stylish and comfortable outfits, perfect for everyday wear or special occasions.",
        image_path: "./assets/LUXEA.jpg",
        url_product: "https://galeriainvitation.com/"
    },
    {
        id: 7,
        name: "Printfy.ID",
        description: "Produces personalized office essentials such as ID cards, lanyards, name tags, and other custom accessories.",
        image_path: "./assets/PRINTFY.jpg",
        url_product: "https://printfy.id/"
    },
    {
        id: 8,
        name: "souvenery.asia",
        description: "Offers a wide selection of custom souvenirs for weddings, company events, and other memorable occasions.",
        image_path: "./assets/SOUVENERY.jpg",
        url_product: "https://printfy.id/"
    },
]

function ProductCard({ product }: { product: Product }) {

    return (
        <Card className="pt-0 pb-2 group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardHeader className="p-0 relative">
                <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                        src={product.image_path || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                {/* <div className="absolute top-2 left-2 flex gap-1">
                    {product.isNew && (
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                            New
                        </Badge>
                    )}
                    {product.isSale && <Badge variant="destructive">Sale</Badge>}
                </div>                 <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 hover:bg-white"
                >
                    <Heart className="w-4 h-4" />
                </Button> */}

            </CardHeader>

            <CardContent className="px-4 pb-0">
                {/* <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                        {product.category}
                    </Badge>
                </div> */}

                <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>

                <CardDescription className="text-sm mb-1 line-clamp-2">{product.description}</CardDescription>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                {/* <Link className="w-full" size="sm" href="https://www.luxeawear.com/" to="/">
                    <div className="">Luxea Wear</div>
                </Link> */}
                <a href={product.url_product} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        See more
                    </Button>
                </a>
            </CardFooter>
        </Card>
    )
}

export default function ProductGallery() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Product Gallery</h1>
                <p className="text-gray-600 dark:text-white">Discover our latest collection of premium products</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
