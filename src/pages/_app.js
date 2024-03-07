import "@/styles/globals.css";
import Navbar from "../components/Nabvbar";
import { AuthProvider } from "../../contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <>
        <AuthProvider>
      <Navbar />
      </AuthProvider>
      <Component {...pageProps} />
    </>
  );
}
