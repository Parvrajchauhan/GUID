import { RouterProvider } from "react-router"
import { Router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { ReportProvider } from "./features/Report/report.context.jsx"
function App() {
 
  return (
    <AuthProvider>
      <ReportProvider>
      <RouterProvider router={Router}/>
      </ReportProvider>
    </AuthProvider>
    
  )
}

export default App
