import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiCheckCircle, HiExclamationCircle, HiX } from 'react-icons/hi'

import styles from './ToastContext.module.scss'

type ToastType = 'success' | 'error'

type ToastItem = {
    id: string
    message: string
    type: ToastType
}

type ToastContextData = {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext({} as ToastContextData)

type ToastProviderProps = {
    children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = `${Date.now()}-${Math.random()}`

        setToasts(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id))
        }, 3500)
    }, [])

    function dismissToast(id: string) {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className={styles.toastContainer} aria-live="polite">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            className={`${styles.toast} ${styles[toast.type]}`}
                            initial={{ opacity: 0, x: 24, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 24, y: -8, scale: 0.96 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            role="status"
                        >
                            <span className={styles.toastIcon} aria-hidden="true">
                                {toast.type === 'success'
                                    ? <HiCheckCircle />
                                    : <HiExclamationCircle />
                                }
                            </span>
                            <span>{toast.message}</span>
                            <button
                                type="button"
                                className={styles.dismissButton}
                                onClick={() => dismissToast(toast.id)}
                                aria-label="Fechar notificação"
                            >
                                <HiX />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    return useContext(ToastContext)
}
