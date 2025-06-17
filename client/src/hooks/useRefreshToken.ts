import { useContext } from "react"
import { AuthContext } from "../Context/AuthProvider"
import { axiosInstance } from "../api/axios"


export const useRefreshToken = () => {
    const { setAuth } = useContext(AuthContext)

    async function refresh() {
        try {
            const response = await axiosInstance.get('/refresh',
                { withCredentials: true }
            )

            setAuth(prevState => {
                console.log(`AccessToken anterior - ${JSON.stringify(prevState)}`)
                console.log(`Novo accessToken - ${response.data.accessToken}`)
                return { ...prevState, accessToken: response.data.accessToken }
            })

            return response.data.accessToken
        } catch (error) {
            console.error(`Failed to refresh token ${error}`)
            setAuth({})
            throw error
        }
    }

    return refresh
}
