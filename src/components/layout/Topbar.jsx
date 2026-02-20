const Topbar = () => {
    return (
        <header className="bg-white shadow p-4 flex justify-between">
            <span className="font-semibold">Welcome back</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Logout
            </button>
        </header>
    );
};

export default Topbar;
