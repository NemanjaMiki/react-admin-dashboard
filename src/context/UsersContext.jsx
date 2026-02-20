import { createContext, useContext } from "react"
import useUsers from "../hooks/useUsers"

const UsersContext = createContext(null)

export function UsersProvider({ children }) {

    const users = useUsers()

    return (
        <UsersContext.Provider value={{ users }}>
            {children}
        </UsersContext.Provider>
    )
}

export function useUsersContext() {
    const context = useContext(UsersContext)

    if (!context) {
        throw new Error("useUsersContext must be used inside UsersProvider")
    }

    return context
}
