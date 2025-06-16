import { useContext } from "react"
import { AuthContext } from "../Context/AuthProvider"
import { Navigate, Outlet, useLocation } from "react-router-dom"


interface RequireAuthProps {
    allowedRoles: number[]
}


export const RouteAuthentication: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const { auth, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        auth?.roles?.some(role => allowedRoles.includes(role))
            ?
            <Outlet />
            :
            auth.email ?
                <Navigate to="/unauthorized" state={{ from: location }} replace />
                :
                <Navigate to="/login" state={{ from: location }} replace />
    )
}
