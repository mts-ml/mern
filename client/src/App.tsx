import { Routes, Route } from "react-router-dom"
import { Layout } from "./pages/Layout"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"

import ErrorPage from "./pages/ErrorPage"


function App() {
  return (
    <Routes>
      <Route element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>

  )
}

export default App
