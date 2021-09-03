import React, { useContext, useState } from 'react'
import { Field, Formik, Form } from 'formik'
import { ptForm } from 'yup-locale-pt'
import * as Yup from 'yup'

import { database } from '../../services/firebase'
import { AuthContext } from '../../contexts/AuthContext'

import IncomeIcon from '../../assets/income.svg'
import OutcomeIcon from '../../assets/outcome.svg'

import styles from './styles.module.scss'


type handleCreateNewTransactionProps = {
    name: string,
    price: string,
    category: string
}

export function NewTransaction() {
    Yup.setLocale(ptForm)
    const { user } = useContext(AuthContext)

    const [transactionType, setTransactionType] = useState('income')
    
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().integer().required(),
        category: Yup.string().default('').required()
    })

    // eslint-disable-next-line
    function handleCreateNewTransaction(values: handleCreateNewTransactionProps, { resetForm }: any) {
        const transactionsRef = database.ref(`users/${user?.id}/transactions`)

        transactionsRef.push({
            ...values,
            transactionType
        })

        resetForm()
    }

    return (
        <Formik 
            initialValues={{
                name: '',
                price: '',
                category:''
            }}
            onSubmit={handleCreateNewTransaction}
            validationSchema={schema}
        >
            {({ errors }) => (
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
                        type="number" 
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
                        {transactionType === 'outcome'
                            ? (
                                <>
                                    <option value="Moda">Moda</option>
                                    <option value="Objeto">Objeto</option>
                                    <option value="Eletrônico">Eletrônico</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Imóvel">Imóvel</option>
                                    <option value="Hobby">Hobby</option>
                                    <option value="Viagem">Viagem</option>
                                    <option value="Compras">Compras</option>
                                </>
                            ) : (
                                <>
                                    <option value="Vendas">Vendas</option>
                                    <option value="Trabalho">Trabalho</option>
                                    <option value="Presente">Presente</option>
                                </>
                            )
                        }
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
        </Formik>
    )
}