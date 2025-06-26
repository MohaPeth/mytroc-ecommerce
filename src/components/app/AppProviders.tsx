
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <QueryClientProvider client={queryClient}>
          <Router>
            {children}
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
