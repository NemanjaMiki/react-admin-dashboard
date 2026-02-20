import { users as initialUsers } from "../data/users"

let users = [...initialUsers]

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export async function getUsers() {
    await delay(600)
    return [...users]
}

export async function addUser(newUser) {
    await delay(400)
    const user = { id: Date.now(), ...newUser }
    users.push(user)
    return user
}

export async function deleteUser(id) {
    await delay(400)
    users = users.filter(u => u.id !== id)
}
