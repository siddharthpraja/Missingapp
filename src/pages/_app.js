import "@/styles/globals.css";
import Navbar from "../components/Nabvbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
