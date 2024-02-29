import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <SocketContextProvider>
                    <App />
                </SocketContextProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
)
