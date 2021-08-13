import React, { useState } from 'react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Dashboard } from './components/Dashboard'
import { NewTransaction } from './components/NewTransaction'

import './styles/global.scss'


function App() {
    const [showDashboard, setShowDashboard] = useState(true)

    return (
        <>
            <Header />

            {showDashboard
                ? <Dashboard />
                : <NewTransaction />
            }

            <Footer 
                showDashboard={showDashboard}
                setContent={setShowDashboard}
            />

        </>
    )
}

export default App