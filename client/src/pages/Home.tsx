export const Home: React.FC = () => {

    return (
        <main className="min-h-[calc(100dvh-64px)] grid place-items-center bg-gradient-to-r from-[#0a0a0a] via-[#3D5467] to-[#0a0a0a] text-white px-4">
            <section className="max-w-3xl bg-neutral-800 bg-opacity-80 rounded-lg p-8 shadow-lg text-center">
                <h1 className="text-5xl font-extrabold mb-6">
                    Welcome to My App
                </h1>
                <p className="text-lg leading-relaxed mb-4">
                    This project is a secure authentication system that allows users to register, log in, and access a protected virtual lounge.
                </p>
                <p className="text-lg leading-relaxed">
                    Users can explore different roles such as Admin, Editor, or User, with access control to restrict unauthorized actions. It uses JWT tokens for security and modern React with Tailwind CSS for a smooth experience.
                </p>
            </section>
        </main>
    )
}
