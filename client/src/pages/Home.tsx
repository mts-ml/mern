import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { CustomJwtPayload, UserProps } from "../types/UserTypes"
import { AuthContext } from "../Context/AuthProvider"
import { jwtDecode } from "jwt-decode";


export const Home: React.FC = () => {
    const { setAuth } = useContext(AuthContext)

    const [form, setForm] = useState<UserProps>({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const [formErrors, setFormErrors] = useState<Partial<UserProps> & { general?: string }>({})

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)


    function formValidation(formData: UserProps): Partial<UserProps> {
        const error: Partial<UserProps> = {}
        const { email, password } = formData

        if (!email) {
            error.email = "This field is required"
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                error.email = "Invalid email address"
            }
        }

        if (!password) {
            error.password = "This field is required"
        } else if (password.length <= 8) {
            error.password = "Password needs at least 8 characters"
        }
        return error
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const errors = formValidation(form)
        setFormErrors(errors)

        if (Object.keys(errors).length > 0) return

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/login", form,
                { withCredentials: true }
            )

            const decoded = jwtDecode<CustomJwtPayload>(response.data.accessToken)

            setAuth({
                email: decoded.UserInfo?.email,
                roles: decoded.UserInfo?.roles,
                accessToken: response?.data?.accessToken,
            })
             console.log('Auth set:', decoded.UserInfo.roles)

            setForm({
                email: '',
                password: ''
            })

            setIsLoggedIn(true)

            setTimeout(() => {
                navigate('/admin')
            }, 1500)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setFormErrors(prevState => ({
                        ...prevState,
                        general: "Invalid credentials"
                    }))
                } else if (!error.response) {
                    setFormErrors(prevState => ({
                        ...prevState, general: "No server response"
                    }))
                } else {
                    console.log(`Unexpected error - ${error.response?.data?.error}`)
                }
            } else {
                console.log(`Unknown error - ${error}`)
            }
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.currentTarget

        setForm(previousState => ({
            ...previousState,
            [name]: value
        }))

        setIsLoggedIn(false)
    }


    return (
        <main className="relative min-h-[calc(100vh-64px)] bg-stone-200">
            <h1 className="pt-20 font-medium text-center">LOGIN</h1>

            <form
                onSubmit={handleSubmit}
                className="text-white absolute left-1/2 top-1/2 -translate-1/2 p-8 bg-[#333] rounded w-1/3"
            >
                {/* EMAIL */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-medium cursor-pointer">E-mail:</label>
                    <input
                        className="border rounded-[10px] pl-2 h-8"
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        aria-describedby="emailError"
                    />
                </div>

                <p
                    className="text-red-500 text-sm pt-1"
                    id="emailError"
                    aria-live="polite"
                >
                    {formErrors.email}
                </p>


                {/* PASSWORD */}
                <div className="flex flex-col mt-4">
                    <label htmlFor="password" className="font-medium cursor-pointer">Password:</label>
                    <input
                        className="border rounded-[10px] pl-2 h-8"
                        type="password"
                        id="password"
                        placeholder="example123&"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        aria-describedby="passwordError"
                    />
                </div>

                <p
                    className="text-red-500 text-sm pt-1 mb-6"
                    id="passwordError"
                    aria-live="polite"
                >
                    {formErrors.password}
                </p>

                {formErrors.general &&
                    <p
                        className="text-red-500 text-sm mt-6 text-center"
                        aria-live="polite"
                    >
                        {formErrors.general}
                    </p>
                }

                {isLoggedIn &&
                    <p
                        className="text-green-600 font-medium text-sm mt-6 text-center"
                        aria-live="polite"
                    >
                        Login successful! ✅
                    </p>
                }

                <button
                    type="submit"
                    className="block mt-3 mb-4 border rounded px-2 py-1 mx-auto cursor-pointer hover:bg-white/30 transition-colors duration-300 ease-in-out"
                >
                    Sign In
                </button>


                <div className="mt-2 text-center">
                    <p>Need an account?</p>
                    <h2><Link to='/register' className="relative custom-underline-white">
                        Sign Up
                    </Link></h2>
                </div>
            </form>
        </main>
    )
}
