import React, { useContext } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

import { useUser } from '../../hooks/useUser'
import { AuthContext } from '../../contexts/AuthContext'

import { transactionCategoryIcon } from '../../utils/transactionCategoryIcon'

import styles from './styles.module.scss'


export function TransactionsTable() {
    const { user } = useContext(AuthContext)
    const { transactions } = useUser(user?.id)

    return (
        <>
            {transactions.length > 0
                ? (
                    <>
                        <section className={styles.TableContainer}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Título <IoIosArrowDown/></th>
                                        <th>Valor <IoIosArrowDown/></th>
                                        <th>Categoria <IoIosArrowDown/></th>
                                        <th>Data <IoIosArrowDown/></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions.slice(0).reverse().map(transaction => {
                                        return (
                                            <tr key={transaction.id}>
                                                <td>{transaction.name}</td>
                                                <td 
                                                    className={
                                                        transaction.type == 'income' 
                                                            ? styles.deposit 
                                                            : styles.withdraw
                                                    }
                                                >
                                                    {transaction.type === 'outcome' ? '- ' : ''}
                                                    {new Intl.NumberFormat('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    }).format(transaction.price)}
                                                </td>
                                                <td>
                                                    {transactionCategoryIcon(transaction.category)}
                                                    {transaction.category}
                                                </td>
                                                <td>
                                                    {new Intl.DateTimeFormat('pt-BR').format(
                                                        new Date(transaction.createdAt)
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </section>

                        <section className={styles.MobileListContainer}>
                            <h2>Listagem</h2>

                            {transactions.slice(0).reverse().map(transaction => {
                                return (
                                    <div key={transaction.id}>
                                        <main>
                                            <p>{transaction.name}</p>
                                            <span
                                                className={
                                                    transaction.type == 'income' 
                                                        ? styles.deposit 
                                                        : styles.withdraw
                                                }
                                            >
                                                {transaction.type === 'outcome' ? '- ' : ''}
                                                {new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(transaction.price)}
                                            </span>
                                        </main>
                                        <footer>
                                            <span>
                                                {transactionCategoryIcon(transaction.category)}
                                                {transaction.category}
                                            </span>
                                            <span>
                                                {new Intl.DateTimeFormat('pt-BR').format(
                                                    new Date(transaction.createdAt)
                                                )}
                                            </span>
                                        </footer>
                                    </div>
                                )
                            })}
                        </section>
                    </>
                )
                : (
                    <section className={styles.NoTransactions}>
                        <h1>Sem Transações</h1>
                    </section>
                )
            }
        </>
    )
}

