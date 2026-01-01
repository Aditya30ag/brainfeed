"use client";

import { useArticles, useCategories } from "@/hooks/use-content";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { MostPopular } from "@/components/MostPopular";
import { NewsletterBox } from "@/components/NewsletterBox";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { setSEO, setCanonical, setStructuredData } from "@/lib/seo";

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
    isFeatured: false,
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
    isFeatured: false,
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
] as const;

const DUMMY_CATEGORIES = [
  { id: 1, name: "Technology", slug: "technology", description: "Latest in tech", color: "#3B82F6" },
  { id: 2, name: "Career", slug: "career", description: "Career development", color: "#10B981" },
  { id: 3, name: "Science", slug: "science", description: "Scientific discoveries", color: "#8B5CF6" },
  { id: 4, name: "Engineering", slug: "engineering", description: "Engineering innovations", color: "#F59E0B" },
] as const;

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string || "";
  
  // If slug is "all" or empty, don't filter by category (show all articles)
  const categoryFilter = (slug === "all" || !slug) ? undefined : slug;
  const { data: articles, isLoading, error: articlesError } = useArticles({ category: categoryFilter });
  const { data: categories, error: categoriesError } = useCategories();
  const { data: popularArticles, error: popularError } = useArticles();
  
  // Use dummy data if backend fails
  const shouldUseDummy = articlesError || (!isLoading && !articles);
  const displayArticles = shouldUseDummy ? DUMMY_ARTICLES : (articles || []);
  const displayCategories = categoriesError || !categories ? DUMMY_CATEGORIES : categories;
  const displayPopularArticles = popularError || !popularArticles ? DUMMY_ARTICLES.slice(0, 3) : popularArticles;
  
  const currentCategory = displayCategories?.find(c => c.slug === slug);
  const isAllArticles = slug === "all" || !slug || !currentCategory;

  useEffect(() => {
    if (isAllArticles) {
      setSEO(
        "All Articles - Brainfeed Magazine",
        "Explore our latest stories, insights, and educational resources across all categories.",
        undefined,
        `https://brainfeed.app/category/all`
      );
      setCanonical(`https://brainfeed.app/category/all`);

      setStructuredData({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "All Articles",
        "description": "Explore our latest stories, insights, and educational resources.",
        "url": `https://brainfeed.app/category/all`
      });
    } else if (currentCategory) {
      setSEO(
        currentCategory.name,
        currentCategory.description || `Explore articles about ${currentCategory.name} on Brainfeed Magazine`,
        undefined,
        `https://brainfeed.app/category/${currentCategory.slug}`
      );
      setCanonical(`https://brainfeed.app/category/${currentCategory.slug}`);

      setStructuredData({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": currentCategory.name,
        "description": currentCategory.description,
        "url": `https://brainfeed.app/category/${currentCategory.slug}`
      });
    }
  }, [currentCategory, isAllArticles, slug]);

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
      
      <main className="pt-[72px] pb-24">
        {isLoading && !articlesError ? (
          <div className="min-h-[400px] flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600">Loading articles...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Category Header */}
            <header className="bg-slate-50 border-b-2 border-slate-900 py-16 mb-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="inline-block px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest mb-4">
                  Category
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                  {currentCategory?.name || "All Articles"}
                </h1>
                <p className="text-xl text-slate-600 max-w-3xl">
                  {currentCategory?.description || "Explore our latest stories, insights, and educational resources."}
                </p>
              </div>
            </header>

            {/* Main Content: Two-Column Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Articles */}
                <div className="lg:col-span-8">
                  {displayArticles && displayArticles.length > 0 ? (
                    <>
                      <div className="border-b-2 border-slate-900 pb-4 mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">
                          {displayArticles.length} {displayArticles.length === 1 ? 'Article' : 'Articles'}
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {displayArticles.map((article) => (
                          <ArticleCard key={article.id} article={article} variant="standard" />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-xl text-slate-600">No articles found in this category yet.</p>
                    </div>
                  )}
                </div>

                {/* Right Column: Sidebar */}
                <aside className="lg:col-span-4 space-y-8">
                  <MostPopular articles={displayPopularArticles?.slice(0, 5) || []} />
                  <NewsletterBox />

                  {/* Categories List */}
                  <div className="bg-white border border-slate-200 p-6">
                    <div className="border-b-2 border-slate-900 pb-4 mb-6">
                      <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                        {isAllArticles ? "Browse by Category" : "Other Categories"}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {!isAllArticles && (
                        <Link href="/category/all">
                          <div className="group flex items-center justify-between py-2 border-b border-slate-100 hover:border-primary transition-colors cursor-pointer">
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors uppercase tracking-wide">
                              All Articles
                            </span>
                            <span className="text-xs text-slate-400 group-hover:text-primary transition-colors">→</span>
                          </div>
                        </Link>
                      )}
                      {displayCategories?.filter(c => c.slug !== slug).slice(0, 6).map((category) => (
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

