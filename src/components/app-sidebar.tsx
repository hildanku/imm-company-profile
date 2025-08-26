import * as React from "react"
import {
    Frame,
    GalleryVerticalEnd,
    PenLine,
    User2,
    Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "IMM",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
    ],
    navMain: [
        {
            title: "User",
            url: "#",
            icon: User2,
            isActive: true,
            items: [
                {
                    title: "User Management",
                    url: "/management/user",
                },
            ],
        },
        {
            title: "Blog",
            url: "#",
            icon: PenLine,
            isActive: false,
            items: [
                {
                    title: "Blog Post Management",
                    url: "/management/blog",
                },
            ],
        },
        {
            title: "Career",
            url: "#",
            icon: Users,
            isActive: false,
            items: [
                {
                    title: "Career Management",
                    url: "/management/career",
                },
                {
                    title: "Carrer Application Management",
                    url: "/management/career-application",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Soon",
            url: "#",
            icon: Frame,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
