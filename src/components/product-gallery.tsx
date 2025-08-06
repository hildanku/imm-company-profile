import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import type { Product } from "@/types"

const products: Product[] = [
    {
        id: 1,
        name: "Invitationery",
        description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
        image_path: "./assets/INVITATIONERY.jpg",
        url_product: "https://invitationery.com/"
    },
    {
        id: 2,
        name: "Invitto",
        description: "Advanced fitness tracking with heart rate monitor and GPS",
        image_path: "./assets/INVITTO.jpg",
        url_product: "https://invitto.com/"
    },
    {
        id: 3,
        name: "Galeria Invitation",
        description: "Durable water-resistant backpack with laptop compartment",
        image_path: "./assets/GALERIA.jpg",
        url_product: "https://galeriainvitation.com/"

    },
    {
        id: 4,
        name: "Expose",
        description: "Durable water-resistant backpack with laptop compartment",
        image_path: "./assets/EXPOSE.jpg",
        url_product: "https://galeriainvitation.com/"

    },
    {
        id: 5,
        name: "IMM Enterprise",
        description: "Durable water-resistant backpack with laptop compartment",
        image_path: "./assets/ENTERPRISE.jpg",
        url_product: "https://galeriainvitation.com/"

    },
    {
        id: 6,
        name: "Luxea Wear",
        description: "Durable water-resistant backpack with laptop compartment",
        image_path: "./assets/LUXEA.jpg",
        url_product: "https://galeriainvitation.com/"

    },
    {
        id: 6,
        name: "Printfy.ID",
        description: "Durable water-resistant backpack with laptop compartment",
        image_path: "./assets/PRINTFY.jpg",
        url_product: "https://printfy.id/"

    },
    {
        id: 7,
        name: "souvenery.asia",
        description: "Durable water-resistant backpack with laptop compartment",
        image_path: "./assets/SOUVENERY.jpg",
        url_product: "https://printfy.id/"

    },
]

function ProductCard({ product }: { product: Product }) {

    return (
        <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
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

            <CardContent className="p-4">
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
                <Button className="w-full" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn More
                </Button>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
