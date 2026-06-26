import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import EyeIcon from '../../assets/eye.svg'
import PowerIcon from '../../assets/power.svg'
import DefaultAvatar from '../../assets/default-avatar.svg'

import styles from './styles.module.scss'


export function Header() {
    const history = useHistory()
    const { user, signOut, handleShowSummary } = useContext(AuthContext)
    const [avatarSrc, setAvatarSrc] = useState(DefaultAvatar)

    useEffect(() => {
        setAvatarSrc(user?.avatar || DefaultAvatar)
    }, [user?.avatar])

    async function handleSignOut() {
        await signOut()
        history.push('/')
    }

    function handleAvatarError() {
        setAvatarSrc(DefaultAvatar)
    }

    return (
        <header className={styles.headerContainer}>
            <div>
                <main>
                    <img
                        src={avatarSrc}
                        alt={user?.name || 'Avatar'}
                        onError={handleAvatarError}
                    />

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
