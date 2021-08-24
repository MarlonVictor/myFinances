import React, { useState } from 'react'
import { Field, Formik, Form } from 'formik'
import { ptForm } from 'yup-locale-pt'
import * as Yup from 'yup'

import IncomeIcon from '../../assets/income.svg'
import OutcomeIcon from '../../assets/outcome.svg'

import styles from './styles.module.scss'


type SubmitFormProps = {
    name: string,
    price: string,
    category: string
}

export function NewTransaction() {
    const [transactionType, setTransactionType] = useState('income')
    
    Yup.setLocale(ptForm)

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().integer().required(),
        category: Yup.string().default('').required()
    })

    function submitForm(values: SubmitFormProps) {
        const formValue = {
            ...values,
            transactionType
        }

        console.log(formValue)
    }

    return (
        <Formik 
            initialValues={{
                name: '',
                price: '',
                category:''
            }}
            onSubmit={submitForm}
            validationSchema={schema}
            render={({ errors }) => (
                <Form className={styles.NewTransactionContainer}>
                    <h2>Novo cadastro</h2>

                    <Field 
                        name="name" 
                        type="text" 
                        placeholder="Nome" 
                        className={errors.name ? styles.inputError : ''}
                    />
                    <small>{errors.name}</small>

                    <Field 
                        name="price" 
                        type="text" 
                        placeholder="Valor" 
                        className={errors.price ? styles.inputError : ''}
                    />
                    <small>{errors.price}</small>

                    <fieldset>
                        <button 
                            type="button"
                            onClick={() => setTransactionType('income')}
                            className={transactionType == 'income' ? styles.checkedButton : ''}
                        >
                            <img src={IncomeIcon} alt="Entrada" />
                            Entrada
                        </button>
                        <button 
                            type="button"
                            onClick={() => setTransactionType('outcome')}
                            className={transactionType == 'outcome' ? styles.checkedButton : ''}
                        >
                            <img src={OutcomeIcon} alt="Saída" />
                            Saída
                        </button>
                    </fieldset>

                    <Field 
                        as="select" 
                        name="category" 
                        title="Categorias"
                        className={errors.category ? styles.inputError : ''}
                    >
                        <option hidden>Categorias</option>
                        <option value="style">Moda</option>
                        <option value="object">Objeto</option>
                        <option value="electronics">Eletrônico</option>
                        <option value="car">Auto</option>
                        <option value="properties">Imóvel</option>
                        <option value="hobby">Hobby</option>
                        <option value="travel">Viagem</option>
                    </Field>
                    <small>{errors.category}</small>

                    <button 
                        type="submit"
                        className={styles.sendButton}
                    >
                        Cadastrar
                    </button>
                </Form>
            )}
        />
    )
}