import { useEffect, useState, useMemo } from "react"
import StatCard from "../components/ui/StatCard"

export default function Dashboard() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(user => ({
                    ...user,
                    status: Math.random() > 0.5 ? "Active" : "Inactive"
                }))
                setUsers(formatted)
            })
    }, [])

    const stats = useMemo(() => {
        const active = users.filter(u => u.status === "Active").length
        const inactive = users.filter(u => u.status === "Inactive").length
        const total = users.length
        const revenue = active * 120

        return { total, active, inactive, revenue }
    }, [users])

    if (!users.length) {
        return (
            <div className="p-8">
                <p className="text-slate-500">Loading dashboard...</p>
            </div>
        )
    }


    return (
        <div className="p-8 space-y-8">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Overview of your platform performance
                    </p>
                </div>

                <div className="text-sm text-slate-500">
                    {new Date().toLocaleDateString()}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.total} />
                <StatCard title="Active Users" value={stats.active} />
                <StatCard title="Inactive Users" value={stats.inactive} />
                <StatCard title="Revenue" value={`$${stats.revenue}`} />
            </div>

            {/* Simple Chart Replacement */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">

                <h2 className="text-lg font-semibold mb-4">
                    Users Overview
                </h2>

                <div className="flex items-end gap-6 h-48">

                    <div className="flex flex-col items-center flex-1">
                        <div
                            className="w-full bg-blue-500 rounded-lg transition-all duration-700"

                            style={{
                                height: stats.active > 0
                                    ? `${stats.active * 20}px`
                                    : "12px"
                            }}
                        />
                        <span className="mt-2 text-sm text-slate-500">
                            Active ({stats.active})
                        </span>
                    </div>

                    <div className="flex flex-col items-center flex-1">
                        <div
                            className="w-full bg-slate-400 rounded-lg"
                            style={{
                                height: stats.inactive > 0
                                    ? `${stats.inactive * 20}px`
                                    : "12px"
                            }}
                        />
                        <span className="mt-2 text-sm text-slate-500">
                            Inactive ({stats.inactive})
                        </span>
                    </div>

                </div>

            </div>

        </div>
    )
}
