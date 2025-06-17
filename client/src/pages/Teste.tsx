import { useEffect, useState } from "react"
import { useAxiosPrivate } from "../hooks/useAxiosPrivate"


export const Teste: React.FC = () => {
    const axiosPrivate = useAxiosPrivate()

    const [response, setResponse] = useState<string>('')

    async function getData() {
        try {
            const res = await axiosPrivate.get('/teste')
            setResponse(res.data.success)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [axiosPrivate])


    return (
        <section>
            <h1>Testando rota protegida</h1>
            <p>{response}</p>
            <button onClick={getData}>Fazer nova requisição protegida</button>
        </section>
    )
}
