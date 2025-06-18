export const Admin: React.FC = () => {
    const users = [
        { email: "john@example.com", roles: ["Admin"] },
        { email: "jane@example.com", roles: ["Editor"] },
        { email: "bob@example.com", roles: ["User"] },
    ]


    return (
        <main className="min-h-[calc(100dvh-64px)] pt-20 p-8 bg-neutral-900 text-white">
            <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-neutral-800 rounded-lg">
                    <thead>
                        <tr className="bg-neutral-700">
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Roles</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border-b border-neutral-700">
                                <td className="py-3 px-4">{user.email}</td>

                                <td className="py-3 px-4">{user.roles.join(", ")}</td>
                                
                                <td className="py-3 px-4 flex gap-2 justify-center">
                                    <button className="bg-teal-600 hover:bg-teal-500 px-3 py-1 rounded cursor-pointer">
                                        Promote
                                    </button>

                                    <button className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded cursor-pointer">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
