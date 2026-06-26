import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

import { AuthContext } from '../../contexts/AuthContext'

import GoogleIcon from '../../assets/google-icon.svg'
import LogoImage from '../../assets/logo.svg'
import AuthImage from '../../assets/auth.svg'

import { FloatingBlocks } from './FloatingBlocks'
import { DOLLAR_SYMBOLS } from './dollarSymbols'
import styles from './styles.module.scss'

const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
}

export function Auth() {
    const history = useHistory()
    const { signInWithGoogle } = useContext(AuthContext)

    async function handleSignIn() {
        await signInWithGoogle()

        history.push('/home')
    }

    return (
        <div className={styles.AuthContainer}>
            <main>
                <motion.img
                    src={LogoImage}
                    alt="myFinances"
                    className={styles.financesLogo}
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0 }}
                />

                <motion.div className={styles.textContent} style={{ perspective: 800 }}>
                    <motion.h1
                        initial={{ opacity: 0, rotateX: -85 }}
                        animate={{ opacity: 1, rotateX: 0 }}
                        transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: 'bottom center' }}
                    >
                        Controle suas finanças em um só lugar e de forma muito simples.
                    </motion.h1>
                    <motion.h4
                        {...fadeIn}
                        transition={{ ...fadeIn.transition, delay: 0.15 }}
                    >
                        Faça seu login com o Google para acessar sua dashboard
                    </motion.h4>
                </motion.div>

                <motion.button
                    className={styles.AuthButton}
                    onClick={handleSignIn}
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.55 }}
                >
                    <img src={GoogleIcon} alt="Google" />
                    <span>Entrar com Google</span>
                </motion.button>
            </main>

            <section className={styles.visualSide}>
                <div className={styles.dollarField} aria-hidden="true">
                    {DOLLAR_SYMBOLS.map((cfg, i) => (
                        <motion.span
                            key={i}
                            className={styles.dollarSymbol}
                            style={{
                                left: cfg.left,
                                top: cfg.top,
                                fontSize: cfg.fontSize,
                                opacity: cfg.opacity,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, 8, 0],
                                rotate: [0, 5, 0],
                            }}
                            transition={{
                                duration: cfg.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: cfg.delay,
                            }}
                        >
                            $
                        </motion.span>
                    ))}
                </div>

                <div className={styles.heroImage}>
                    <FloatingBlocks />
                    <motion.img
                        className={styles.authImage}
                        src={AuthImage}
                        alt="myFinances"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                </div>
            </section>
        </div>
    )
}
