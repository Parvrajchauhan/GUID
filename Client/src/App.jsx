import { RouterProvider } from "react-router"
import { Router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
function App() {
 
  return (
    <AuthProvider>
      <RouterProvider router={Router}/>
    </AuthProvider>
    
  )
}

export default App
