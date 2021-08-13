import React from 'react'

import { Summary } from '../Summary'
import { TransactionsTable } from '../TransactionsTable'

import styles from './styles.module.scss'


export function Dashboard() {
    return (
        <main className={styles.DashContainer}>
            <Summary />
            <TransactionsTable />
        </main>
    )
}