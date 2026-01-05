"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, ChevronDown, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);
  const { isAuthenticated, isAdmin, isWriter } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.news-dropdown-container')) {
        setIsNewsDropdownOpen(false);
      }
    };

    if (isNewsDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNewsDropdownOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "All Articles", href: "/category/all" },
    { name: "Science & STEM", href: "/category/science-stem" },
    { name: "Tech & AI", href: "/category/tech-ai" },
    { name: "Careers", href: "/category/careers" },
    { name: "Stories", href: "/category/stories" },
  ];

  const newsCategories = [
    { name: "Press Release", href: "/category/press-release" },
    { name: "Education", href: "/category/education" },
    { name: "Science & Technology", href: "/category/science-technology" },
    { name: "Environment", href: "/category/environment" },
    { name: "Institutions Profiles", href: "/category/institutions-profiles" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white shadow-md border-b border-slate-200" 
        : "bg-white border-b border-slate-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-2xl text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                BRAINFEED
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/about">
              <button className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                pathname === "/about" 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-slate-600 hover:text-primary"
              }`}>
                About Us
              </button>
            </Link>

            {/* News Dropdown */}
            <div className="relative news-dropdown-container">
              <button 
                onClick={() => setIsNewsDropdownOpen(!isNewsDropdownOpen)}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors flex items-center gap-1 ${
                  isNewsDropdownOpen ? 'text-primary' : 'text-slate-600 hover:text-primary'
                }`}
              >
                News
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isNewsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isNewsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl z-[100] rounded-sm overflow-hidden"
                >
                  {newsCategories.map((category) => (
                    <Link 
                      key={category.href} 
                      href={category.href}
                      onClick={() => setIsNewsDropdownOpen(false)}
                    >
                      <div className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-primary hover:text-white transition-colors cursor-pointer border-b border-slate-100 last:border-b-0">
                        {category.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/subscribe">
              <button className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                pathname === "/subscribe" 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-slate-600 hover:text-primary"
              }`}>
                Subscribe
              </button>
            </Link>

            <Link href="/contact">
              <button className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                pathname === "/contact" 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-slate-600 hover:text-primary"
              }`}>
                Contact Us
              </button>
            </Link>

            <Link href="/blog">
              <button className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                pathname === "/blog" 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-slate-600 hover:text-primary"
              }`}>
                Blog
              </button>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
                <Input
                  autoFocus
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-10 border-slate-300 focus:border-primary"
                  data-testid="input-navbar-search"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center justify-center w-10 h-10 text-slate-600 hover:text-primary transition-colors"
                title="Search"
                data-testid="button-navbar-search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Bookmarks */}
            <Link href="/bookmarks">
              <button
                className="hidden md:flex items-center justify-center w-10 h-10 text-slate-600 hover:text-primary transition-colors"
                title="My Bookmarks"
              >
                <Bookmark className="w-5 h-5" />
              </button>
            </Link>

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-3">
                {isAdmin && (
                  <Link href="/admin/dashboard">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-slate-300 hover:border-primary hover:text-primary uppercase text-xs font-semibold tracking-wide"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                {isWriter && (
                  <Link href="/writer/dashboard">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-slate-300 hover:border-primary hover:text-primary uppercase text-xs font-semibold tracking-wide"
                    >
                      Writer
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden lg:block">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white uppercase text-xs font-bold tracking-wide px-6"
                  data-testid="button-nav-login"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-slate-600 hover:text-slate-900"
              data-testid="button-navbar-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-slate-300 focus:border-primary"
              />
            </form>

            {/* Mobile Nav Links */}
            <nav className="space-y-2">
              <Link href="/bookmarks">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors flex items-center gap-2 ${
                    pathname === "/bookmarks" 
                      ? "bg-primary text-white" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  My Bookmarks
                </button>
              </Link>

              <Link href="/about">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    pathname === "/about" 
                      ? "bg-primary text-white" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  About Us
                </button>
              </Link>

              {/* Mobile News Dropdown */}
              <div className="bg-slate-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNewsDropdownOpen(!isNewsDropdownOpen);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  News
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isNewsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isNewsDropdownOpen && (
                  <div className="bg-white border-t border-slate-200">
                    {newsCategories.map((category) => (
                      <Link 
                        key={category.href} 
                        href={category.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsNewsDropdownOpen(false);
                        }}
                      >
                        <div className="w-full text-left px-8 py-3 text-sm text-slate-700 hover:bg-primary hover:text-white transition-colors border-b border-slate-100 last:border-b-0">
                          {category.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/subscribe">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    pathname === "/subscribe" 
                      ? "bg-primary text-white" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Subscribe
                </button>
              </Link>

              <Link href="/contact">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    pathname === "/contact" 
                      ? "bg-primary text-white" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Contact Us
                </button>
              </Link>

              <Link href="/blog">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    pathname === "/blog" 
                      ? "bg-primary text-white" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Blog
                </button>
              </Link>
            </nav>

            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              {isAuthenticated ? (
                <div className="space-y-2">
                  {isAdmin && (
                    <Link href="/admin/dashboard">
                      <Button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="outline" 
                        className="w-full border-slate-300 uppercase text-xs font-semibold"
                      >
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  {isWriter && (
                    <Link href="/writer/dashboard">
                      <Button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="outline" 
                        className="w-full border-slate-300 uppercase text-xs font-semibold"
                      >
                        Writer Dashboard
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-primary hover:bg-primary/90 text-white uppercase text-xs font-bold"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
