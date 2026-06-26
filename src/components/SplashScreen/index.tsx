import React from 'react'
import { motion } from 'framer-motion'

import LogoImage from '../../assets/logo.svg'
import styles from './styles.module.scss'

export function SplashScreen() {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            <img
                src={LogoImage}
                alt="myFinances"
                className={styles.logo}
            />

            <div className={styles.progressTrack}>
                <motion.div
                    className={styles.progressBar}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    style={{ transformOrigin: 'left center' }}
                />
            </div>
        </motion.div>
    )
}
