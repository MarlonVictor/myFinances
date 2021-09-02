import { useEffect, useState } from 'react'

import { database } from '../services/firebase'


type FirebaseTransactions = Record<string, {
    name: string
    price: string
    category: string
    transactionType: string
}>

type TransactionType = {
    id: string
    name: string
    price: string
    category: string
    transactionType: string
}

export function useUser(userId: string | undefined) {
    const [transactions, setTransactions] = useState<TransactionType[]>([])

    useEffect(() => {
        const userRef = database.ref(`users/${userId}`)

        userRef.on('value', user => {
            const databaseUser = user.val()
            const firebaseTransactions: FirebaseTransactions = databaseUser ? databaseUser.transactions : {}

            const parsedTransactions = Object.entries(firebaseTransactions).map(([ key, value ]) => {
                const verifyType = value.transactionType === 'outcome' ? '- ' : ''

                return {
                    id: key,
                    name: value.name,
                    price: verifyType + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value.price)),
                    category: value.category,
                    transactionType: value.transactionType
                }
            })

            setTransactions(parsedTransactions)
        })
        
        return () => userRef.off('value')
    }, [userId])

    return { transactions }
}