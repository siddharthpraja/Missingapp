import "@/styles/globals.css";
import Navbar from "../components/Nabvbar";

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar/>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;