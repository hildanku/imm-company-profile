import type { BlogProps } from "@/components/pages/blog"
import type { Career, Product } from "@/types"
import { Calendar, Mail, MapPin, Phone, TrendingUp, Users } from "lucide-react"
import { SUPABASE_OBJECT_URL } from "@/lib/const"

const dummyJobImage = "./assets/careers/imm.jpg"

export const ourProducts = [
    { name: "Invitationery", url: "https://invitationery.asia" },
    { name: "Invitto", url: "https://invittoprintery.com/" },
    { name: "Printfy.ID", url: "https://printfy.id/" },
    { name: "Galeria Invitation", url: "https://www.galeriainvitation.com/" },
    { name: "IMM Enterprise", url: "https://immenterprise.com/" },
    { name: "Luxea Wear", url: "https://www.luxeawear.com/" },
    { name: "Souvenery.Asia", url: "https://souveneryasia.com" },
]

export const products: Product[] = [
    {
        id: 1,
        name: "Invitationery",
        description: "Creates high-quality physical invitations for weddings, birthdays, and other special occasions with elegant and exclusive designs.",
        image_path: SUPABASE_OBJECT_URL + "assets/INVITATIONERY.jpg",
        url_product: "https://invitationery.asia/"
    },
    {
        id: 2,
        name: "Invitto",
        description: "Offers complete invitation packages, including custom prints, premium boxes, and digital cards for various events.",
        image_path: SUPABASE_OBJECT_URL + "assets/INVITTO.jpg",
        url_product: "https://invittoprintery.com/"
    },
    {
        id: 3,
        name: "Galeria Invitation",
        description: "Specializes in physical invitation design and printing, focusing on luxury materials and high-end finishes.",
        image_path: SUPABASE_OBJECT_URL + "assets/GALERIA.jpg",
        url_product: "https://galeriainvitation.com/"
    },
    {
        id: 4,
        name: "IMM Enterprise",
        description: "Delivers creative and professional event planning services for a wide range of private and corporate events.",
        image_path: SUPABASE_OBJECT_URL + "assets/ENTERPRISE.jpg",
        url_product: "https://immenterprise.com/"
    },
    {
        id: 5,
        name: "Luxea Wear",
        description: "A modern clothing brand offering stylish and comfortable outfits, perfect for everyday wear or special occasions.",
        image_path: SUPABASE_OBJECT_URL + "assets/LUXEA.jpg",
        url_product: "https://luxeawear.com/"
    },
    {
        id: 6,
        name: "Printfy.ID",
        description: "Produces personalized office essentials such as ID cards, lanyards, name tags, and other custom accessories.",
        image_path: SUPABASE_OBJECT_URL + "assets/PRINTFY.jpg",
        url_product: "https://printfy.id/"
    },
    {
        id: 7,
        name: "Souvenery.Asia",
        description: "Offers a wide selection of custom souvenirs for weddings, company events, and other memorable occasions.",
        image_path: SUPABASE_OBJECT_URL + "assets/SOUVENERY.jpg",
        url_product: "https://souveneryasia.com/"
    },
]


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
        detail: "Mon - Sat | 09.00 AM - 05.00 PM"
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

// https://wawilelrjyhdqnsuuioy.supabase.co/storage/v1/object/public/assets-imm/assets/posts/101.png
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
            image: "posts/101.png",
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
            image: "posts/101.png"
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
            image: "posts/101.png"
        }
    ]
}
