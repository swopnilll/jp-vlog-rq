import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Posts } from "./Posts";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog App</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
