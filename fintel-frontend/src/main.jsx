import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// ✅ ADD THIS
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ WRAP YOUR APP */}
    <GoogleOAuthProvider clientId="1028884534930-unrog6cfpm7s8d8iu0h883urhif1spjh.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)