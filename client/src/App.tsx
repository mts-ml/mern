import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "./pages/Layout"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"

import ErrorPage from "./pages/ErrorPage"
import { RouteAuthentication } from "./components/RouteAuthentication"
import { ROLES_LIST } from "./config/roles_list"
import { Admin } from "./pages/Admin"
import { Unauthorized } from "./pages/Unauthorized"
import { Teste } from "./pages/Teste"


function App() {
  return (
    <Routes>
      <Route element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Navigate to='/login' replace />} />
        <Route path='login' element={<Home />} />
        <Route path="register" element={<Register />} />

        <Route element={<RouteAuthentication allowedRoles={[ROLES_LIST.Admin]} />} >
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RouteAuthentication allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User]} />} >
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        <Route element={<RouteAuthentication allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor]} />}>
          <Route path="teste" element={<Teste />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>

  )
}

export default App
