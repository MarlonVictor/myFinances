import React from 'react'
import { motion } from 'framer-motion'

import styles from './styles.module.scss'

export function FloatingBlocks() {
    return (
        <>
            <motion.svg
                className={`${styles.floatingBlock} ${styles.floatingBlockLeft}`}
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <rect width="48" height="48" rx="5" fill="#585666" />
                <path
                    d="M16 15H32C32.2652 15 32.5196 15.1054 32.7071 15.2929C32.8946 15.4804 33 15.7348 33 16V32C33 32.2652 32.8946 32.5196 32.7071 32.7071C32.5196 32.8946 32.2652 33 32 33H16C15.7348 33 15.4804 32.8946 15.2929 32.7071C15.1054 32.5196 15 32.2652 15 32V16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15ZM17 17V31H31V17H17ZM23 23V19H25V23H29V25H25V29H23V25H19V23H23Z"
                    fill="white"
                />
            </motion.svg>

            <motion.svg
                className={`${styles.floatingBlock} ${styles.floatingBlockRight}`}
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
                <rect width="48" height="48" rx="5" fill="#585666" />
                <path
                    d="M32 34H16C15.735 34 15.48 33.895 15.293 33.707C15.105 33.52 15 33.265 15 33V15C15 14.735 15.105 14.48 15.293 14.293C15.48 14.105 15.735 14 16 14H32C32.265 14 32.52 14.105 32.707 14.293C32.895 14.48 33 14.735 33 15V33C33 33.265 32.895 33.52 32.707 33.707C32.52 33.895 32.265 34 32 34ZM31 32V16H17V32H31ZM20 19H28V21H20V19ZM20 23H28V25H20V23ZM20 27H25V29H20V27Z"
                    fill="white"
                />
            </motion.svg>
        </>
    )
}
