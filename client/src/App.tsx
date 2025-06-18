import { Routes, Route } from "react-router-dom"
import { Layout } from "./pages/Layout"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Admin } from "./pages/Admin"
import { Editor } from "./pages/Editor"
import { Lounge } from "./pages/Lounge"
import { Teste } from "./pages/Teste"
import { User } from "./pages/User"
import { Unauthorized } from "./pages/Unauthorized"

import ErrorPage from "./pages/ErrorPage"
import { RouteAuthentication } from "./components/RouteAuthentication"
import { ROLES_LIST } from "./config/roles_list"


function App() {
  return (
    <Routes>
      <Route element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<RouteAuthentication allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        <Route element={<RouteAuthentication allowedRoles={[ROLES_LIST.Admin]} />} >
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RouteAuthentication allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor]} />} >
          <Route path="editor" element={<Editor />} />
        </Route>
        

        <Route element={<RouteAuthentication allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User]} />} >
          <Route path="user" element={<User />} />
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
