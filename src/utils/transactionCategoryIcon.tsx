import React from 'react'
import { BiBox, BiBriefcase, BiCar, BiDollar, BiDumbbell, BiGift, BiHomeAlt, BiJoystick } from 'react-icons/bi'
import { IoAirplaneOutline, IoShirtOutline, IoCartOutline } from 'react-icons/io5'


export function transactionCategoryIcon(category: string) {
    if (category === 'Moda') return <IoShirtOutline />
    else if (category === 'Objeto') return <BiBox />
    else if (category === 'Eletrônico') return <BiJoystick />
    else if (category === 'Auto') return <BiCar />
    else if (category === 'Imóvel') return <BiHomeAlt />
    else if (category === 'Hobby') return <BiDumbbell />
    else if (category === 'Viagem') return <IoAirplaneOutline />
    else if (category === 'Compras') return <IoCartOutline />
    else if (category === 'Vendas') return <BiDollar />
    else if (category === 'Trabalho') return <BiBriefcase />
    else if (category === 'Presente') return <BiGift />
}