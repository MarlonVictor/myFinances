import React from 'react'
import { useField } from 'formik'

import styles from './styles.module.scss'

type CurrencyFieldProps = {
    name: string
    hasError?: boolean
}

export function CurrencyField({ name, hasError }: CurrencyFieldProps) {
    const [field, , helpers] = useField(name)

    function formatDisplay(value: unknown) {
        if (value === '' || value === undefined || value === null) {
            return ''
        }

        const numeric = Number(value)

        if (Number.isNaN(numeric)) {
            return ''
        }

        return numeric.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const digits = event.target.value.replace(/\D/g, '')

        if (digits === '') {
            helpers.setValue('')
            return
        }

        helpers.setValue(Number(digits) / 100)
    }

    return (
        <input
            type="text"
            inputMode="numeric"
            name={field.name}
            value={formatDisplay(field.value)}
            onChange={handleChange}
            onBlur={field.onBlur}
            placeholder="R$ 0,00"
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
            aria-invalid={hasError}
        />
    )
}
