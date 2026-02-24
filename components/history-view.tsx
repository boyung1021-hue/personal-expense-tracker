'use client'

import { CategoryIcon } from './category-icons'
import { categoryMap, formatWon } from '@/lib/expense-data'

export function HistoryView({ expenses }: any) {
  const grouped: Record<string, any[]> = {}
  
  expenses.forEach((e: any) => {
    if (!grouped[e.date]) {
      grouped[e.date] = []
    }
    grouped[e.date].push(e)
  })

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div className="px-5 py-4">
      <h2 className="text-lg font-bold mb-4" style={{ color: '#4A4A42' }}>
        전체 기록
      </h2>
      {dates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <svg viewBox="0 0 40 40" width="36" height="36">
            <rect x="8" y="6" width="24" height="28" rx="3" stroke="#D4E0CC" strokeWidth="2" fill="none" />
            <path d="M14 14h12M14 20h12M14 26h8" stroke="#D4E0CC" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[13px] mt-2" style={{ color: '#B0AEA4' }}>
            아직 기록이 없어요
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {dates.map((date) => {
            const dayExpenses = grouped[date]
            const dayTotal = dayExpenses.reduce((sum, e) => sum + (e.amount - (e.discount || 0)), 0)
            const [y, m, d] = date.split('-')

            return (
              <div key={date} className="fs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: '#5A5A50' }}>
                    {parseInt(m)}월 {parseInt(d)}일
                  </span>
                  <span className="text-sm font-bold" style={{ color: '#7A9B6D' }}>
                    {formatWon(dayTotal)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {dayExpenses.map((e: any) => (
                    <div
                      key={e.id}
                      className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ background: '#fff' }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: categoryMap[e.category].bg }}
                      >
                        <CategoryIcon id={e.category} size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold" style={{ color: '#4A4A42' }}>
                          {categoryMap[e.category].name}
                        </div>
                        {e.memo && (
                          <div
                            className="text-[11px] mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap"
                            style={{ color: '#B0AEA4' }}
                          >
                            {e.memo}
                          </div>
                        )}
                      </div>
                      <span className="text-[13px] font-bold" style={{ color: '#5A5A50' }}>
                        {formatWon(e.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
