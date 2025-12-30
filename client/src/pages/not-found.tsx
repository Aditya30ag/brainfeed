import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />
      
      <main className="pt-[80px] flex items-center justify-center min-h-[calc(100vh-80px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center px-4 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <AlertCircle className="w-20 h-20 text-primary relative z-10" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-6xl font-display font-bold text-[#1A3B52] dark:text-white mb-4">
              404
            </h1>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-12 font-semibold flex items-center gap-2" data-testid="button-404-home">
                  <Home className="w-5 h-5" />
                  Back Home
                </Button>
              </motion.div>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="px-8 h-12 bg-slate-200 dark:bg-slate-800 text-foreground rounded-full font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors duration-200 flex items-center gap-2 justify-center"
              data-testid="button-404-back"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <h3 className="font-semibold text-foreground mb-4">Need help?</h3>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/faq" className="block hover:text-primary transition-colors duration-200 font-medium">
                Check our FAQ
              </Link>
              <Link href="/contact" className="block hover:text-primary transition-colors duration-200 font-medium">
                Contact support
              </Link>
              <Link href="/chat" className="block hover:text-primary transition-colors duration-200 font-medium">
                Chat with AI assistant
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
