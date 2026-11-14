import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-sans", //Creates a CSS variable name
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif", //Creates a CSS variable name
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacrament Meetings Manager",
  description: "Track and print weekly church program agendas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
