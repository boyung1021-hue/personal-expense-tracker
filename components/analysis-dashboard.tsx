'use client'

import { Card } from '@/components/ui/card'
import { mockExpenses, mockCategoryStats, categoryIcons } from '@/lib/mock-data'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function AnalysisDashboard() {
  const monthlyTotal = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-4">
        <h1 className="text-2xl font-medium text-balance text-foreground">
          February Report
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your spending insights for this month
        </p>
      </div>

      {/* Monthly Total */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-border">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Total Spending
          </p>
          <p className="text-4xl font-bold text-foreground">
            ${monthlyTotal.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">This month</p>
        </div>
      </Card>

      {/* Spending Distribution Bar */}
      <Card className="p-6 space-y-4 bg-card border-border">
        <h3 className="text-base font-semibold text-card-foreground">
          Spending Distribution
        </h3>
        <div className="h-4 w-full rounded-full bg-secondary overflow-hidden flex">
          {mockCategoryStats.map((stat, index) => (
            <div
              key={stat.category}
              className={`h-full transition-all ${
                index === 0
                  ? 'bg-chart-1'
                  : index === 1
                    ? 'bg-chart-2'
                    : index === 2
                      ? 'bg-chart-3'
                      : 'bg-chart-4'
              }`}
              style={{ width: `${stat.percentage}%` }}
              title={`${stat.category}: ${stat.percentage}%`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          {mockCategoryStats.map((stat, index) => (
            <div key={stat.category} className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  index === 0
                    ? 'bg-chart-1'
                    : index === 1
                      ? 'bg-chart-2'
                      : index === 2
                        ? 'bg-chart-3'
                        : 'bg-chart-4'
                }`}
              />
              <span className="text-xs text-muted-foreground">
                {stat.category}
              </span>
              <span className="text-xs font-medium text-card-foreground ml-auto">
                {stat.percentage}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Category Ranking */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground px-1">
          Category Ranking
        </h3>
        <div className="space-y-2">
          {mockCategoryStats
            .sort((a, b) => b.amount - a.amount)
            .map((stat, index) => (
              <Card key={stat.category} className="p-4 bg-card border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-xl">
                    {categoryIcons[stat.category] || '📦'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-card-foreground">
                        {stat.category}
                      </span>
                      {stat.trend === 'up' && (
                        <TrendingUp className="h-3 w-3 text-chart-1" />
                      )}
                      {stat.trend === 'down' && (
                        <TrendingDown className="h-3 w-3 text-chart-2" />
                      )}
                      {stat.trend === 'neutral' && (
                        <Minus className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.count} {stat.count === 1 ? 'record' : 'records'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-card-foreground">
                      ${stat.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
