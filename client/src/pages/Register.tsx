import axios from "axios"
import { useState } from "react"
import type { LoginErrors, UserProps } from "../types/UserTypes"





export const Register: React.FC = () => {
    const [form, setForm] = useState<UserProps>({
        email: "",
        password: ""
    })

    const [formErrors, setFormErrors] = useState<LoginErrors>({})

    const [isSubmit, setSubmit] = useState<boolean>(false)


    function formValidation(formData: UserProps): LoginErrors {
        const error: LoginErrors = {}
        const { email, password } = formData

        if (!email) {
            error.email = [...(error.email || []), "This field is required"]
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                error.email = [...(error.email || []), "Invalid email address"]
            }
        }

        if (!password) {
            error.password = [...(error.password || []), "This field is required"]
        }
        if (password.length < 8) {
            error.password = [...(error.password || []), "Password need at least 8 characters"]
        }


        const hasNumber = /\d/.test(password)
        const hasUpperCaseLetter = /[A-Z]/.test(password)
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password)

        if (!hasNumber) {
            error.password = [...(error.password || []), "Password must contain at least one number\n"]
        }
        if (!hasUpperCaseLetter) {
            error.password = [...(error.password || []), "Password must contain at least one uppercase letter"]
        }
        if (!hasSpecialCharacter) {
            error.password = [...(error.password || []), "Password must contain at least one special character"]
        }

        return error
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const errors = formValidation(form)
        setFormErrors(errors)

        if (Object.keys(errors).length > 0) return

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/register", form)
            console.log("Account successful created")
            setForm({
                email: '',
                password: ''
            })

            setSubmit(true)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    setFormErrors(prevState => ({
                        ...prevState,
                        email: [...(prevState.email || []), "Email already registered"]
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

        setSubmit(false)
    }


    return (
        <main className="relative min-h-[calc(100vh-64px)] bg-stone-200">
            <h1 className="pt-20 font-medium text-center">REGISTER</h1>

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

                <div className="text-red-500 text-sm pt-1"
                    id="emailError"
                    aria-live="polite"
                >
                    {formErrors.email?.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>



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

                <div
                    className="text-red-500 text-sm pt-1"
                    id="passwordError"
                    aria-live="polite"
                >
                    {formErrors.password?.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>

                <button
                    type="submit"
                    className="block mt-8 mb-4 border rounded px-2 py-1 mx-auto cursor-pointer hover:bg-white/30 transition-colors duration-300 ease-in-out"
                >
                    Sign up
                </button>

                {isSubmit &&
                    <p className="text-center font-medium">Account successfully created!</p>
                }
            </form>
        </main>
    )
}
