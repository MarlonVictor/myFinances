import React, { useContext, useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { HiTrendingUp, HiTrendingDown, HiCurrencyDollar } from 'react-icons/hi'

import { useUser } from '../../hooks/useUser'
import { AuthContext } from '../../contexts/AuthContext'

import styles from './styles.module.scss'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR')

type ValueSkeletonProps = {
    width?: number
    dark?: boolean
}

function ValueSkeleton({ width = 140, dark = false }: ValueSkeletonProps) {
    const skeleton = (
        <strong className={styles.valueSkeleton} aria-hidden="true">
            <Skeleton width={width} height={28} />
        </strong>
    )

    if (dark) {
        return (
            <SkeletonTheme color="rgba(255, 255, 255, 0.12)" highlightColor="rgba(255, 255, 255, 0.22)">
                {skeleton}
            </SkeletonTheme>
        )
    }

    return skeleton
}

export function Summary() {
    const { user, showSummary } = useContext(AuthContext)
    const { transactions, summary, isLoading } = useUser(user?.id)

    const [lastIncome, setLastIncome] = useState('')
    const [lastOutcome, setLastOutcome] = useState('')

    useEffect(() => {
        transactions.map(transaction => {
            transaction.type === 'income' ? setLastIncome(transaction.createdAt) : setLastOutcome(transaction.createdAt)
        })
    }, [transactions])

    function renderValue(amount: number, dark = false) {
        if (isLoading || !showSummary) {
            return <ValueSkeleton dark={dark} />
        }

        return <strong>{currencyFormatter.format(amount)}</strong>
    }

    return (
        <div className={styles.SummaryContainer}>
            <div className={styles.card}>
                <header>
                    <p>Entradas</p>
                    <span className={`${styles.iconBadge} ${styles.incomeBadge}`}>
                        <HiTrendingUp />
                    </span>
                </header>
                {renderValue(summary.deposits)}
                {!isLoading && showSummary && lastIncome && (
                    <small>
                        Última entrada dia
                        <em>{dateFormatter.format(new Date(lastIncome))}</em>
                    </small>
                )}
            </div>

            <div className={styles.card}>
                <header>
                    <p>Saídas</p>
                    <span className={`${styles.iconBadge} ${styles.outcomeBadge}`}>
                        <HiTrendingDown />
                    </span>
                </header>
                {renderValue(summary.withdraws)}
                {!isLoading && showSummary && lastOutcome && (
                    <small>
                        Última saída dia
                        <em>{dateFormatter.format(new Date(lastOutcome))}</em>
                    </small>
                )}
            </div>

            <div className={`${styles.card} ${styles.totalCard}`}>
                <header>
                    <p>Total</p>
                    <span className={`${styles.iconBadge} ${styles.totalBadge}`}>
                        <HiCurrencyDollar />
                    </span>
                </header>
                {isLoading
                    ? <ValueSkeleton width={160} dark />
                    : showSummary && <strong>{currencyFormatter.format(summary.total)}</strong>
                }
            </div>
        </div>
    )
}
