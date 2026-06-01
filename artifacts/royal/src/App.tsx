import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import OrderPage from "@/pages/order";
import { LanguageProvider } from "@/hooks/use-language";
import { useEffect, Component, type ReactNode } from "react";

const queryClient = new QueryClient();

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "2rem", fontFamily: "monospace", background: "#1a0f05", color: "#e8d5a3", minHeight: "100vh" }}>
          <h1 style={{ color: "#d4a017" }}>خطأ في تحميل الموقع</h1>
          <p style={{ color: "#e8d5a3" }}>{this.state.error.message}</p>
          <pre style={{ fontSize: "0.75rem", opacity: 0.7, whiteSpace: "pre-wrap" }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function ForceDark() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/order" component={OrderPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <ForceDark />
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
