'use client'

import { useState, useEffect } from 'react'
import { DailyView } from './daily-view'
import { CategoryView } from './category-view'
import { HistoryView } from './history-view'
import { SettingsView } from './settings-view'
import { AddExpenseSheet } from './add-expense-sheet'
import { fetchExpenses, insertExpense } from '@/lib/supabase'
import { Expense } from '@/lib/types'

export function ExpenseApp() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('daily')
  const [showAdd, setShowAdd] = useState(false)
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [currentMonth, setCurrentMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  })

  useEffect(() => {
    fetchExpenses()
      .then(setExpenses)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleAddExpense = async (expense: any) => {
    try {
      const saved = await insertExpense(expense)
      setExpenses((prev) => [saved, ...prev])
    } catch (err) {
      console.error('Failed to save expense:', err)
    }
    setShowAdd(false)
  }

  return (
    <div className="min-h-screen" style={{ background: '#FDFBF7' }}>
      <header className="sticky top-0 z-10" style={{ background: '#FDFBF7', borderBottom: '1px solid #E8E6E0' }}>
        <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <h1 className="flex items-center text-lg font-bold" style={{ color: '#4A4A42' }}>
              <svg viewBox="0 0 20 20" width="20" height="20" className="mr-1.5">
                <circle cx="10" cy="10" r="8" fill="#B8CFA8" />
                <ellipse cx="10" cy="9" rx="3" ry="4" fill="#8BAF6E" />
                <path d="M10 5c1-3 4-2 3 0" stroke="#6B8F50" strokeWidth="1" fill="none" strokeLinecap="round" />
              </svg>
              소비콩
            </h1>
            <p className="text-xs mt-0.5" style={{ color: '#B0AEA4' }}>
              오늘 하루도 가볍게 기록해요
            </p>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: '#E8E6E0' }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <circle cx="12" cy="10" r="4" fill="#A8B898" />
              <path d="M5 22c0-5 3-7 7-7s7 2 7 7" fill="#A8B898" opacity="0.5" />
            </svg>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm" style={{ color: '#B0AEA4' }}>불러오는 중...</p>
          </div>
        ) : (
          <>
            {tab === 'daily' && (
              <DailyView
                expenses={expenses}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
              />
            )}
            {tab === 'cat' && <CategoryView expenses={expenses} />}
            {tab === 'hist' && <HistoryView expenses={expenses} />}
            {tab === 'set' && <SettingsView />}
          </>
        )}
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 z-10"
        style={{ background: '#FDFBF7', borderTop: '1px solid #E8E6E0' }}
      >
        <div className="max-w-md mx-auto px-5 py-2 flex items-center justify-around">
          <NavButton
            icon={
              <svg viewBox="0 0 24 24" width="20" height="20">
                <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <path d="M3 10h18M8 4v3M16 4v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
            label="캘린더"
            active={tab === 'daily'}
            onClick={() => setTab('daily')}
          />
          <NavButton
            icon={
              <svg viewBox="0 0 24 24" width="20" height="20">
                <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <circle cx="16" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <circle cx="8" cy="16" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
            }
            label="카테고리"
            active={tab === 'cat'}
            onClick={() => setTab('cat')}
          />
          <div className="w-14" />
          <NavButton
            icon={
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
            label="기록"
            active={tab === 'hist'}
            onClick={() => setTab('hist')}
          />
          <NavButton
            icon={
              <svg viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <path
                  d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M4.9 19.1l2.1-2.1M16.9 7.1l2.1-2.1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
            label="설정"
            active={tab === 'set'}
            onClick={() => setTab('set')}
          />
          <button
            onClick={() => setShowAdd(true)}
            className="absolute left-1/2 -translate-x-1/2 -top-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #8BAF6E 0%, #7A9B6D 100%)' }}
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v14M3 10h14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {showAdd && (
        <AddExpenseSheet
          selectedDate={selectedDate}
          onAdd={handleAddExpense}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  )
}

function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 transition-all"
      style={{
        opacity: active ? 1 : 0.35,
        color: active ? '#5A7A50' : '#8A8A80',
      }}
    >
      {icon}
      <span className="text-[10px]" style={{ fontWeight: active ? 600 : 400 }}>
        {label}
      </span>
    </button>
  )
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
