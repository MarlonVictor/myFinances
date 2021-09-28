import { useEffect, useState } from 'react'

import { database } from '../services/firebase'


type FirebaseTransactions = Record<string, {
    name: string
    type: string
    price: string
    category: string
    createdAt: string
}>

type TransactionType = {
    id: string
    name: string
    type: string
    price: number
    category: string
    createdAt: string
}

export function useUser(userId: string | undefined) {
    const [transactions, setTransactions] = useState<TransactionType[]>([])

    useEffect(() => {
        const userRef = database.ref(`users/${userId}`)

        userRef.on('value', user => {
            const databaseUser = user.val()
            const firebaseTransactions: FirebaseTransactions = databaseUser ? databaseUser.transactions : {}

            const parsedTransactions = Object.entries(firebaseTransactions).map(([ key, value ]) => {
                return {
                    id: key,
                    name: value.name,
                    type: value.type,
                    price: Number(value.price),
                    category: value.category,
                    createdAt: value.createdAt
                }
            })

            setTransactions(parsedTransactions)
        })
        
        return () => userRef.off('value')
    }, [userId])

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

    return { transactions, summary }
}