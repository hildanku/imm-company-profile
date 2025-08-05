import type { BlogPost } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export interface BlogProps {
    tagline: string
    heading: string
    description: string
    buttonText: string
    buttonUrl: string
    posts: BlogPost[]
}

export default function BlogPostCard(props: BlogProps) {
    return (
        <section className="py-32">
            <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
                <div className="text-center">
                    <Badge variant="secondary" className="mb-6">
                        {props.tagline}
                    </Badge>
                    <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
                        {props.heading}
                    </h2>
                    <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
                        {props.description}
                    </p>
                    <Button variant="link" className="w-full sm:w-auto" asChild>
                        <a href={props.buttonUrl} target="_blank">
                            {props.buttonText}
                            <ArrowRight className="ml-2 size-4" />
                        </a>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {props.posts.map((post) => (
                        <Card
                            key={post.id}
                            className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
                        >
                            <div className="aspect-16/9 w-full">
                                <a
                                    href={post.url}
                                    target="_blank"
                                    className="transition-opacity duration-200 fade-in hover:opacity-70"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </a>
                            </div>
                            <CardHeader>
                                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                                    <a href={post.url} target="_blank">
                                        {post.title}
                                    </a>
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{post.summary}</p>
                            </CardContent>
                            <CardFooter>
                                <a
                                    href={post.url}
                                    target="_blank"
                                    className="flex items-center text-foreground hover:underline"
                                >
                                    Read more
                                    <ArrowRight className="ml-2 size-4" />
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
