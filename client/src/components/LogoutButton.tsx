import { useContext } from "react"
import { axiosInstance } from "../api/axios"
import { AuthContext } from "../Context/AuthProvider"
import { useNavigate } from "react-router-dom"


export const LogoutButton = () => {
    const { setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout', {}, { withCredentials: true })
            setAuth({}) // Limpa o contexto
            navigate('/login')
        } catch (error) {
            console.error('Error logging out', error)
        }
    }


    return (
        <button type="submit" onClick={handleLogout}>
            Logout
        </button>
    )
}
