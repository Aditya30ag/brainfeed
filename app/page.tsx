"use client";

import { useArticles, useCategories } from "@/hooks/use-content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { HeroSlider } from "@/components/HeroSlider";
import { MostPopular } from "@/components/MostPopular";
import { NewsletterBox } from "@/components/NewsletterBox";
import Link from "next/link";
import { useEffect } from "react";
import { setSEO, setStructuredData } from "@/lib/seo";

// Dummy data for when backend is unavailable
const DUMMY_ARTICLES = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in Education",
    slug: "future-of-ai-in-education",
    excerpt: "Explore how AI is transforming the way we learn and teach, from personalized learning experiences to automated grading systems.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    categoryId: 1,
    authorId: 1,
    writerId: null,
    isFeatured: true,
    readTime: 8,
    status: "approved",
    clicks: 1250,
    publishedAt: new Date("2024-12-15"),
    createdAt: new Date("2024-12-15"),
    category: { id: 1, name: "Technology", slug: "technology", description: "Tech articles", color: "#3B82F6" },
    author: { id: 1, name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=1", role: "Tech Writer", bio: "AI enthusiast" },
  },
  {
    id: 2,
    title: "Breaking Into Tech: A Complete Guide for Beginners",
    slug: "breaking-into-tech-guide",
    excerpt: "Essential tips and resources for anyone looking to start a career in technology, from coding bootcamps to networking strategies.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    categoryId: 2,
    authorId: 2,
    writerId: null,
    isFeatured: true,
    readTime: 12,
    status: "approved",
    clicks: 2100,
    publishedAt: new Date("2024-12-10"),
    createdAt: new Date("2024-12-10"),
    category: { id: 2, name: "Career", slug: "career", description: "Career advice", color: "#10B981" },
    author: { id: 2, name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=5", role: "Career Coach", bio: "Helping people break into tech" },
  },
  {
    id: 3,
    title: "Understanding Quantum Computing: Beyond the Hype",
    slug: "quantum-computing-explained",
    excerpt: "A deep dive into the fundamentals of quantum computing and its potential real-world applications in various industries.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop",
    categoryId: 3,
    authorId: 3,
    writerId: null,
    isFeatured: true,
    readTime: 15,
    status: "approved",
    clicks: 1800,
    publishedAt: new Date("2024-12-08"),
    createdAt: new Date("2024-12-08"),
    category: { id: 3, name: "Science", slug: "science", description: "Scientific discoveries", color: "#8B5CF6" },
    author: { id: 3, name: "Dr. Michael Torres", avatar: "https://i.pravatar.cc/150?img=12", role: "Quantum Physicist", bio: "Research scientist" },
  },
  {
    id: 4,
    title: "Sustainable Engineering: Building for Tomorrow",
    slug: "sustainable-engineering",
    excerpt: "How engineers are developing innovative solutions to address climate change and create a more sustainable future.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    categoryId: 4,
    authorId: 4,
    writerId: null,
    isFeatured: false,
    readTime: 10,
    status: "approved",
    clicks: 1450,
    publishedAt: new Date("2024-12-05"),
    createdAt: new Date("2024-12-05"),
    category: { id: 4, name: "Engineering", slug: "engineering", description: "Engineering innovations", color: "#F59E0B" },
    author: { id: 4, name: "Emma Rodriguez", avatar: "https://i.pravatar.cc/150?img=9", role: "Sustainability Engineer", bio: "Green tech advocate" },
  },
  {
    id: 5,
    title: "The Rise of Machine Learning in Healthcare",
    slug: "ml-in-healthcare",
    excerpt: "Discover how machine learning algorithms are revolutionizing medical diagnosis, drug discovery, and patient care.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    categoryId: 5,
    authorId: 5,
    writerId: null,
    isFeatured: false,
    readTime: 11,
    status: "approved",
    clicks: 2300,
    publishedAt: new Date("2024-12-01"),
    createdAt: new Date("2024-12-01"),
    category: { id: 5, name: "Healthcare", slug: "healthcare", description: "Healthcare tech", color: "#EC4899" },
    author: { id: 5, name: "Dr. James Park", avatar: "https://i.pravatar.cc/150?img=15", role: "Medical AI Researcher", bio: "Bridging medicine and AI" },
  },
  {
    id: 6,
    title: "Cybersecurity Essentials for Modern Developers",
    slug: "cybersecurity-essentials",
    excerpt: "Learn the fundamental security practices every developer should know to protect applications and user data.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
    categoryId: 6,
    authorId: 6,
    writerId: null,
    isFeatured: false,
    readTime: 9,
    status: "approved",
    clicks: 1950,
    publishedAt: new Date("2024-11-28"),
    createdAt: new Date("2024-11-28"),
    category: { id: 6, name: "Security", slug: "security", description: "Cybersecurity", color: "#EF4444" },
    author: { id: 6, name: "Rachel Kim", avatar: "https://i.pravatar.cc/150?img=20", role: "Security Engineer", bio: "Protecting the digital world" },
  },
] as const;

const DUMMY_CATEGORIES = [
  { id: 1, name: "Technology", slug: "technology", description: "Latest in tech", color: "#3B82F6" },
  { id: 2, name: "Career", slug: "career", description: "Career development", color: "#10B981" },
  { id: 3, name: "Science", slug: "science", description: "Scientific discoveries", color: "#8B5CF6" },
  { id: 4, name: "Engineering", slug: "engineering", description: "Engineering innovations", color: "#F59E0B" },
  { id: 5, name: "Healthcare", slug: "healthcare", description: "Healthcare tech", color: "#EC4899" },
  { id: 6, name: "Security", slug: "security", description: "Cybersecurity", color: "#EF4444" },
] as const;

export default function Home() {
  const { data: featuredArticles, isLoading: featuredLoading, error: featuredError } = useArticles({ featured: true });
  const { data: recentArticles, isLoading: recentLoading, error: recentError } = useArticles();
  const { data: categories, error: categoriesError } = useCategories();

  useEffect(() => {
    setSEO(
      "Home",
      "Discover AI breakthroughs, inspiring educators, and the future of learning. Join our community of curious minds exploring STEM, tech careers, and student success stories.",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200"
    );

    setStructuredData({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Brainfeed Magazine",
      "description": "Educational technology platform for STEM learners",
      "url": "https://brainfeed.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://brainfeed.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
  }, []);

  // Use dummy data if backend fails
  const isLoading = (featuredLoading || recentLoading) && !featuredError && !recentError;
  const shouldUseDummy = featuredError || recentError || (!isLoading && !featuredArticles && !recentArticles);
  
  const displayFeaturedArticles = shouldUseDummy ? DUMMY_ARTICLES.filter(a => a.isFeatured) : (featuredArticles || []);
  const displayRecentArticles = shouldUseDummy ? DUMMY_ARTICLES : (recentArticles || []);
  const displayCategories = categoriesError || !categories ? DUMMY_CATEGORIES : categories;

  const heroArticles = displayFeaturedArticles?.slice(0, 3) || [];
  const featuredMain = displayFeaturedArticles?.[0];
  const latestArticles = displayRecentArticles?.slice(0, 10) || [];
  const popularArticles = displayRecentArticles?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {shouldUseDummy && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Backend unavailable - displaying sample content</span>
            </div>
          </div>
        </div>
      )}

      <main className="pt-[72px]">
        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600">Loading amazing content...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Slider Section */}
            {heroArticles.length > 0 && <HeroSlider articles={heroArticles} />}

            {/* Main Content: Two-Column Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Featured & Recent Articles */}
                <div className="lg:col-span-8 space-y-12">
                  {/* Section Header */}
                  <div className="border-b-2 border-slate-900 pb-4">
                    <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-wide">
                      Featured Stories
                    </h2>
                  </div>

                  {/* Featured Article - Large Horizontal Card */}
                  {featuredMain && (
                    <div className="mb-12">
                      <ArticleCard article={featuredMain} variant="horizontal" />
                    </div>
                  )}

                  {/* Latest Articles Grid */}
                  <div>
                    <div className="border-b-2 border-slate-900 pb-4 mb-8">
                      <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-wide">
                        Latest Articles
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {latestArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} variant="standard" />
                      ))}
                    </div>
                  </div>

                  {/* Load More Button */}
                  <div className="text-center pt-8">
                    <Link href="/category/all">
                      <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide transition-colors border-2 border-primary hover:border-primary/90">
                        View All Articles
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Sidebar */}
                <aside className="lg:col-span-4 space-y-8">
                  {/* Most Popular */}
                  <MostPopular articles={popularArticles} />

                  {/* Newsletter Subscription */}
                  <NewsletterBox />

                  {/* Categories List */}
                  <div className="bg-white border border-slate-200 p-6">
                    <div className="border-b-2 border-slate-900 pb-4 mb-6">
                      <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                        Categories
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {displayCategories?.slice(0, 8).map((category) => (
                        <Link key={category.id} href={`/category/${category.slug}`}>
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
                    <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide mb-4">
                      Follow Us
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                      Stay connected on social media for daily updates
                    </p>
                    <div className="flex justify-center gap-3">
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-900 hover:bg-primary text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-900 hover:bg-primary text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-900 hover:bg-primary text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-900 hover:bg-primary text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    </div>
                  </div>

                </aside>
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

