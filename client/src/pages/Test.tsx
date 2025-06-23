import { useContext, useEffect, useState } from "react"
import { useAxiosPrivate } from "../hooks/useAxiosPrivate"
import { jwtDecode, type JwtPayload } from "jwt-decode"
import { AuthContext } from "../Context/AuthProvider"


export const Test: React.FC = () => {
    const [response, setResponse] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [countdown, setCountdown] = useState<number>(0)
    const axiosPrivate = useAxiosPrivate()

    const { auth } = useContext(AuthContext)


    function getTokenExpiration(token: string) {
        const decodedToken = jwtDecode<JwtPayload>(token)

        // iat - Issuad At - iat: 1719165200 → 23 de junho de 2025, 15:00:00 UTC. Exemplo
        // exp - Expiration Time - exp: 1719165596 → 23 de junho de 2025, 15:06:36 UTC. Exemplo

        if (!decodedToken.exp) {
            console.warn("Token does not have an expiration time.")
            return 0
        }

        const exp = decodedToken.exp * 1000 // transformar para milissegundos
        const now = Date.now()

        const timeLeft = Math.floor((exp - now) / 1000) // tempo em segundos

        return timeLeft > 0 ? timeLeft : 0
    }


    async function getData() {
        setIsLoading(true)
        setResponse("")
        setError("")

        try {
            const res = await axiosPrivate.get("/test")
            setResponse(res.data.message)
            console.log("☑️ Request successfull!")
        } catch (error: unknown) {
            console.error("Request error:", error)
            setError("Failed to fetch protected data")
        } finally {
            setIsLoading(false)
        }
    }

    // Efeito para contar o tempo até expirar
    useEffect(() => {
        if (!auth.accessToken) {
            setCountdown(0)
            return
        }

        const timeLeft = getTokenExpiration(auth.accessToken)
        setCountdown(timeLeft)

        const interval = setInterval(() => {
            setCountdown(prevState => {
                if (prevState <= 1) {
                    clearInterval(interval)
                    return 0
                }

                return prevState - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [auth.accessToken])


    useEffect(() => {
        getData()
    }, [axiosPrivate])

    return (
        <main className="relative min-h-[calc(100vh-64px)] bg-gradient-to-r text-white from-[#0a0a0a] via-[#2b8d6c] to-[#0a0a0a]">
            <h1 className="pt-20 text-5xl uppercase font-extrabold text-center bg-gradient-to-r from-[#2b8d6c] via-[#78c2ad] to-[#2b8d6c] bg-clip-text text-transparent drop-shadow-md">
                JWT Token Demonstration
            </h1>

            <section className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-[#333] rounded w-3/6 flex flex-col items-center justify-center gap-4">
                <div className="text-sm text-white/70">
                    Access Token expires in:{" "}
                    <span className={`font-bold ${countdown <= 5 ? "text-red-500" : "text-green-400"}`}>
                        {countdown}s
                    </span>
                </div>

                {isLoading && <p className="text-white font-semibold">Loading...</p>}

                {error && (
                    <div className="w-full p-3 rounded-md bg-red-900/30 border border-red-700">
                        <p className="text-red-300">{error}</p>
                    </div>
                )}

                {response && (
                    <div className="w-full p-3 rounded-md bg-green-900/30 border border-green-700">
                        <p className="text-green-300">{response}</p>
                    </div>
                )}

                <button
                    onClick={getData}
                    type="button"
                    className="mt-4 border rounded px-4 py-2 cursor-pointer hover:bg-white/20 transition-colors duration-300 ease-in-out"
                >
                    Test Token Again
                </button>

                <p className="text-white/60">Check Console on DevTools to see the authentication process.</p>
            </section>
        </main>
    )
}
