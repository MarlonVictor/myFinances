import React from 'react'
import { BiListUl, BiDollar } from 'react-icons/bi'

import styles from './styles.module.scss'


type FooterProps = {
    dashOpen: boolean,
    setContent: (value: boolean) => void
}

export function Footer({ dashOpen, setContent }: FooterProps) {
    return (
        <footer className={styles.FooterContainer}>
            <div>
                <span 
                    onClick={() => setContent(true)}
                    className={dashOpen ? styles.selected : ''}
                >
                    <BiListUl />
                    Listagem
                </span>
                <span 
                    onClick={() => setContent(false)}
                    className={!dashOpen ? styles.selected : ''}
                >
                    <BiDollar />
                    Cadastrar
                </span>
            </div>
        </footer>
    )
}