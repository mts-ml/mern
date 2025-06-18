import { useContext } from "react"
import { axiosInstance } from "../api/axios"
import { AuthContext } from "../Context/AuthProvider"
import { useNavigate } from "react-router-dom"


export const LogoutButton = () => {
    const { setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axiosInstance.get('/logout', { withCredentials: true })
            setAuth({}) // Limpa o contexto
            navigate('/login')
        } catch (error) {
            console.error('Error logging out', error)
        }
    }


    return (
        <button
            className="cursor-pointer"
            type="submit"
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}
