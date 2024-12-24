import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./layout/Header";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
