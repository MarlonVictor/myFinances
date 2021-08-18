import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Dashboard } from '../../components/Dashboard'
import { NewTransaction } from '../../components/NewTransaction'


export function Home() {
    const [showDashboard, setShowDashboard] = useState(true)

    return (
        <AnimatePresence>
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
        </AnimatePresence>
    )
}