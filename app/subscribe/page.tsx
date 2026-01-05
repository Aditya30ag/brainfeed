"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";
import { setSEO, setStructuredData } from "@/lib/seo";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setSEO(
      "Subscribe to Brainfeed Magazine",
      "Stay updated with the latest stories on Science, Technology, Education, and more. Subscribe to our newsletter and never miss an update.",
      undefined,
      "https://brainfeed.app/subscribe"
    );

    setStructuredData({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Subscribe to Brainfeed Magazine",
      "description": "Subscribe to receive the latest stories and insights from Brainfeed Magazine.",
      "url": "https://brainfeed.app/subscribe"
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Subscribe to Brainfeed
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of readers and get the latest stories, insights, and updates delivered directly to your inbox.
            </p>
          </div>

          {/* Subscription Form */}
          <Card className="max-w-xl mx-auto p-8 shadow-lg">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-12 px-4 border-slate-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 px-4 border-slate-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  By subscribing, you agree to receive our newsletter. No spam, unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Successfully Subscribed!
                </h2>
                <p className="text-slate-600 mb-6">
                  Thank you for subscribing. Check your inbox for a confirmation email.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="border-slate-300 hover:border-primary hover:text-primary"
                >
                  Subscribe Another Email
                </Button>
              </div>
            )}
          </Card>

          {/* Benefits Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Weekly Digest</h3>
              <p className="text-sm text-slate-600">
                Get a curated collection of the week's best stories every Friday.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Exclusive Content</h3>
              <p className="text-sm text-slate-600">
                Access to subscriber-only articles and early previews.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">No Spam</h3>
              <p className="text-sm text-slate-600">
                Quality over quantity. Unsubscribe anytime with one click.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

