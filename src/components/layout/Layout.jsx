import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Layout() {
    const [collapsed, setCollapsed] = useState(false)
    const [dark, setDark] = useState(false)

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [dark])

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">

            <Sidebar collapsed={collapsed} />

            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    toggleSidebar={() => setCollapsed(prev => !prev)}
                    toggleDark={() => setDark(prev => !prev)}
                />

                <main className="flex-1 p-8 overflow-auto animate-fade">
                    <Outlet />
                </main>

            </div>

        </div>
    )
}
