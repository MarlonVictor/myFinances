import React from 'react'
import { motion } from 'framer-motion'
import { HiOutlineTrash } from 'react-icons/hi'

import styles from './DeleteTransactionModal.module.scss'

type DeleteTransactionModalProps = {
    transactionName: string
    onConfirm: () => void
    onCancel: () => void
    isDeleting?: boolean
}

export function DeleteTransactionModal({
    transactionName,
    onConfirm,
    onCancel,
    isDeleting = false,
}: DeleteTransactionModalProps) {
    return (
        <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            role="presentation"
        >
            <motion.div
                className={styles.modal}
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={event => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
            >
                <span className={styles.iconWrap} aria-hidden="true">
                    <HiOutlineTrash />
                </span>

                <h3 id="delete-modal-title">Excluir transação?</h3>
                <p>
                    Tem certeza que deseja excluir <strong>{transactionName}</strong>?
                    Esta ação não pode ser desfeita.
                </p>

                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={onCancel}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className={styles.confirmButton}
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
