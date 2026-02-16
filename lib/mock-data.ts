import type { Expense, CategoryStats } from './types'

export const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2026-02-16',
    amount: 4.5,
    category: 'Coffee',
    memo: 'Morning latte',
  },
  {
    id: '2',
    date: '2026-02-16',
    amount: 12.8,
    category: 'Food',
    memo: 'Lunch at cafe',
  },
  {
    id: '3',
    date: '2026-02-15',
    amount: 5.0,
    category: 'Transport',
    memo: 'Bus fare',
  },
  {
    id: '4',
    date: '2026-02-15',
    amount: 48.0,
    category: 'Shopping',
    memo: 'New headphones',
  },
  {
    id: '5',
    date: '2026-02-14',
    amount: 3.5,
    category: 'Coffee',
  },
  {
    id: '6',
    date: '2026-02-14',
    amount: 18.5,
    category: 'Food',
    memo: 'Dinner',
  },
  {
    id: '7',
    date: '2026-02-13',
    amount: 25.0,
    category: 'Shopping',
    memo: 'Groceries',
  },
  {
    id: '8',
    date: '2026-02-12',
    amount: 4.0,
    category: 'Coffee',
  },
]

export const mockCategoryStats: CategoryStats[] = [
  {
    category: 'Coffee',
    amount: 12.0,
    count: 3,
    percentage: 10,
    trend: 'up',
  },
  {
    category: 'Food',
    amount: 31.3,
    count: 2,
    percentage: 26,
    trend: 'neutral',
  },
  {
    category: 'Transport',
    amount: 5.0,
    count: 1,
    percentage: 4,
    trend: 'down',
  },
  {
    category: 'Shopping',
    amount: 73.0,
    count: 2,
    percentage: 60,
    trend: 'up',
  },
]

export const categoryIcons: Record<string, string> = {
  Coffee: '☕',
  Food: '🍽️',
  Transport: '🚗',
  Shopping: '🛍️',
  Entertainment: '🎬',
  Health: '💊',
  Bills: '📄',
  Other: '📦',
}
