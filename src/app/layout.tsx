import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
import { DefaultSeo } from 'next-seo';
import SEO from '@/seo.config';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ceramics Studio",
  description: "Luxury handmade ceramics by an academic artist",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
       <head />
      <body className={inter.className}>
        <DefaultSeo {...SEO}/>
        <MainLayout>{children}</MainLayout>

      </body>
    </html>
  );
}