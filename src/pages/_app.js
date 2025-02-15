import { Inter } from 'next/font/google';
import "@/styles/globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}
