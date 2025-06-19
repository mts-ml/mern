export const Home: React.FC = () => {
    return (
        <main className="min-h-[calc(100dvh-64px)] grid place-items-center bg-gradient-to-r from-[#0a0a0a] via-[#3D5467] to-[#0a0a0a] text-white px-4">
            <section className="max-w-3xl bg-neutral-800 bg-opacity-80 rounded-lg p-8 shadow-lg text-center">
                <h1 className="text-5xl font-extrabold mb-6">
                    Welcome to My App
                </h1>

                <p className="text-lg leading-relaxed mb-4">
                    This is a role-based authentication project where users can register, log in, and access protected routes based on their permissions.
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    There are three predefined users for testing, each with a different role: <span className="font-semibold">Admin, Editor, and User</span>.
                    You can log in with these accounts to explore how the role-based access works.
                </p>

                <div className="bg-neutral-700 bg-opacity-60 p-4 rounded-md mt-4">
                    <h2 className="text-2xl font-bold mb-2 text-teal-300">Test Credentials</h2>
                    
                    <ul className="space-y-2">
                        <li><span className="text-teal-300 font-semibold">Admin:</span> admin@test.com | <span className="italic">Test123!@#</span></li>
                        <li><span className="text-teal-300 font-semibold">Editor:</span> editor@test.com | <span className="italic">Test123!@#</span></li>
                        <li><span className="text-teal-300 font-semibold">User:</span> user@test.com | <span className="italic">Test123!@#</span></li>
                    </ul>
                </div>

                <p className="text-lg leading-relaxed mt-6">
                    This project uses <span className="text-teal-300 font-semibold">JWT authentication</span> with refresh tokens and protected routes for a secure user experience.
                </p>
            </section>
        </main>
    )
}
