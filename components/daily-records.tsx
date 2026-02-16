'use client'

import { Card } from '@/components/ui/card'
import { mockExpenses, categoryIcons } from '@/lib/mock-data'
import { format } from 'date-fns'

export function DailyRecords() {
  // Group expenses by date
  const groupedExpenses = mockExpenses.reduce(
    (acc, expense) => {
      const date = expense.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(expense)
      return acc
    },
    {} as Record<string, typeof mockExpenses>
  )

  const sortedDates = Object.keys(groupedExpenses).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime()
  })

  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-4">
        <h1 className="text-2xl font-medium text-balance text-foreground">
          Daily Records
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Track your spending habits day by day
        </p>
      </div>

      <div className="space-y-4">
        {sortedDates.map((date) => {
          const expenses = groupedExpenses[date]
          const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
          const dateObj = new Date(date + 'T00:00:00')

          return (
            <div key={date} className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {format(dateObj, 'MMM dd, yyyy')}
                </h3>
                <span className="text-sm font-medium text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                {expenses.map((expense) => (
                  <Card key={expense.id} className="p-4 border-border bg-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-2xl">
                        {categoryIcons[expense.category] || '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-card-foreground">
                          {expense.category}
                        </p>
                        {expense.memo && (
                          <p className="text-xs text-muted-foreground truncate">
                            {expense.memo}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-base font-semibold text-card-foreground">
                          ${expense.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
