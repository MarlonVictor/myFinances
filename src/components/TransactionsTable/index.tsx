import React, { useContext, useEffect, useMemo, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import Skeleton from 'react-loading-skeleton'
import { AnimatePresence } from 'framer-motion'
import {
    HiChevronUp,
    HiChevronDown,
    HiChevronLeft,
    HiChevronRight,
    HiOutlineSelector,
    HiOutlineTrash,
} from 'react-icons/hi'

import { useUser } from '../../hooks/useUser'
import { database } from '../../services/firebase'
import { AuthContext } from '../../contexts/AuthContext'

import { transactionCategoryIcon } from '../../utils/transactionCategoryIcon'

import { DeleteTransactionModal } from './DeleteTransactionModal'
import styles from './styles.module.scss'

type TransactionToDelete = {
    id: string
    name: string
}

type SortKey = 'name' | 'price' | 'category' | 'createdAt'
type SortDir = 'asc' | 'desc'

const COLUMNS: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Título' },
    { key: 'price', label: 'Valor' },
    { key: 'category', label: 'Categoria' },
    { key: 'createdAt', label: 'Data' },
]

const LOADING_ROW_COUNT = 3
const PAGE_SIZE = 10

function PriceSkeleton() {
    return (
        <span className={styles.priceSkeleton} aria-hidden="true">
            <Skeleton width={100} height={20} />
        </span>
    )
}

export function TransactionsTable() {
    const { user, showSummary } = useContext(AuthContext)
    const { transactions, isLoading } = useUser(user?.id)

    const [sortKey, setSortKey] = useState<SortKey>('createdAt')
    const [sortDir, setSortDir] = useState<SortDir>('desc')
    const [currentPage, setCurrentPage] = useState(1)
    const [transactionToDelete, setTransactionToDelete] = useState<TransactionToDelete | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const sortedTransactions = useMemo(() => {
        const copy = [...transactions]

        copy.sort((a, b) => {
            let cmp = 0

            switch (sortKey) {
            case 'name':
                cmp = a.name.localeCompare(b.name, 'pt-BR')
                break
            case 'category':
                cmp = a.category.localeCompare(b.category, 'pt-BR')
                break
            case 'price':
                cmp = a.price - b.price
                break
            case 'createdAt':
                cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                break
            }

            return sortDir === 'asc' ? cmp : -cmp
        })

        return copy
    }, [transactions, sortKey, sortDir])

    const totalPages = Math.ceil(sortedTransactions.length / PAGE_SIZE)
    const showPagination = !isLoading && sortedTransactions.length > PAGE_SIZE

    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE
        return sortedTransactions.slice(start, start + PAGE_SIZE)
    }, [sortedTransactions, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [sortKey, sortDir])

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    function handleSort(key: SortKey) {
        if (isLoading) return

        if (sortKey === key) {
            setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortKey(key)
            setSortDir(key === 'createdAt' ? 'desc' : 'asc')
        }
    }

    function SortIcon({ column }: { column: SortKey }) {
        if (sortKey !== column) {
            return <HiOutlineSelector className={styles.sortIcon} />
        }

        return sortDir === 'asc'
            ? <HiChevronUp className={styles.sortIconActive} />
            : <HiChevronDown className={styles.sortIconActive} />
    }

    async function handleDeleteTransaction(transactionId: string) {
        await database.ref(`users/${user?.id}/transactions/${transactionId}`).remove()
    }

    function openDeleteModal(transaction: TransactionToDelete) {
        setTransactionToDelete(transaction)
    }

    function closeDeleteModal() {
        if (!isDeleting) {
            setTransactionToDelete(null)
        }
    }

    async function confirmDelete() {
        if (!transactionToDelete) return

        setIsDeleting(true)

        try {
            await handleDeleteTransaction(transactionToDelete.id)
            setTransactionToDelete(null)
        } finally {
            setIsDeleting(false)
        }
    }

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                closeDeleteModal()
            }
        }

        if (transactionToDelete) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => document.removeEventListener('keydown', handleEscape)
    }, [transactionToDelete, isDeleting])

    function formatPrice(transaction: typeof transactions[0]) {
        const prefix = transaction.type === 'outcome' ? '- ' : ''
        const formatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(transaction.price)

        return `${prefix}${formatted}`
    }

    function renderPrice(transaction: typeof transactions[0]) {
        if (isLoading || !showSummary) {
            return <PriceSkeleton />
        }

        return formatPrice(transaction)
    }

    function renderPriceCellClass(transaction: typeof transactions[0]) {
        if (!showSummary || isLoading) {
            return ''
        }

        return transaction.type === 'income' ? styles.deposit : styles.withdraw
    }

    if (!isLoading && transactions.length === 0) {
        return (
            <>
                <section className={styles.NoTransactions}>
                    <h1>Sem Transações</h1>
                </section>
                <ReactTooltip place="bottom" type="dark" />
            </>
        )
    }

    return (
        <>
            <section className={styles.TableContainer}>
                <table>
                    <thead>
                        <tr>
                            {COLUMNS.map(col => (
                                <th
                                    key={col.key}
                                    onClick={() => handleSort(col.key)}
                                    className={sortKey === col.key ? styles.activeColumn : ''}
                                >
                                    {col.label}
                                    <SortIcon column={col.key} />
                                </th>
                            ))}
                            <th className={styles.actionColumn} />
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading
                            ? Array.from({ length: LOADING_ROW_COUNT }).map((_, index) => (
                                <tr key={`skeleton-${index}`}>
                                    <td>&nbsp;</td>
                                    <td><PriceSkeleton /></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td className={styles.actionColumn} />
                                </tr>
                            ))
                            : paginatedTransactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.name}</td>
                                    <td className={renderPriceCellClass(transaction)}>
                                        {renderPrice(transaction)}
                                    </td>
                                    <td>
                                        <span className={styles.categoryBadge}>
                                            {transactionCategoryIcon(transaction.category)}
                                            {transaction.category}
                                        </span>
                                    </td>
                                    <td>
                                        {new Intl.DateTimeFormat('pt-BR').format(
                                            new Date(transaction.createdAt)
                                        )}
                                    </td>
                                    <td className={styles.actionColumn}>
                                        <button
                                            type="button"
                                            className={styles.deleteButton}
                                            data-tip={`Excluir [${transaction.name}]`}
                                            onClick={() => openDeleteModal({
                                                id: transaction.id,
                                                name: transaction.name,
                                            })}
                                            aria-label={`Excluir ${transaction.name}`}
                                        >
                                            <HiOutlineTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>

            <section className={styles.MobileListContainer}>
                {isLoading
                    ? Array.from({ length: LOADING_ROW_COUNT }).map((_, index) => (
                        <div key={`skeleton-mobile-${index}`} className={styles.mobileCard}>
                            <main>
                                <p>
                                    <span>&nbsp;</span>
                                </p>
                                <PriceSkeleton />
                            </main>
                        </div>
                    ))
                    : paginatedTransactions.map(transaction => (
                        <div key={transaction.id} className={styles.mobileCard}>
                            <main>
                                <p>
                                    <span>{transaction.name}</span>
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        data-tip={`Excluir [${transaction.name}]`}
                                        onClick={() => openDeleteModal({
                                            id: transaction.id,
                                            name: transaction.name,
                                        })}
                                        aria-label={`Excluir ${transaction.name}`}
                                    >
                                        <HiOutlineTrash />
                                    </button>
                                </p>
                                <span className={renderPriceCellClass(transaction)}>
                                    {renderPrice(transaction)}
                                </span>
                            </main>
                            <footer>
                                <span className={styles.categoryBadge}>
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
                    ))
                }
            </section>

            {showPagination && (
                <nav className={styles.pagination} aria-label="Paginação de transações">
                    <button
                        type="button"
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1}
                        aria-label="Página anterior"
                    >
                        <HiChevronLeft />
                    </button>

                    <span className={styles.paginationInfo}>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        type="button"
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Próxima página"
                    >
                        <HiChevronRight />
                    </button>
                </nav>
            )}

            <ReactTooltip place="bottom" type="dark" />

            <AnimatePresence>
                {transactionToDelete && (
                    <DeleteTransactionModal
                        transactionName={transactionToDelete.name}
                        onConfirm={confirmDelete}
                        onCancel={closeDeleteModal}
                        isDeleting={isDeleting}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
