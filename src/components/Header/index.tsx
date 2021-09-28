import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import EyeIcon from '../../assets/eye.svg'
import PowerIcon from '../../assets/power.svg'

import styles from './styles.module.scss'


export function Header() {
    const history = useHistory()
    const { user, signOut, handleShowSummary } = useContext(AuthContext)

    const defaultImage = 'https://user-images.githubusercontent.com/62356988/130330350-5ee94f12-1509-4b50-b876-4f0aa5e30a1a.jpg'

    async function handleSignOut() {
        await signOut()
        history.push('/')
    }

    return (
        <header className={styles.headerContainer}>
            <div>
                <main>
                    <img src={user?.avatar || defaultImage} alt="myFinances" />
                    
                    <span>
                        <p>Olá,</p>
                        <strong>{user?.name}</strong>
                    </span>
                </main>

                <nav>
                    <button
                        type="button"
                        onClick={handleShowSummary}
                        data-tip="Mostrar/Esconder"
                    >
                        <img src={EyeIcon} alt="Olho" />
                    </button>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        data-tip="Sair"
                    >
                        <img src={PowerIcon} alt="Sair" />
                    </button>
                </nav>
            </div>
        </header>
    )
}