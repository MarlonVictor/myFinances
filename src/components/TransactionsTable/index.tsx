import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoShirtOutline } from 'react-icons/io5'
import { BiDollar } from 'react-icons/bi'

import styles from './styles.module.scss'


export function TransactionsTable() {
    return (
        <>
            <section className={styles.TableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Título <IoIosArrowDown/></th>
                            <th>Valor <IoIosArrowDown/></th>
                            <th>Categoria <IoIosArrowDown/></th>
                            <th>Data <IoIosArrowDown/></th>
                        </tr>
                    </thead>
                    

                    <tbody>
                        <tr>
                            <td>Desenvolvimento de site</td>
                            <td className={styles.deposit}>R$1.000,00</td>
                            <td><BiDollar /> Venda</td>
                            <td>10/08/2021</td>
                        </tr>
                        <tr>
                            <td>t-shirt</td>
                            <td className={styles.withdraw}>- R$100,00</td>
                            <td><IoShirtOutline /> Roupa</td>
                            <td>10/08/2021</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className={styles.MobileListContainer}>
                <h2>Listagem</h2>

                <div>
                    <main>
                        <p>Desenvolvimento de site</p>
                        <span className={styles.deposit}>R$1.000,00</span>
                    </main>
                    <footer>
                        <span><BiDollar /> Venda</span>
                        <span>10/08/2021</span>
                    </footer>
                </div>
                <div>
                    <main>
                        <p>t-shirt</p>
                        <span className={styles.withdraw}>- R$100,00</span>
                    </main>
                    <footer>
                        <span><IoShirtOutline /> Roupa</span>
                        <span>10/08/2021</span>
                    </footer>
                </div>
            </section>
        </>
    )
}