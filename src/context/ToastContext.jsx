import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export function ToastProvider({ children }) {
    const [message, setMessage] = useState(null)

    function showToast(msg) {
        setMessage(msg)
        setTimeout(() => setMessage(null), 3000)
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {message && (
                <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg">
                    {message}
                </div>
            )}
        </ToastContext.Provider>
    )
}

export function useToast() {
    return useContext(ToastContext)
}
