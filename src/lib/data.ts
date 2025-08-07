import type { BlogProps } from "@/components/pages/blog"
import type { Career } from "@/types"
import { Calendar, Mail, MapPin, Phone, TrendingUp, Users } from "lucide-react"

const dummyJobImage = "./assets/careers/imm.jpg"

export const contactInfo = [
    {
        icon: MapPin,
        title: "Our Location",
        content: "Kebumen, Jawa Tengah",
        detail: "RT.01/RW.04, Kepel, Candi, Kec. Karanganyar"
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

export const stats = [
    { icon: Users, label: "Employees", value: "140+" },
    { icon: Users, label: "Monthly Customers", value: "1,000+" },
    { icon: TrendingUp, label: "Daily Social Media Visitors", value: "20K-40K" },
    { icon: Calendar, label: "Years of Experience", value: "8+" }
]

export const milestones = [
    {
        year: "2016",
        title: "Humble Beginnings",
        description: "Started as a modest kiosk in Kebumen, Indonesia with conventional marketing methods"
    },
    {
        year: "2020",
        title: "Digital Transformation",
        description: "Embraced digital marketing systems and began expanding our reach"
    },
    {
        year: "2024",
        title: "Regional Success",
        description: "Serving clients across Indonesia and multiple Asian countries"
    }
]

export const careers: Career[] = [
    {
        id: 1,
        job_title: "Printing Operations Specialist",
        job_position: "Junior",
        job_description: "Develop and maintain user-facing features using React and TypeScript.",
        job_type: "FullTime",
        job_location: "Jakarta, Indonesia",
        work_arrangement: "Hybrid",
        deadline: "2025-09-15",
        image: dummyJobImage
    },
    {
        id: 2,
        job_title: "UI/UX Designer",
        job_position: "Mid-Level",
        job_description: "Design wireframes, prototypes, and final UI for mobile and web applications.",
        job_type: "Freelance",
        job_location: "Remote",
        work_arrangement: "Remote",
        deadline: "2025-08-30",
        image: dummyJobImage
    },
    {
        id: 3,
        job_title: "KOL Specialist",
        job_position: "Senior",
        job_description: "Build and maintain scalable REST APIs using Node.js and PostgreSQL.",
        job_type: "FullTime",
        job_location: "Surabaya, Indonesia",
        work_arrangement: "On-Site",
        deadline: "2025-09-10",
        image: dummyJobImage
    },
    {
        id: 4,
        job_title: "Digital Marketing Intern",
        job_position: "Intern",
        job_description: "Assist in managing social media and content creation for marketing campaigns.",
        job_type: "Internship",
        job_location: "Yogyakarta, Indonesia",
        work_arrangement: "On-Site",
        deadline: "2025-08-25",
        image: dummyJobImage
    },
    {
        id: 5,
        job_title: "Project Manager",
        job_position: "Mid-Level",
        job_description: "Coordinate and oversee web development projects, ensuring timely delivery.",
        job_type: "FullTime",
        job_location: "Bandung, Indonesia",
        work_arrangement: "Hybrid",
        deadline: "2025-09-20",
        image: dummyJobImage
    },
]

export const posts: BlogProps = {
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
