import { Link } from "react-router-dom"

export const Unauthorized: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-6 text-rose-50 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700">
            <h1 className="text-4xl font-extrabold mb-4 text-center tracking-wide text-teal-300">
                Unauthorized Access
            </h1>
            <p className="text-center mb-8 text-rose-50 max-w-md">
                You do not have permission to access this page or perform this action.
            </p>
            <Link
                to="/menu"
                className="block rounded-md px-6 py-2 font-medium bg-teal-300 text-neutral-900 text-center transition-colors hover:bg-teal-400"
            >
                Back to Menu
            </Link>
        </div>
    )
}
