import { NavLink } from "react-router-dom"
import { LayoutDashboard, Users, Settings } from "lucide-react"

export default function Sidebar({ collapsed }) {
    const baseClass =
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"

    const getLinkClass = (isActive) =>
        `
    ${baseClass}
    ${isActive
            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        }
  `

    return (
        <aside
            className={`
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        bg-white dark:bg-slate-900
        border-r border-slate-200 dark:border-slate-800
      `}
        >
            <div className="p-6 font-bold text-xl tracking-tight text-slate-900 dark:text-slate-100">
                {collapsed ? "AP" : "AdminPro"}
            </div>

            <nav className="px-3 space-y-2">

                <NavLink to="/" className={({ isActive }) => getLinkClass(isActive)}>
                    <LayoutDashboard size={18} />
                    {!collapsed && "Dashboard"}
                </NavLink>

                <NavLink to="/users" className={({ isActive }) => getLinkClass(isActive)}>
                    <Users size={18} />
                    {!collapsed && "Users"}
                </NavLink>

                <NavLink to="/settings" className={({ isActive }) => getLinkClass(isActive)}>
                    <Settings size={18} />
                    {!collapsed && "Settings"}
                </NavLink>

            </nav>
        </aside>
    )
}
