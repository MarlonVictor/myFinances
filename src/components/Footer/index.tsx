import React from 'react'
import { motion } from 'framer-motion'
import { BiListUl, BiPlusCircle } from 'react-icons/bi'

import styles from './styles.module.scss'

type FooterProps = {
    showDashboard: boolean,
    setContent: (value: boolean) => void
}

const TABS = [
    {
        id: 'dashboard' as const,
        label: 'Listagem',
        icon: BiListUl,
        isActive: (showDashboard: boolean) => showDashboard,
        onSelect: (setContent: FooterProps['setContent']) => setContent(true),
    },
    {
        id: 'register' as const,
        label: 'Cadastrar',
        icon: BiPlusCircle,
        isActive: (showDashboard: boolean) => !showDashboard,
        onSelect: (setContent: FooterProps['setContent']) => setContent(false),
    },
]

export function Footer({ showDashboard, setContent }: FooterProps) {
    return (
        <footer className={styles.FooterContainer}>
            <nav className={styles.tabBar} aria-label="Navegação principal">
                {TABS.map(tab => {
                    const active = tab.isActive(showDashboard)
                    const Icon = tab.icon

                    return (
                        <motion.button
                            key={tab.id}
                            type="button"
                            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
                            onClick={() => tab.onSelect(setContent)}
                            aria-current={active ? 'page' : undefined}
                            whileTap={{ scale: 0.97 }}
                        >
                            {active && (
                                <motion.span
                                    layoutId="tabSegment"
                                    className={styles.tabSegment}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}

                            <span className={styles.tabInner}>
                                <Icon />
                                <span>{tab.label}</span>
                            </span>
                        </motion.button>
                    )
                })}
            </nav>
        </footer>
    )
}
