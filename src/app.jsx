import "src/global.css";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";
import Router from "src/routes/sections";
import ThemeProvider from "src/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import router from "src/routes/sections.jsx";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector} from 'react-redux'

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function App() {

  const count = useSelector((state) => state.counter.value)

  console.log("redux ", count)

  // useScrollToTop();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
