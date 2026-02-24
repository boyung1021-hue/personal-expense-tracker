export interface Expense {
  id: string
  date: string
  amount: number
  category: string
  memo?: string
  discount?: number
  account?: string
  expenseType?: 'variable' | 'fixed'
}

export interface CategoryStats {
  category: string
  amount: number
  count: number
  percentage: number
  trend: 'up' | 'down' | 'neutral'
}
