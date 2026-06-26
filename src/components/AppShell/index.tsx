import React, { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { AuthContext } from '../../contexts/AuthContext'
import { SplashScreen } from '../SplashScreen'
import Routes from '../../routes'

import styles from './styles.module.scss'

const MIN_SPLASH_MS = 900

export function AppShell() {
    const { isAuthReady } = useContext(AuthContext)
    const [showSplash, setShowSplash] = useState(true)
    const mountTime = useRef(Date.now())

    useEffect(() => {
        if (!isAuthReady) return

        const elapsed = Date.now() - mountTime.current
        const remaining = Math.max(0, MIN_SPLASH_MS - elapsed)

        const timer = setTimeout(() => setShowSplash(false), remaining)

        return () => clearTimeout(timer)
    }, [isAuthReady])

    useEffect(() => {
        document.body.style.overflow = showSplash ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [showSplash])

    return (
        <>
            <AnimatePresence>
                {showSplash && <SplashScreen key="splash" />}
            </AnimatePresence>

            {isAuthReady && !showSplash && (
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Routes />
                </motion.div>
            )}
        </>
    )
}
