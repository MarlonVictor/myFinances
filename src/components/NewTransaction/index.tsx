import React from 'react'

import IncomeIcon from '../../assets/income.svg'
import OutcomeIcon from '../../assets/outcome.svg'

import styles from './styles.module.scss'


export function NewTransaction() {
    return (
        <form className={styles.NewTransactionContainer}>
            <h2>Novo cadastro</h2>

            <input placeholder="Nome" />
            <input placeholder="Valor" />

            <fieldset>
                {/* <input type="checkbox" />
                <input type="checkbox" /> */}
                <button>
                    <img src={IncomeIcon} alt="Entrada" />
                    Entrada
                </button>
                <button>
                    <img src={OutcomeIcon} alt="Saída" />
                    Saída
                </button>
            </fieldset>

            <select id="cars" title="Categorias">
                <option selected disabled>Categorias</option>
                <option value="clothing">Roupa</option>
            </select>

            <button className={styles.sendButton}>
                Cadastrar
            </button>
        </form>
    )
}