import { useContext, useEffect } from "react"
import { useRefreshToken } from "./useRefreshToken"
import { AuthContext } from "../Context/AuthProvider"
import { axiosPrivate } from "../api/axios"


export const useAxiosPrivate = () => {
    const refresh = useRefreshToken() // Hook que renova o token
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        // Interceptor de request → antes de enviar requisição
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`
                }
                return config
            },
            error => Promise.reject(error)
        )

        // Interceptor de response → após receber resposta
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response, // Se a resposta estiver OK, só retorna ela

            async (error) => {
                // configuração da requisição que falhou (url, método, headers, body, etc.)
                const previousRequest = error?.config

                // Se deu erro 401 (não autorizado) e ainda não tentamos renovar
                if (error?.response?.status === 401 && !previousRequest?.sent) {
                    previousRequest.sent = true // Marca como tentado para não criar loop infinito

                    try {
                        const newAccessToken = await refresh()

                        previousRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

                        // Refaz a requisição anterior com o token novo
                        return axiosPrivate(previousRequest)

                    } catch (refreshError) {
                        return Promise.reject(refreshError)
                    }
                }

                // Se não for 401, ou já tentou renovar, retorna erro normalmente
                return Promise.reject(error)
            }
        )

        // Remove os interceptors quando desmontar o componente
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh]) // Dispara sempre que auth ou refresh mudar

    return axiosPrivate // Retorna a instância pronta
}
