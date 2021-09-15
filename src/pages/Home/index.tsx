import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Dashboard } from '../../components/Dashboard'
import { NewTransaction } from '../../components/NewTransaction'


export function Home() {
    const history = useHistory()
    const { user } = useContext(AuthContext)

    const [showDashboard, setShowDashboard] = useState(true)

    useEffect(() => {
        if (!user) {
            history.push('/')
        }
    }, [user])

    return (
        <>
            <Header />

            {showDashboard
                ? (
                    <motion.main
                        initial={{ opacity: 0, x: -500 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -500 }}
                        transition={{ ease: 'easeOut' }}
                    >
                        <Dashboard />
                    </motion.main>
                )
                : (
                    <motion.div
                        initial={{ opacity: 0, x: 500 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 500 }}
                        transition={{ ease: 'easeOut' }}
                    >
                        <NewTransaction />
                    </motion.div>
                )
            }

            <Footer 
                showDashboard={showDashboard}
                setContent={setShowDashboard}
            />
        </>
    )
}