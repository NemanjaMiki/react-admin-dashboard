import { useEffect, useMemo, useState } from "react"
import Skeleton from "../components/ui/Skeleton"

const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", status: "Active" },
    { id: 4, name: "Emily Johnson", email: "emily@example.com", status: "Pending" },
    { id: 5, name: "David Wilson", email: "david@example.com", status: "Active" },
    { id: 6, name: "Sarah Miller", email: "sarah@example.com", status: "Inactive" },
]

export default function Users() {
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [sortAsc, setSortAsc] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const usersPerPage = 4

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    const filteredUsers = useMemo(() => {
        let data = [...usersData]

        if (search) {
            data = data.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (statusFilter !== "All") {
            data = data.filter((user) => user.status === statusFilter)
        }

        data.sort((a, b) =>
            sortAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        )

        return data
    }, [search, statusFilter, sortAsc])

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search, statusFilter])

    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-8">
                Users
            </h1>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                </select>

                <button
                    onClick={() => setSortAsc((prev) => !prev)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                    Sort {sortAsc ? "↑" : "↓"}
                </button>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">

                {loading ? (
                    <div className="p-6 space-y-4">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-sm text-slate-500 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {paginatedUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={user.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Page {currentPage} of {totalPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition"
                        >
                            Previous
                        </button>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

function StatusBadge({ status }) {
    const base = "px-3 py-1 text-xs font-medium rounded-full"

    const variants = {
        Active:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        Inactive:
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        Pending:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    }

    return <span className={`${base} ${variants[status]}`}>{status}</span>
}
