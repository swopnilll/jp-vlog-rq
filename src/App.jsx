import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import AppRoute from "./AppRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoute />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
