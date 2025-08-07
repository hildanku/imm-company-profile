import type { BlogPost } from "@/types"
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
        <>
            <div className="bg-black dark:bg-slate-950 border-b border-slate-800 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-slate-100 mb-4">
                            Fresh Ideas
                            <span className="block text-slate-300 dark:text-slate-300">
                                From People Who Build
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
                            Discover stories, insights, and behind-the-scenes updates from the people shaping our products, culture, and vision.                        </p>
                    </div>
                </div>
            </div>
            <section className="py-32 dark:bg-slate-800">
                <div className="container mx-auto flex flex-col items-center gap-16 p-4 lg:px-16">
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
        </>
    )
}
