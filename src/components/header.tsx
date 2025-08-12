"use client"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useState } from "react"
import { ThemeToggle, ThemeToggleMobile } from "@/components/theme-toggle"

export const Header = () => {
    const navigate = useNavigate()
    const [mobileMenu, setMobileMenu] = useState(false)

    return (
        <div className="w-full space-y-8">
            <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm">
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
                            <a href="/" className="text-gray-600 hover:text-gray-800 font-medium"> Home</a>
                            <a href="/about" className="text-gray-600 hover:text-gray-800 font-medium"> About</a>
                            <NavigationMenu viewport={false}>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Our Product</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[300px] gap-4">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="https://invitationery.asia" to="/">
                                                            <div className="font-medium">Invitationery</div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="https://invittoprintery.com/" to="/">
                                                            <div className="font-medium">Invitto</div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="https://printfy.id/" to="/">
                                                            <div className="font-medium">Printfy.ID</div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="https://www.galeriainvitation.com/" to="/">
                                                            <div className="font-medium">Galeria Invitation</div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="https://immenterprise.com/" to="/">
                                                            <div className="font-medium">IMM Enterprise</div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                    <NavigationMenuLink asChild>
                                                        <Link href="https://www.luxeawear.com/" to="/">
                                                            <div className="font-medium">Luxea Wear</div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <a href="/blog" className="text-gray-600 hover:text-gray-800 font-medium"> Blog</a>
                            <a href="/career" className="text-gray-600 hover:text-gray-800 font-medium"> Career</a>
                            <a href="/contact" className="text-gray-600 hover:text-gray-800 font-medium"> Contact</a>
                            {/* <Button variant="secondary" size="icon" className="size-8">
                                <Moon />
                            </Button> */}
                            <ThemeToggle />
                        </nav>
                        <div className="md:hidden flex items-center space-x-2">
                            <ThemeToggleMobile />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-50"
                                onClick={() => setMobileMenu(!mobileMenu)}
                            >
                                {mobileMenu ? <X className="w-5 h-5 dark:text-black" /> : <Menu className="w-5 h-5 dark:text-black" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {mobileMenu && (
                    <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden z-50">
                        <nav className="container mx-auto px-4 py-4">
                            <div className="flex flex-col space-y-4">
                                <a
                                    href="/"
                                    className="text-gray-600 hover:text-gray-800 font-medium py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenu(false)}
                                >
                                    Home
                                </a>
                                <a
                                    href="/about"
                                    className="text-gray-600 hover:text-gray-800 font-medium py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenu(false)}
                                >
                                    About
                                </a>
                                <div className="py-2 border-b border-gray-100">
                                    <div className="text-gray-800 font-medium mb-2">Our Products</div>
                                    <div className="pl-4 space-y-2">
                                        <a
                                            href="https://invitationery.asia"
                                            className="block text-gray-600 hover:text-gray-800 py-1"
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            Invitationery
                                        </a>
                                        <a
                                            href="https://invittoprintery.com/"
                                            className="block text-gray-600 hover:text-gray-800 py-1"
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            Invitto
                                        </a>
                                        <a
                                            href="https://printfy.id/"
                                            className="block text-gray-600 hover:text-gray-800 py-1"
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            Printfy.ID
                                        </a>
                                        <a
                                            href="https://www.galeriainvitation.com/"
                                            className="block text-gray-600 hover:text-gray-800 py-1"
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            Galeria Invitation
                                        </a>
                                        <a
                                            href="https://immenterprise.com/"
                                            className="block text-gray-600 hover:text-gray-800 py-1"
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            IMM Enterprise
                                        </a>
                                        <a
                                            href="https://www.luxeawear.com/"
                                            className="block text-gray-600 hover:text-gray-800 py-1"
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            Luxea Wear
                                        </a>
                                    </div>
                                </div>

                                <a
                                    href="/blog"
                                    className="text-gray-600 hover:text-gray-800 font-medium py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenu(false)}
                                >
                                    Blog
                                </a>
                                <a
                                    href="/career"
                                    className="text-gray-600 hover:text-gray-800 font-medium py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenu(false)}
                                >
                                    Career
                                </a>
                                <a
                                    href="/contact"
                                    className="text-gray-600 hover:text-gray-800 font-medium py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenu(false)}
                                >
                                    Contact
                                </a>

                            </div>
                        </nav>
                    </div>
                )}

            </header>
        </div>
    )
}
