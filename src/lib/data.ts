import type { Career } from "@/types"

const dummyJobImage = "./assets/careers/imm.jpg"

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