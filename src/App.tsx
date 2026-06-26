import React from 'react'

import { AuthContextProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { AppShell } from './components/AppShell'

import './styles/global.scss'

function App() {
    return (
        <AuthContextProvider>
            <ToastProvider>
                <AppShell />
            </ToastProvider>
        </AuthContextProvider>
    )
}

export default App