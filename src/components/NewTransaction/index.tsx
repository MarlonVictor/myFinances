import React, { useContext, useEffect, useState } from 'react'
import { Field, Formik, Form, useFormikContext } from 'formik'
import { ptForm } from 'yup-locale-pt'
import * as Yup from 'yup'
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi'
import { BiPlusCircle } from 'react-icons/bi'

import { database } from '../../services/firebase'
import { AuthContext } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { transactionCategoryIcon } from '../../utils/transactionCategoryIcon'

import { CurrencyField } from './CurrencyField'
import { INCOME_CATEGORIES, OUTCOME_CATEGORIES } from './categories'
import styles from './styles.module.scss'

type FormValues = {
    name: string
    price: number | ''
    category: string
}

type SubmitHelpers = {
    resetForm: () => void
}

function CategoryPicker({
    transactionType,
    hasError,
}: {
    transactionType: string
    hasError?: boolean
}) {
    const { values, setFieldValue } = useFormikContext<FormValues>()
    const categories = transactionType === 'income' ? INCOME_CATEGORIES : OUTCOME_CATEGORIES

    return (
        <div
            className={`${styles.categoryGrid} ${hasError ? styles.categoryGridError : ''}`}
            role="group"
            aria-label="Categoria"
        >
            {categories.map(category => {
                const selected = values.category === category

                return (
                    <button
                        key={category}
                        type="button"
                        className={`${styles.categoryChip} ${selected ? styles.categoryChipActive : ''}`}
                        onClick={() => setFieldValue('category', category)}
                        aria-pressed={selected}
                    >
                        <span className={styles.categoryIcon}>
                            {transactionCategoryIcon(category)}
                        </span>
                        <span>{category}</span>
                    </button>
                )
            })}
        </div>
    )
}

function TypeSync({ transactionType }: { transactionType: string }) {
    const { setFieldValue } = useFormikContext<FormValues>()

    useEffect(() => {
        setFieldValue('category', '')
    }, [transactionType, setFieldValue])

    return null
}

export function NewTransaction() {
    Yup.setLocale(ptForm)
    const { user } = useContext(AuthContext)
    const { showToast } = useToast()
    const [transactionType, setTransactionType] = useState('income')

    const schema = Yup.object().shape({
        name: Yup.string().trim().required(),
        price: Yup.number().positive().required(),
        category: Yup.string().required(),
    })

    async function handleCreateNewTransaction(values: FormValues, { resetForm }: SubmitHelpers) {
        const transactionsRef = database.ref(`users/${user?.id}/transactions`)
        const currentDate = new Date()

        try {
            await transactionsRef.push({
                name: values.name,
                price: String(values.price),
                category: values.category,
                type: transactionType,
                createdAt: currentDate.toString(),
            })

            resetForm()
            showToast('Transação cadastrada com sucesso!')
        } catch {
            showToast('Não foi possível cadastrar a transação.', 'error')
        }
    }

    return (
        <Formik<FormValues>
            initialValues={{
                name: '',
                price: '',
                category: '',
            }}
            onSubmit={handleCreateNewTransaction}
            validationSchema={schema}
        >
            {({ errors, touched }) => (
                <Form className={styles.NewTransactionContainer}>
                    <header className={styles.header}>
                        <h2>Novo cadastro</h2>
                        <p>Registre uma entrada ou saída financeira</p>
                    </header>

                    <TypeSync transactionType={transactionType} />

                    <div className={styles.fieldGroup}>
                        <label htmlFor="name">Nome</label>
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Ex: Salário, Mercado, Netflix..."
                            className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
                        />
                        {errors.name && touched.name && <small>{errors.name}</small>}
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="price">Valor</label>
                        <CurrencyField
                            name="price"
                            hasError={Boolean(errors.price && touched.price)}
                        />
                        {errors.price && touched.price && <small>{errors.price}</small>}
                    </div>

                    <div className={styles.fieldGroup}>
                        <span className={styles.fieldLabel}>Tipo</span>
                        <div className={styles.typeToggle}>
                            <button
                                type="button"
                                onClick={() => setTransactionType('income')}
                                className={`${styles.typeButton} ${transactionType === 'income' ? styles.typeButtonActive : ''}`}
                                aria-pressed={transactionType === 'income'}
                            >
                                <HiTrendingUp />
                                Entrada
                            </button>
                            <button
                                type="button"
                                onClick={() => setTransactionType('outcome')}
                                className={`${styles.typeButton} ${transactionType === 'outcome' ? styles.typeButtonActive : ''}`}
                                aria-pressed={transactionType === 'outcome'}
                            >
                                <HiTrendingDown />
                                Saída
                            </button>
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <span className={styles.fieldLabel}>Categoria</span>
                        <CategoryPicker
                            transactionType={transactionType}
                            hasError={Boolean(errors.category && touched.category)}
                        />
                        {errors.category && touched.category && <small>{errors.category}</small>}
                    </div>

                    <button type="submit" className={styles.sendButton}>
                        <span className={styles.sendButtonIcon} aria-hidden="true">
                            <BiPlusCircle />
                        </span>
                        <span>Cadastrar</span>
                    </button>
                </Form>
            )}
        </Formik>
    )
}
