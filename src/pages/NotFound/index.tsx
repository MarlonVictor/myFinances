import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from './styles.module.scss'


export function NotFound() {
    const history = useHistory()

    function goToHome() {
        history.push('/')
    }

    function goBack() {
        history.goBack()
    }

    return (
        <div className={styles.NotFoundContainer}>
            <header>
                <h1>404</h1>
                <h3>page not found</h3>
            </header>
            <footer>
                <p>Parece que não conseguimos encontrar a página que você estava procurando!</p>
                <div>
                    <button onClick={goBack}>Back</button>
                    <button onClick={goToHome}>Home</button>
                </div>
            </footer>
        </div>
    )
} 