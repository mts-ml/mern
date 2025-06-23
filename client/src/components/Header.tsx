import { Link, NavLink } from "react-router-dom"
import { LogoutButton } from "./LogoutButton"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthProvider"


export const Header: React.FC = () => {
    const { auth } = useContext(AuthContext)

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[1px] after:w-full after:bg-white after:opacity-100 after:scale-x-100 after:transition-all"
            : "relative hover:text-gray-300 transition-colors";


    return (
        <header className="bg-stone-700 text-white">
            <nav className="container mx-auto flex items-center justify-between h-16 px-4">
                <h1 className="text-xl font-bold">
                    <Link to="/">My App</Link>
                </h1>

                <ul className="flex space-x-6 font-semibold">
                    <li>
                        <NavLink to="/login" className={navLinkClass}>
                            Login
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/register" className={navLinkClass}>
                            Sign up
                        </NavLink>
                    </li>

                    {/* Private */}
                    {auth.accessToken &&
                        <>
                            <li>
                                <NavLink to="/menu" className={navLinkClass}>
                                    Menu
                                </NavLink>
                            </li>

                            <li>
                                <LogoutButton />
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}
