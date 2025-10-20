'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Layout/Sidebar/index"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <div className="hidden md:block w-64">
                    <AppSidebar />
                </div>
                <div className="md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform -translate-x-full transition-transform duration-300 data-[state=open]:translate-x-0">
                    <AppSidebar />
                </div>
                <main className="flex-1 p-6 md:ml-0 bg-white">
                    <div className="md:hidden mb-4">
                        <SidebarTrigger />
                    </div>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
