"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { useArticles } from "@/hooks/use-content";
import { useState, useEffect } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setSEO } from "@/lib/seo";

interface BookmarkedArticle {
  id: number;
  slug: string;
  title: string;
  savedAt: string;
}

export default function BookmarksPage() {
  const [bookmarkedItems, setBookmarkedItems] = useState<BookmarkedArticle[]>([]);
  const { data: allArticles } = useArticles();

  useEffect(() => {
    setSEO(
      "My Bookmarks",
      "View all your saved articles in one place",
      undefined,
      "https://brainfeed.app/bookmarks"
    );
  }, []);

  // Load bookmarks from localStorage
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarkedItems(bookmarks);
  }, []);

  // Filter articles to show only bookmarked ones
  const bookmarkedArticles = allArticles?.filter(article => 
    bookmarkedItems.some(bookmark => bookmark.id === article.id)
  ) || [];

  const handleRemoveBookmark = (articleId: number) => {
    const updatedBookmarks = bookmarkedItems.filter(b => b.id !== articleId);
    setBookmarkedItems(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all bookmarks?')) {
      setBookmarkedItems([]);
      localStorage.setItem('bookmarks', JSON.stringify([]));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-[72px] pb-24">
        {/* Header */}
        <div className="bg-slate-50 border-b-2 border-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary flex items-center justify-center">
                  <Bookmark className="w-8 h-8 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                    My Bookmarks
                  </h1>
                  <p className="text-slate-600 mt-2">
                    {bookmarkedArticles.length} saved {bookmarkedArticles.length === 1 ? 'article' : 'articles'}
                  </p>
                </div>
              </div>
              {bookmarkedArticles.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleClearAll}
                  className="border-slate-300 hover:border-red-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
                <Bookmark className="w-12 h-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                No bookmarks yet
              </h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Start saving articles to read later by clicking the bookmark icon on any article page.
              </p>
              <a href="/">
                <Button className="bg-primary hover:bg-primary/90">
                  Browse Articles
                </Button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookmarkedArticles.map(article => (
                <div key={article.id} className="relative group">
                  <ArticleCard article={article} />
                  <button
                    onClick={() => handleRemoveBookmark(article.id)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white border-2 border-slate-300 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-red-500 hover:text-red-500"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

