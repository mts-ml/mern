export const Editor: React.FC = () => {
    const posts = [
        { id: 1, title: "First Post", status: "Published" },
        { id: 2, title: "Second Post", status: "Draft" },
        { id: 3, title: "Another Article", status: "Published" },
    ];

    return (
        <main className="min-h-[calc(100dvh-64px)] pt-20 p-8 bg-neutral-900 text-white">
            <h1 className="text-4xl font-bold mb-6 text-center">Editor Dashboard</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-neutral-800 rounded-lg">
                    <thead>
                        <tr className="bg-neutral-700">
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border-b border-neutral-700">
                                <td className="py-3 px-4">{post.title}</td>
                                <td className="py-3 px-4">{post.status}</td>
                                <td className="py-3 px-4 flex gap-2 justify-center">
                                    <button className="cursor-pointer bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded">
                                        Edit
                                    </button>

                                    <button className="cursor-pointer bg-red-600 hover:bg-red-500 px-3 py-1 rounded">
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
