import React, { useContext, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
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

            <AnimatePresence exitBeforeEnter>
                {showDashboard
                    ? (
                        <motion.main
                            key="dashboard"
                            initial={{ opacity: 0, x: -32 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -32 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Dashboard />
                        </motion.main>
                    )
                    : (
                        <motion.div
                            key="new-transaction"
                            initial={{ opacity: 0, x: 32 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 32 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <NewTransaction />
                        </motion.div>
                    )
                }
            </AnimatePresence>

            <Footer 
                showDashboard={showDashboard}
                setContent={setShowDashboard}
            />

            <ReactTooltip place="bottom" type="dark" />
        </>
    )
}