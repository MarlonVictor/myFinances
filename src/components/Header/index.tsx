import React from 'react'
import ReactTooltip from 'react-tooltip'

import EyeIcon from '../../assets/eye.svg'
import PowerIcon from '../../assets/power.svg'

import styles from './styles.module.scss'


export function Header() {
    function handleHide() {
        console.log('Hide')
    }

    function handleLogout() {
        console.log('Sair')
    }

    return (
        <header className={styles.headerContainer}>
            <div>
                <main>
                    <img src="https://avatars.githubusercontent.com/u/62356988?v=4" alt="myFinances" />
                    
                    <span>
                        <p>Olá,</p>
                        <strong>Marlon</strong>
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
                        onClick={handleLogout}
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