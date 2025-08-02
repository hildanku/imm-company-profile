"use client"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Menu, Moon } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export const Header = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full space-y-8">
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                {/* 
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div> */}
                                <div>
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => navigate({ to: "/" })}
                                    >
                                        <img
                                            src="./logo-black.png"
                                            alt="Indonesia Mitra Media"
                                            className="h-12 w-auto"
                                        />
                                    </div>
                                    {/*   <h1 className="text-xl font-bold text-gray-900">Indonesia Mitra Media</h1 >
                                        <p className="text-sm text-gray-500">xxx</p> */}
                                </div>
                            </div>
                        </div>
                        {/* Here  */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="#about" className="text-gray-600 hover:text-gray-800 font-medium"> Home</Link>
                            <Link href="#about" className="text-gray-600 hover:text-gray-800 font-medium"> About</Link>
                            <NavigationMenu viewport={false}>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Our Product</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[300px] gap-4">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="">
                                                            <div className="font-medium">Invitationery</div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#">
                                                            <div className="font-medium">Invitto</div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="#">
                                                            <div className="font-medium">Printfy.ID</div>
                                                            <div className="text-muted-foreground">
                                                                Read our latest blog posts.
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <Link href="#about" className="text-gray-600 hover:text-gray-800 font-medium"> Blog</Link>
                            <Link href="#about" className="text-gray-600 hover:text-gray-800 font-medium"> Career</Link>
                            <Link href="#about" className="text-gray-600 hover:text-gray-800 font-medium"> Contact</Link>
                            <Button variant="secondary" size="icon" className="size-8">
                                <Moon />
                            </Button>
                        </nav>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    )
}
