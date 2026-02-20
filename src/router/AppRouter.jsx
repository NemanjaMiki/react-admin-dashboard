import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import Settings from "../pages/Settings"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
