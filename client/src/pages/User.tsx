import { useContext } from "react"
import { AuthContext } from "../Context/AuthProvider"


export const User: React.FC = () => {
    const { auth } = useContext(AuthContext)

    const roles: Record<number, string> = {
        1010: "User",
        2020: "Editor",
        3030: "Admin"
    }

    return (
        <main className="min-h-[calc(100dvh-64px)] pt-20 p-8 bg-neutral-900 text-white">
            <section className="max-w-xl mx-auto bg-neutral-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl text-[#8CDFD6] font-bold mb-6 text-center">
                    User Dashboard
                </h1>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-[#8CDFD6]">Account Information</h2>

                        <p><span className="font-medium">Email:</span> {auth?.email}</p>

                        <p>
                            <span className="font-medium">Roles:</span> {auth?.roles?.map(roleNumber =>
                                roles[roleNumber]).join(", ")}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-[#8CDFD6]">Welcome!</h2>

                        <p className="text-neutral-300">
                            This area is for users to check their account info and access general features.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
