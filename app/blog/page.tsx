"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useArticles } from "@/hooks/use-content";
import { ArticleCard } from "@/components/ArticleCard";
import { MostPopular } from "@/components/MostPopular";
import { NewsletterBox } from "@/components/NewsletterBox";
import { setSEO, setStructuredData } from "@/lib/seo";
import { Loader2 } from "lucide-react";

export default function Blog() {
  const { data: articles, isLoading, error } = useArticles();

  useEffect(() => {
    setSEO(
      "Blog - Brainfeed Magazine",
      "Explore our latest blog posts covering Science, Technology, Education, AI, and inspiring stories from around the world.",
      undefined,
      "https://brainfeed.app/blog"
    );

    setStructuredData({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Brainfeed Magazine Blog",
      "description": "Latest blog posts from Brainfeed Magazine covering Science, Technology, Education, and more.",
      "url": "https://brainfeed.app/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Brainfeed Magazine",
        "logo": {
          "@type": "ImageObject",
          "url": "https://brainfeed.app/logo.png"
        }
      }
    });
  }, []);

  // Get most popular articles (sorted by views if available)
  const popularArticles = articles?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Blog
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl">
              Discover the latest insights, stories, and updates from the world of Science, Technology, Education, and more.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-slate-600">Failed to load articles. Please try again later.</p>
                </div>
              ) : articles && articles.length > 0 ? (
                <div className="space-y-8">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="horizontal" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-slate-600">No articles found.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Most Popular */}
              <MostPopular articles={popularArticles} />

              {/* Newsletter Subscription */}
              <NewsletterBox />

              {/* Categories Card */}
              <div className="bg-white border border-slate-200 p-6">
                <div className="border-b-2 border-slate-900 pb-4 mb-6">
                  <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                    Categories
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "All Articles", slug: "all" },
                    { name: "Science & STEM", slug: "science-stem" },
                    { name: "Tech & AI", slug: "tech-ai" },
                    { name: "Careers", slug: "careers" },
                    { name: "Stories", slug: "stories" },
                  ].map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                      <div className="group flex items-center justify-between py-2 border-b border-slate-100 hover:border-primary transition-colors cursor-pointer">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors uppercase tracking-wide">
                          {category.name}
                        </span>
                        <span className="text-xs text-slate-400 group-hover:text-primary transition-colors">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social Follow */}
              <div className="bg-slate-50 border border-slate-200 p-6 text-center">
                <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  Follow Us
                </h3>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://twitter.com/brainfeed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-200 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/brainfeed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-200 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/brainfeed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-200 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

