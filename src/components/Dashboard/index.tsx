import React, { useState } from 'react'
import { Footer } from '../Footer'

import { Summary } from '../Summary'
import { TransactionsTable } from '../TransactionsTable'

import styles from './styles.module.scss'


export function Dashboard() {
    const [dashOpen, setDashOpen] = useState(true)

    return (
        <main className={styles.DashContainer}>
            <Summary />

            <TransactionsTable />
            
            <Footer 
                dashOpen={dashOpen}
                setContent={setDashOpen}
            />
        </main>
    )
}