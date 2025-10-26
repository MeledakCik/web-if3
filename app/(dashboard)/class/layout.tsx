'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Layout/Sidebar/index"

import ChatAI from "@/components/ChatAI";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
                <div className="hidden md:block w-64"><AppSidebar /></div>
                <div className="md:hidden fixed inset-y-0 left-0 z-40 w-64 shadow-lg transform -translate-x-full transition-transform duration-300 data-[state=open]:translate-x-0">
                    <AppSidebar />
                </div>
                <main className="flex-1 overflow-auto relative">
                    <div className="md:hidden mb-4"><SidebarTrigger /></div>
                    {children}
                    <ChatAI />
                </main>
            </div>
        </SidebarProvider>
    )
}
