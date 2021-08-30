import React from 'react'
import ReactTooltip from 'react-tooltip'
import { useHistory } from 'react-router-dom'

import EyeIcon from '../../assets/eye.svg'
import PowerIcon from '../../assets/power.svg'

import styles from './styles.module.scss'


type HeaderProps = {
    userName: string | undefined
    userImage: string | undefined | null
    signOut: () => Promise<void>
}

export function Header({ userName, userImage, signOut }: HeaderProps) {
    const history = useHistory()
    const defaultImage = 'https://user-images.githubusercontent.com/62356988/130330350-5ee94f12-1509-4b50-b876-4f0aa5e30a1a.jpg'

    function handleHide() {
        console.log('Hide')
    }

    async function handleSignOut() {
        await signOut()
        history.push('/')
    }

    return (
        <header className={styles.headerContainer}>
            <div>
                <main>
                    <img src={userImage || defaultImage} alt="myFinances" />
                    
                    <span>
                        <p>Olá,</p>
                        <strong>{userName}</strong>
                    </span>
                </main>

                <nav>
                    <button
                        type="button"
                        onClick={handleHide}
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

                    <ReactTooltip place="bottom" type="light" />
                </nav>
            </div>
        </header>
    )
}