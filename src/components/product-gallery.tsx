import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Product } from "@/types"
import { products } from "@/lib/data"

function ProductCard({ product }: { product: Product }) {

    return (
        <Card className="pt-0 pb-2 group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardHeader className="p-0 relative">
                <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                        src={product.image_path}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </CardHeader>

            <CardContent className="px-4 pb-0">
                <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="text-sm mb-1 line-clamp-2">{product.description}</CardDescription>
            </CardContent>

            <CardFooter className="p-4 pt-0">
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
