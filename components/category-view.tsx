'use client'

import { useState } from 'react'
import { CategoryIcon } from './category-icons'
import { CATEGORIES, categoryMap, formatWon } from '@/lib/expense-data'

export function CategoryView({ expenses }: any) {
  const now = new Date()
  const [viewMonth, setViewMonth] = useState({ year: now.getFullYear(), month: now.getMonth() })
  const [selectedCat, setSelectedCat] = useState<string | null>(null)

  const { year, month } = viewMonth
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const monthExpenses = expenses.filter((e: any) => e.date.startsWith(prefix))
  const total = monthExpenses.reduce((sum: number, e: any) => sum + e.amount, 0)

  const categoryTotals: Record<string, number> = {}
  const categoryCounts: Record<string, number> = {}
  monthExpenses.forEach((e: any) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1
  })

  const sorted = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([id, amt]) => ({
      ...categoryMap[id],
      total: amt,
      count: categoryCounts[id],
      pct: total > 0 ? Math.round((amt / total) * 100) : 0,
    }))

  const changeMonth = (delta: number) => {
    setViewMonth((prev) => {
      const newMonth = prev.month + delta
      if (newMonth < 0) return { year: prev.year - 1, month: 11 }
      if (newMonth > 11) return { year: prev.year + 1, month: 0 }
      return { ...prev, month: newMonth }
    })
  }

  const selectedExpenses = selectedCat ? monthExpenses.filter((e: any) => e.category === selectedCat) : []

  return (
    <div>
      <div className="flex items-center justify-between px-5 py-4">
        <button onClick={() => changeMonth(-1)} className="p-1">
          <svg viewBox="0 0 20 20" width="18" height="18">
            <path
              d="M13 4l-6 6 6 6"
              stroke="#8A8A80"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-base font-semibold" style={{ color: '#4A4A42' }}>
          {year}년 {month + 1}월
        </span>
        <button onClick={() => changeMonth(1)} className="p-1">
          <svg viewBox="0 0 20 20" width="18" height="18">
            <path
              d="M7 4l6 6-6 6"
              stroke="#8A8A80"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mx-5 mb-4 p-5 rounded-2xl text-center" style={{ background: '#F3F0E8' }}>
        <span className="text-xs font-medium" style={{ color: '#9A9A90' }}>
          이번 달 총 지출
        </span>
        <div className="text-2xl font-bold mt-1" style={{ color: '#5A5A50' }}>
          {formatWon(total)}
        </div>
      </div>

      {sorted.length > 0 && (
        <div className="mx-5 mb-4">
          <div className="h-3 rounded-full overflow-hidden flex" style={{ background: '#E8E6E0' }}>
            {sorted.map((cat, i) => (
              <div
                key={cat.id}
                style={{
                  width: `${cat.pct}%`,
                  background: cat.accent,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="px-5">
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#5A5A50' }}>
          카테고리별 지출
        </h3>
        <div className="flex flex-col gap-2">
          {sorted.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className="fs flex items-center gap-3 p-4 rounded-2xl text-left"
              style={{
                background: '#fff',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <div className="text-xl font-bold" style={{ color: '#B0AEA4', width: 24 }}>
                {i + 1}
              </div>
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: cat.bg }}
              >
                <CategoryIcon id={cat.id} size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: '#4A4A42' }}>
                  {cat.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#B0AEA4' }}>
                  {cat.count}건 · {cat.pct}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold" style={{ color: '#5A5A50' }}>
                  {formatWon(cat.total)}
                </div>
              </div>
            </button>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12" style={{ background: '#FDFBF7' }}>
            <svg viewBox="0 0 40 40" width="36" height="36">
              <circle cx="20" cy="20" r="12" stroke="#D4E0CC" strokeWidth="2" fill="none" />
              <path d="M15 18h10M15 22h6" stroke="#D4E0CC" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[13px] mt-2" style={{ color: '#B0AEA4' }}>
              이번 달 기록이 없어요
            </span>
          </div>
        )}
      </div>

      {selectedCat && (
        <div
          className="fixed inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSelectedCat(null)}
        >
          <div
            className="w-full max-h-[70vh] overflow-y-auto rounded-t-3xl p-5"
            style={{ background: '#FDFBF7' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold" style={{ color: '#4A4A42' }}>
                {categoryMap[selectedCat].name} 상세 내역
              </h3>
              <button onClick={() => setSelectedCat(null)} className="p-1">
                <svg viewBox="0 0 20 20" width="20" height="20">
                  <path d="M5 5l10 10M15 5l-10 10" stroke="#8A8A80" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {selectedExpenses.map((e: any) => (
                <div key={e.id} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#fff' }}>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#4A4A42' }}>
                      {e.memo || categoryMap[e.category].name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#B0AEA4' }}>
                      {e.date.slice(5)}
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: '#5A5A50' }}>
                    {formatWon(e.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
