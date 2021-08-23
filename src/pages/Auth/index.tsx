import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'

import { AuthContext } from '../../contexts/AuthContext'

import GoogleIcon from '../../assets/google-icon.svg'
import LogoImage from '../../assets/logo.svg'
import AuthImage from '../../assets/auth.svg'

import styles from './styles.module.scss'


export function Auth() {
    const history = useHistory()
    const { user, signInWithGoogle } = useContext(AuthContext)

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [30, -30])
    const rotateY = useTransform(x, [-100, 100], [-30, 30])

    async function handleSignIn() {
        await signInWithGoogle()

        history.push('/home')
    }

    useEffect(() => {
        if (user) {
            history.push('/home')
        }
    }, [user])

    return (
        <div className={styles.AuthContainer}>
            <main>
                <img 
                    src={LogoImage} 
                    alt="myFinances" 
                    className={styles.financesLogo}
                />

                <div>
                    <h1>Controle suas finanças em um só lugar e de forma muito simples.</h1>
                    <h4>Faça seu login com o Google para acessar sua dashboard</h4>
                </div>

                <button className={styles.AuthButton} onClick={handleSignIn}>
                    <img src={GoogleIcon} alt="Google" />
                    <span>Entrar com Google</span>
                </button>
            </main>

            <motion.img 
                src={AuthImage} 
                alt="myFinances" 
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'easeOut' }}
                style={{ x, y, rotateX, rotateY, z: 100 }}
                whileHover={{ cursor: 'grabbing' }}
                drag
                dragElastic={0.16}
                dragConstraints={{ top: 0, left: 0, bottom: 0, right: 0}}
            />
        </div>
    )
}