import { useState, useEffect } from "react"

export default function useUsers() {

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

    return users
}
