import BlogPostCard, { type BlogProps } from '@/components/pages/blog'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
    component: BlogPost,
})

function BlogPost() {
    const blog: BlogProps = {
        tagline: "Latest Posts",
        heading: "Blog",
        description: "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
        buttonText: "View all posts",
        buttonUrl: "/blog",
        posts: [
            {
                id: 101,
                title: "Mengapa DevOps Menjadi Kunci Sukses Pengembangan Perangkat Lunak Modern",
                summary:
                    "DevOps bukan hanya tren—ia adalah pendekatan revolusioner yang menggabungkan pengembangan dan operasional. Pelajari bagaimana DevOps mempercepat delivery, meningkatkan kolaborasi tim, dan mengurangi risiko produksi.",
                label: "DevOps",
                author: "Aulia Rahman",
                published: "5 Agustus 2025",
                url: "https://example.com/blog/devops-modern-development",
                image: "./assets/posts/101.png"
            },
            {
                id: 102,
                title: "Zero Trust Security: Strategi Bertahan dari Serangan Siber Masa Kini",
                summary:
                    "Konsep Zero Trust mengasumsikan tidak ada yang bisa dipercaya, bahkan dari dalam jaringan. Artikel ini mengupas cara implementasi Zero Trust Architecture dan manfaatnya dalam menjaga data perusahaan.",
                label: "Cybersecurity",
                author: "Nadia Utami",
                published: "3 Agustus 2025",
                url: "https://example.com/blog/zero-trust-strategy",
                image: "./assets/posts/101.png"
            },
            {
                id: 103,
                title: "Pemanfaatan AI di Dunia Bisnis: Dari Chatbot hingga Prediksi Penjualan",
                summary:
                    "Artificial Intelligence kini menjadi alat penting dalam bisnis modern. Temukan berbagai use-case AI yang nyata dan bagaimana perusahaan dapat mengadopsinya secara efektif tanpa harus menjadi raksasa teknologi.",
                label: "Artificial Intelligence",
                author: "Budi Santosa",
                published: "1 Agustus 2025",
                url: "https://example.com/blog/ai-bisnis-modern",
                image: "./assets/posts/101.png"
            }
        ]
    }
    return (
        <BlogPostCard {...blog} />
    )
}
