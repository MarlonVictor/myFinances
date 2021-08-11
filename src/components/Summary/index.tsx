import React from 'react'

import IncomeIcon from '../../assets/income.svg'
import OutcomeIcon from '../../assets/outcome.svg'
import TotalIcon from '../../assets/total.svg'

import styles from './styles.module.scss'


export function Summary() {
    return (
        <div className={styles.SummaryContainer}>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeIcon} alt="Entradas" />
                </header>
                <strong>R$1000,00</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeIcon} alt="Saídas" />
                </header>
                <strong>- R$100,00</strong>
            </div>
            <div>
                <header>
                    <p>Total</p>
                    <img src={TotalIcon} alt="Total" />
                </header>
                <strong>R$900,00</strong>
            </div>
        </div>
    )
}