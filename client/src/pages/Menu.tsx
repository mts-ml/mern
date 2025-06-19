import { NavLink } from "react-router-dom"


export const Menu: React.FC = () => {
    const pages = [
        { path: "/admin", label: "Admin" },
        { path: "/editor", label: "Editor" },
        { path: "/user", label: "User" },
        { path: "/test", label: "Test" },
    ]


    return (
        <main className="min-h-[calc(100dvh-64px)] grid place-items-center p-6 text-white bg-gradient-to-r from-[#0a0a0a] via-[#2f3c5c] to-[#0a0a0a]"
        >
            <section className="max-w-4xl w-full rounded-xl shadow-lg p-8 bg-neutral-800">
                <h1 className="text-4xl font-extrabold mb-4 text-center tracking-wide text-teal-300">
                    Menu
                </h1>
                <p className="text-center mb-8 text-white">
                    Welcome to the Menu! Choose a page to visit.
                </p>

                <div className="rounded-lg p-4 max-h-96 overflow-y-auto shadow-inner bg-neutral-700">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-teal-300 pb-2 text-teal-300">
                        Pages
                    </h2>

                    <ul className="space-y-3">
                        {pages.map(({ path, label }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className="block rounded-md p-3 font-medium transition-colors ease-in-out duration-300 hover:bg-teal-300 hover:text-neutral-900"
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    )
}
