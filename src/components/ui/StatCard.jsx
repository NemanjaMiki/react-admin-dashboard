export default function StatCard({ title, value }) {
    return (
        <div className="
            rounded-2xl
            border border-slate-200 dark:border-slate-800
            bg-white dark:bg-slate-900
            p-6
            shadow-sm
            transition-all
            hover:shadow-lg hover:-translate-y-1
        ">
            <p className="transition-all duration-300 text-sm text-slate-500 dark:text-slate-400">
                {title}
            </p>

            <p className="transition-all duration-300 text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-2">
                {value}
            </p>
        </div>
    )
}
