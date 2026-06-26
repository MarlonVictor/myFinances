export const INCOME_CATEGORIES = [
    'Trabalho',
    'Vendas',
    'Freelance',
    'Investimentos',
    'Aluguel',
    'Presente',
    'Reembolso',
    'Outros',
] as const

export const OUTCOME_CATEGORIES = [
    'Alimentação',
    'Moradia',
    'Transporte',
    'Saúde',
    'Educação',
    'Moda',
    'Eletrônicos',
    'Lazer',
    'Viagem',
    'Compras',
    'Assinaturas',
    'Auto',
    'Contas',
    'Presentes',
    'Outros',
] as const

export type IncomeCategory = typeof INCOME_CATEGORIES[number]
export type OutcomeCategory = typeof OUTCOME_CATEGORIES[number]
