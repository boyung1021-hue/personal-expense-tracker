'use client'

import { useState } from 'react'
import { CategoryIcon } from './category-icons'
import { CATEGORIES, formatWon } from '@/lib/expense-data'
import { Calendar } from '@/components/ui/calendar'

export function AddExpenseSheet({ selectedDate, onAdd, onClose }: any) {
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [discount, setDiscount] = useState('')
  const [account, setAccount] = useState('')
  const [memo, setMemo] = useState('')
  const [date, setDate] = useState(selectedDate)
  const [showCalendar, setShowCalendar] = useState(false)

  const handleSubmit = () => {
    if (!category || !amount) return

    onAdd({
      id: `${date}-${Date.now()}`,
      date,
      category,
      amount: parseInt(amount),
      memo,
      discount: discount ? parseInt(discount) : undefined,
      account: account || undefined,
    })
  }

  const quickAmounts = [1000, 3000, 5000, 10000, 30000, 50000]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl p-5"
        style={{ background: '#FDFBF7' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ color: '#4A4A42' }}>
            지출 추가
          </h2>
          <button onClick={onClose} className="p-1">
            <svg viewBox="0 0 20 20" width="20" height="20">
              <path d="M5 5l10 10M15 5l-10 10" stroke="#8A8A80" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2" style={{ color: '#5A5A50' }}>
            날짜
          </label>
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full p-3 rounded-xl text-left flex items-center justify-between"
            style={{ background: '#E8E6E0' }}
          >
            <span className="text-sm" style={{ color: '#6A6A60' }}>
              {date}
            </span>
            <svg viewBox="0 0 20 20" width="16" height="16" style={{ transform: showCalendar ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              <path d="M5 7l5 5 5-5" stroke="#8A8A80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
          {showCalendar && (
            <div className="mt-2 rounded-xl overflow-hidden flex justify-center" style={{ background: '#fff', border: '2px solid #E8E6E0' }}>
              <Calendar
                mode="single"
                selected={new Date(date + 'T00:00:00')}
                onSelect={(day) => {
                  if (day) {
                    const y = day.getFullYear()
                    const m = String(day.getMonth() + 1).padStart(2, '0')
                    const d = String(day.getDate()).padStart(2, '0')
                    setDate(`${y}-${m}-${d}`)
                    setShowCalendar(false)
                  }
                }}
                initialFocus
              />
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-3" style={{ color: '#5A5A50' }}>
            카테고리
          </label>
          <div className="grid grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all"
                style={{
                  background: category === cat.id ? cat.bg : '#fff',
                  border: category === cat.id ? `2px solid ${cat.accent}` : '2px solid transparent',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: category === cat.id ? '#fff' : cat.bg }}
                >
                  <CategoryIcon id={cat.id} size={28} />
                </div>
                <span className="text-xs font-medium" style={{ color: '#6A6A60' }}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2" style={{ color: '#5A5A50' }}>
            금액
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="금액을 입력하세요"
            className="w-full p-4 rounded-xl text-base"
            style={{ background: '#fff', border: '2px solid #E8E6E0', color: '#4A4A42' }}
          />
          <div className="grid grid-cols-6 gap-2 mt-3">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount((prev) => String((parseInt(prev) || 0) + amt))}
                className="py-2 px-3 rounded-lg text-xs font-medium"
                style={{ background: '#E8E6E0', color: '#6A6A60' }}
              >
                {amt >= 10000 ? `+${amt / 10000}만` : `+${amt / 1000}천`}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2" style={{ color: '#5A5A50' }}>
            할인 금액 (선택)
          </label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="할인 금액을 입력하세요"
            className="w-full p-4 rounded-xl text-base"
            style={{ background: '#fff', border: '2px solid #E8E6E0', color: '#4A4A42' }}
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2" style={{ color: '#5A5A50' }}>
            출처 계좌 (선택)
          </label>
          <select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full p-4 rounded-xl text-base appearance-none"
            style={{ background: '#fff', border: '2px solid #E8E6E0', color: account ? '#4A4A42' : '#B0AEA4' }}
          >
            <option value="">선택하세요</option>
            <option value="카카오뱅크 체크">카카오뱅크 체크</option>
            <option value="우리은행 체크">우리은행 체크</option>
            <option value="복지포인트">복지포인트</option>
            <option value="현금">현금</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2" style={{ color: '#5A5A50' }}>
            메모 (선택)
          </label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
            className="w-full p-4 rounded-xl text-base"
            style={{ background: '#fff', border: '2px solid #E8E6E0', color: '#4A4A42' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!category || !amount}
          className="w-full py-4 rounded-xl font-bold text-base transition-opacity"
          style={{
            background: category && amount ? 'linear-gradient(135deg, #8BAF6E 0%, #7A9B6D 100%)' : '#E8E6E0',
            color: category && amount ? '#fff' : '#B0AEA4',
            opacity: category && amount ? 1 : 0.6,
          }}
        >
          추가하기
        </button>
      </div>
    </div>
  )
}
