import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./pages/Layout"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"

import ErrorPage from "./pages/ErrorPage"


function App() {
  return (
    <Routes>
      <Route element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Navigate to='/login' replace />} />
        <Route path='login' element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>

  )
}

export default App
