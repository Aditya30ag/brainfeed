import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatWidget } from "@/components/ChatWidget";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ArticleDetail from "@/pages/ArticleDetail";
import CategoryPage from "@/pages/CategoryPage";
import SearchResults from "@/pages/SearchResults";
import Chat from "@/pages/Chat";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import WriterDashboard from "@/pages/WriterDashboard";
import FAQ from "@/pages/FAQ";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/article/:slug" component={ArticleDetail} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/search" component={SearchResults} />
      <Route path="/chat" component={Chat} />
      <Route path="/login" component={Login} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/writer/dashboard" component={WriterDashboard} />
      <Route path="/faq" component={FAQ} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ChatWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
