'use client';

import { useEffect, useState } from "react";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";
import AdminLink from "../navigation/AdminLink";
import NavigationLoader from "../NavLoader/page";
import { AuthProvider } from "@/context/AuthContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (isLoading) return <NavigationLoader />;

  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-white text-neutral-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
        <AdminLink />
      </div>
    </AuthProvider>
  );
}