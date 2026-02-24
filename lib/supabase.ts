import { createClient } from '@supabase/supabase-js'
import { Expense } from './types'

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface DbExpense {
  id: number
  created_at: string
  amount: number
  category: string
  memo: string | null
  discount_amount: number | null
  source_account: string | null
  expense_type: 'variable' | 'fixed' | null
}

function toAppExpense(row: DbExpense): Expense {
  const kst = new Date(new Date(row.created_at).getTime() + 9 * 60 * 60 * 1000)
  const date = kst.toISOString().slice(0, 10) // YYYY-MM-DD in KST
  return {
    id: String(row.id),
    date,
    amount: Number(row.amount),
    category: row.category,
    memo: row.memo ?? undefined,
    discount: row.discount_amount ? Number(row.discount_amount) : undefined,
    account: row.source_account ?? undefined,
    expenseType: row.expense_type ?? undefined,
  }
}

export async function fetchExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data as DbExpense[]).map(toAppExpense)
}

export async function insertExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
  const { data, error } = await supabase
    .from('expenses')
    .insert({
      created_at: `${expense.date}T00:00:00+09:00`,
      amount: expense.amount,
      category: expense.category,
      memo: expense.memo || null,
      discount_amount: expense.discount ?? null,
      source_account: expense.account ?? null,
      expense_type: expense.expenseType ?? null,
    })
    .select()
    .single()

  if (error) throw error
  return toAppExpense(data as DbExpense)
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}
