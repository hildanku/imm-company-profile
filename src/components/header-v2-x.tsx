"use client"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { ourProducts } from "@/lib/data"
import { useLanguage } from "@/hooks/use-language"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { SUPABASE_OBJECT_URL } from "@/lib/const"

export const HeaderV2X = () => {
    const navigate = useNavigate()
    const { t } = useLanguage()

    return (
        <div className="w-full space-y-8">
            <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => navigate({ to: "/" })}
                                    >
                                        <img
                                            src={`${SUPABASE_OBJECT_URL}logo-black.png`}
                                            alt="Indonesia Mitra Media"
                                            className="h-12 w-auto"
                                        />
                                    </div>
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
                                        <NavigationMenuTrigger className="text-gray-600 hover:text-gray-800 font-medium dark:text-white dark:bg-black">Our Product</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[300px] gap-4">
                                                <li>
                                                    {ourProducts.map((product) => (
                                                        <NavigationMenuLink asChild key={product.name}>
                                                            <Link href={product.url} to="/">
                                                                <div className="font-medium">{product.name}</div>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    ))}
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <a href="/blog" className="text-gray-600 hover:text-gray-800 font-medium"> {t('blog')}</a>
                            <a href="/career" className="text-gray-600 hover:text-gray-800 font-medium"> {t('career')}</a>
                            <a href="/contact" className="text-gray-600 hover:text-gray-800 font-medium"> {t('contact')}</a>
                            <div className="flex gap-1.5">
                                <ThemeToggle />
                                <LanguageToggle variant="ghost" size="icon" className="p-2 rounded-full" />
                            </div>
                        </nav>
                        <div className="md:hidden flex items-center gap-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full dark:bg-neutral-900">
                                        <MenuIcon className="w-6 h-6 dark:border-neutral-500" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-64 bg-white p-12 text-small dark:bg-neutral-900">
                                    <nav className="grid gap-4">
                                        <a href="/" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                            Home
                                        </a>
                                        <a href="/about" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                            About
                                        </a>
                                        <div>
                                            <p className="px-3 py-2 text-gray-800 font-medium dark:text-white">{t("product")}</p>
                                            <div className="pl-6 flex flex-col gap-1">
                                                {ourProducts.map((product) => (
                                                    <a
                                                        key={product.name}
                                                        href={product.url}

                                                        className="block px-3 py-1 dark:text-white hover:bg-gray-100 rounded-md"
                                                    >
                                                        {product.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        <a href="/blog" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                            {t("blog")}
                                        </a>
                                        <a href="/career" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                            {t("career")}
                                        </a>
                                        <a href="/contact" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                            {t("contact")}
                                        </a>
                                    </nav>
                                    <div className="flex flex-row gap-1.5 items-center justify-center">
                                        <ThemeToggle isMobile />
                                        <LanguageToggle variant="ghost" size="icon" />
                                    </div>

                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
