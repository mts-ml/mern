import { jwtDecode } from "jwt-decode"
import { createContext, useEffect, useState } from "react"
import { axiosInstance } from "../api/axios";
import type { UserProps } from "../types/UserTypes";


interface ProviderProps {
    children: React.ReactNode
}

export interface AuthData {
    email?: string;
    roles?: number[];
    accessToken?: string;
}

interface ContextData {
    auth: AuthData,
    setAuth: React.Dispatch<React.SetStateAction<AuthData>>
    loading: boolean
    formErrors: Partial<UserProps> & { general?: string }
    setFormErrors: React.Dispatch<React.SetStateAction<Partial<UserProps> & {
        general?: string;
    }>>
}

interface TokenProps {
    UserInfo: {
        email: string
        roles: number[]
    }
}


const defaultContextValue: ContextData = {
    auth: {},
    setAuth: () => { },
    loading: true,
    formErrors: {},
    setFormErrors: () => { }
}

export const AuthContext = createContext<ContextData>(defaultContextValue)


export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthData>({})
    const [loading, setLoading] = useState<boolean>(true)

    const [formErrors, setFormErrors] = useState<Partial<UserProps> & { general?: string }>({})

    
    useEffect(() => {
        let isMounted = true

        const controller = new AbortController()
        //  Isso cria um "interruptor" que pode cancelar operações assíncronas.

        async function verifyAuth() {
            try {
                const response = await axiosInstance.get('/refresh',
                    {
                        withCredentials: true, // Envia os cookies (incluindo o Refresh Token) junto com a requisição.
                        signal: controller.signal // Permite cancelar a requisição se o componente for desmontado.
                    })
                console.log('Resposta do /refresh =>', response.data)

                if (isMounted) {
                    const accessToken: string = response.data.accessToken
                    const decoded = jwtDecode<TokenProps>(accessToken)

                    setAuth({
                        email: decoded.UserInfo.email,
                        roles: decoded.UserInfo.roles,
                        accessToken
                    })
                }
            } catch (error) {
                if (isMounted) {
                    setAuth({})
                    console.log(`Error verifying authentication ${error}`)
                }

                if (error instanceof Error) {
                    if (error?.name === 'AbortError') {
                        console.log('Requisição cancelada intencionalmente')
                    } else {
                        console.log(error.message)
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }
        verifyAuth()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])


    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            loading,
            formErrors,
            setFormErrors
        }}>
            {children}
        </AuthContext.Provider>
    )
}
