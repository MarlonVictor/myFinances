import React from 'react'
import {
    BiBox,
    BiBriefcase,
    BiBuilding,
    BiCar,
    BiGridAlt,
    BiDollar,
    BiDumbbell,
    BiGift,
    BiHomeAlt,
    BiJoystick,
    BiBook,
    BiLaptop,
    BiReceipt,
    BiRefresh,
    BiTrendingUp,
    BiTv,
} from 'react-icons/bi'
import {
    IoAirplaneOutline,
    IoCartOutline,
    IoFastFoodOutline,
    IoHeartOutline,
    IoShirtOutline,
} from 'react-icons/io5'

const iconProps = { size: 16 }

export function transactionCategoryIcon(category: string) {
    switch (category) {
    case 'Moda':
        return <IoShirtOutline {...iconProps} />
    case 'Objeto':
        return <BiBox {...iconProps} />
    case 'Eletrônico':
    case 'Eletrônicos':
        return <BiJoystick {...iconProps} />
    case 'Auto':
    case 'Transporte':
        return <BiCar {...iconProps} />
    case 'Imóvel':
    case 'Moradia':
        return <BiHomeAlt {...iconProps} />
    case 'Hobby':
    case 'Lazer':
        return <BiDumbbell {...iconProps} />
    case 'Viagem':
        return <IoAirplaneOutline {...iconProps} />
    case 'Compras':
        return <IoCartOutline {...iconProps} />
    case 'Vendas':
        return <BiDollar {...iconProps} />
    case 'Trabalho':
        return <BiBriefcase {...iconProps} />
    case 'Presente':
    case 'Presentes':
        return <BiGift {...iconProps} />
    case 'Alimentação':
        return <IoFastFoodOutline {...iconProps} />
    case 'Saúde':
        return <IoHeartOutline {...iconProps} />
    case 'Educação':
        return <BiBook {...iconProps} />
    case 'Assinaturas':
        return <BiTv {...iconProps} />
    case 'Contas':
        return <BiReceipt {...iconProps} />
    case 'Freelance':
        return <BiLaptop {...iconProps} />
    case 'Investimentos':
        return <BiTrendingUp {...iconProps} />
    case 'Aluguel':
        return <BiBuilding {...iconProps} />
    case 'Reembolso':
        return <BiRefresh {...iconProps} />
    case 'Outros':
        return <BiGridAlt {...iconProps} />
    default:
        return <BiGridAlt {...iconProps} />
    }
}
