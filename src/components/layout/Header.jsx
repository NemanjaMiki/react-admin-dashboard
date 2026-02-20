import { Menu, Moon, Sun } from "lucide-react"

export default function Header({ toggleSidebar, toggleDark }) {
    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-6 text-slate-900 dark:text-white transition-colors">

            <button onClick={toggleSidebar}>
                <Menu size={20} />
            </button>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleDark}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <Moon size={18} />
                </button>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-r
 from-blue-500 to-purple-500" />
                    <span className="text-sm font-medium">Nemanja</span>
                </div>
            </div>
        </header>
    )
}
