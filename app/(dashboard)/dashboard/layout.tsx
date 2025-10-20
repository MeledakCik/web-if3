'use client';
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import '../globals.css' 
import ScrollToTop from '@/components/ScrollToTop'

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="w-full">{children}</main>
            <Footer />
            <ScrollToTop />
        </div>
    );
}
