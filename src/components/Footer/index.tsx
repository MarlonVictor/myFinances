import React from 'react'
import { BiListUl, BiDollar } from 'react-icons/bi'

import styles from './styles.module.scss'


type FooterProps = {
    showDashboard: boolean,
    setContent: (value: boolean) => void
}

export function Footer({ showDashboard, setContent }: FooterProps) {
    return (
        <footer className={styles.FooterContainer}>
            <div>
                <span 
                    onClick={() => setContent(true)}
                    className={showDashboard ? styles.selected : ''}
                >
                    <BiListUl />
                    Listagem
                </span>
                <span 
                    onClick={() => setContent(false)}
                    className={!showDashboard ? styles.selected : ''}
                >
                    <BiDollar />
                    Cadastrar
                </span>
            </div>
        </footer>
    )
}