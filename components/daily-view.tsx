'use client'

import { useState } from 'react'
import { EmotionFace, getFaceType, faceBg, CategoryIcon } from './category-icons'
import { categoryMap, formatWon, getDaysInMonth, getFirstDayOfMonth } from '@/lib/expense-data'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export function DailyView({ expenses, selectedDate, setSelectedDate, currentMonth, setCurrentMonth }: any) {
  const { year, month } = currentMonth
  const days = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = formatDate(new Date())

  const dailyTotals: Record<string, number> = {}
  expenses.forEach((e: any) => {
    if (e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)) {
      dailyTotals[e.date] = (dailyTotals[e.date] || 0) + (e.amount - (e.discount || 0))
    }
  })

  const dayExpenses = expenses.filter((e: any) => e.date === selectedDate)
  const dayTotal = dayExpenses.reduce((sum: number, e: any) => sum + (e.amount - (e.discount || 0)), 0)

  const changeMonth = (delta: number) => {
    setCurrentMonth((prev: any) => {
      const newMonth = prev.month + delta
      if (newMonth < 0) return { year: prev.year - 1, month: 11 }
      if (newMonth > 11) return { year: prev.year + 1, month: 0 }
      return { ...prev, month: newMonth }
    })
  }

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

      <div className="mx-5 mb-3 p-4 rounded-2xl" style={{ background: '#fff' }}>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {WEEKDAYS.map((w, i) => (
            <div
              key={w}
              className="text-center text-[11px] font-semibold pb-2"
              style={{
                color: i === 0 ? '#C4908E' : i === 6 ? '#8EAAC4' : '#B0AEA4',
              }}
            >
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: days }).map((_, i) => {
            const d = i + 1
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
            const isSelected = dateStr === selectedDate
            const isToday = dateStr === today
            const total = dailyTotals[dateStr]
            const faceType = getFaceType(total)

            return (
              <button key={d} onClick={() => setSelectedDate(dateStr)} className="flex justify-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: isSelected ? '#7A9B6D' : faceType ? faceBg[faceType] : 'transparent',
                    border: isToday && !isSelected ? '2px solid #90B87A' : '2px solid transparent',
                    boxShadow: isSelected ? '0 2px 8px rgba(122,155,109,0.3)' : 'none',
                  }}
                >
                  {faceType && !isSelected ? (
                    <EmotionFace type={faceType} size={26} />
                  ) : (
                    <span
                      className="text-xs"
                      style={{
                        fontWeight: isToday ? 700 : 400,
                        color: isSelected ? '#fff' : '#6A6A60',
                      }}
                    >
                      {d}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-4">
        {[
          { t: 'great', l: '절약' },
          { t: 'good', l: '보통' },
          { t: 'okay', l: '주의' },
          { t: 'bad', l: '과소비' },
          { t: 'terrible', l: '폭발' },
        ].map((x) => (
          <span key={x.t} className="flex flex-col items-center gap-0.5">
            <EmotionFace type={x.t} size={20} />
            <span className="text-[9px] font-medium" style={{ color: '#AAA89E' }}>
              {x.l}
            </span>
          </span>
        ))}
      </div>

      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold" style={{ color: '#5A5A50' }}>
            {parseInt(selectedDate.slice(5, 7))}월 {parseInt(selectedDate.slice(8))}일의 기록
          </span>
          {dayTotal > 0 && (
            <span className="text-sm font-bold" style={{ color: '#7A9B6D' }}>
              {formatWon(dayTotal)}
            </span>
          )}
        </div>
        {dayExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12" style={{ background: '#FDFBF7' }}>
            <svg viewBox="0 0 40 40" width="36" height="36">
              <path
                d="M20 8c-4 0-7 3-7 7 0 6 7 14 7 14s7-8 7-14c0-4-3-7-7-7z"
                fill="#D4E0CC"
                opacity="0.6"
              />
              <circle cx="20" cy="15" r="2.5" fill="#8BAF6E" />
            </svg>
            <span className="text-[13px] mt-2" style={{ color: '#B0AEA4' }}>
              기록이 없는 날이에요
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {dayExpenses.map((e: any, i: number) => (
              <ExpenseRow key={e.id} expense={e} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ExpenseRow({ expense, index }: any) {
  const [showDetail, setShowDetail] = useState(false)
  const category = categoryMap[expense.category]
  const hasDetail = expense.memo || expense.discount || expense.account

  return (
    <>
      <div
        className="fs flex items-center gap-3 p-3 rounded-2xl cursor-pointer"
        style={{
          background: '#fff',
          animationDelay: `${index * 0.04}s`,
        }}
        onClick={() => setShowDetail(true)}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: category.bg }}
        >
          <CategoryIcon id={expense.category} size={26} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold" style={{ color: '#4A4A42' }}>
            {category.name}
          </div>
          {expense.memo && (
            <div
              className="text-[11px] mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ color: '#B0AEA4' }}
            >
              {expense.memo}
            </div>
          )}
        </div>
        <span className="text-[13px] font-bold" style={{ color: '#5A5A50', letterSpacing: -0.3 }}>
          {formatWon(expense.amount)}
        </span>
      </div>

      {showDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setShowDetail(false)}
        >
          <div
            className="w-[85%] max-w-sm rounded-2xl p-5"
            style={{ background: '#FDFBF7' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: category.bg }}
              >
                <CategoryIcon id={expense.category} size={28} />
              </div>
              <div>
                <div className="text-base font-bold" style={{ color: '#4A4A42' }}>
                  {category.name}
                </div>
                <div className="text-xs" style={{ color: '#B0AEA4' }}>
                  {expense.date}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: '#fff' }}>
                <span className="text-xs font-semibold" style={{ color: '#8A8A80' }}>금액</span>
                <span className="text-sm font-bold" style={{ color: '#4A4A42' }}>{formatWon(expense.amount)}</span>
              </div>

              {expense.discount > 0 && (
                <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: '#fff' }}>
                  <span className="text-xs font-semibold" style={{ color: '#8A8A80' }}>할인 금액</span>
                  <span className="text-sm font-bold" style={{ color: '#C4908E' }}>-{formatWon(expense.discount)}</span>
                </div>
              )}

              {expense.discount > 0 && (
                <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: '#F0EDE6' }}>
                  <span className="text-xs font-semibold" style={{ color: '#8A8A80' }}>실결제 금액</span>
                  <span className="text-sm font-bold" style={{ color: '#7A9B6D' }}>{formatWon(expense.amount - expense.discount)}</span>
                </div>
              )}

              {expense.account && (
                <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: '#fff' }}>
                  <span className="text-xs font-semibold" style={{ color: '#8A8A80' }}>출처 계좌</span>
                  <span className="text-sm font-medium" style={{ color: '#4A4A42' }}>{expense.account}</span>
                </div>
              )}

              {expense.memo && (
                <div className="p-3 rounded-xl" style={{ background: '#fff' }}>
                  <span className="text-xs font-semibold block mb-1" style={{ color: '#8A8A80' }}>메모</span>
                  <span className="text-sm" style={{ color: '#4A4A42' }}>{expense.memo}</span>
                </div>
              )}

              {!hasDetail && (
                <div className="text-center py-2">
                  <span className="text-xs" style={{ color: '#B0AEA4' }}>추가 정보가 없습니다</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowDetail(false)}
              className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{ background: '#E8E6E0', color: '#6A6A60' }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
