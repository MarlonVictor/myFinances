import React from 'react'

import GoogleIcon from '../../assets/google-icon.svg'
import LogoImage from '../../assets/logo.svg'
import AuthImage from '../../assets/auth.svg'

import styles from './styles.module.scss'

export function Auth() {
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

                <button className={styles.AuthButton}>
                    <img src={GoogleIcon} alt="Google" />
                    <span>Entrar com Google</span>
                </button>
            </main>

            <img src={AuthImage} alt="myFinances" />
        </div>
    )
}