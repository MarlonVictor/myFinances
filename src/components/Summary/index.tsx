import React, { useContext, useEffect, useState } from 'react'

import { useUser } from '../../hooks/useUser'
import { AuthContext } from '../../contexts/AuthContext'

import IncomeIcon from '../../assets/income.svg'
import OutcomeIcon from '../../assets/outcome.svg'
import TotalIcon from '../../assets/total.svg'

import styles from './styles.module.scss'


export function Summary() {
    const { user } = useContext(AuthContext)
    const { transactions } = useUser(user?.id)

    const [lastIncome, setLastIncome] = useState('')
    const [lastOutcome, setLastOutcome] = useState('')

    useEffect(() => {
        transactions.map(transaction => {
            transaction.type === 'income' ? setLastIncome(transaction.createdAt) : setLastOutcome(transaction.createdAt)
        })
    }, [transactions])

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            acc.deposits += transaction.price
            acc.total += transaction.price

        } else {
            acc.withdraws += transaction.price
            acc.total -= transaction.price
        }

        return acc
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    return (
        <div className={styles.SummaryContainer}>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeIcon} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}
                </strong>
                {lastIncome && (
                    <small>
                        Última entrada dia
                        <em>
                            {new Intl.DateTimeFormat('pt-BR').format(
                                new Date(lastIncome)
                            )}
                        </em>
                    </small>
                )}
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeIcon} alt="Saídas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}
                </strong>
                {lastOutcome && (
                    <small>
                        Última saída dia
                        <em>
                            {new Intl.DateTimeFormat('pt-BR').format(
                                new Date(lastOutcome)
                            )}
                        </em>
                    </small>
                )}
            </div>
            <div>
                <header>
                    <p>Total</p>
                    <img src={TotalIcon} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}
                </strong>
            </div>
        </div>
    )
}