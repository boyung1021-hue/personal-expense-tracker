'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { categoryIcons } from '@/lib/mock-data'

const categories = Object.keys(categoryIcons)

export function AddExpenseForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - in real app would save to database
    console.log('[v0] Expense added:', {
      date,
      amount: parseFloat(amount),
      category: selectedCategory,
      memo,
    })
    // Reset form
    setSelectedCategory('')
    setAmount('')
    setMemo('')
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-4">
        <h1 className="text-2xl font-medium text-balance text-foreground">
          Add Expense
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Record a new expense quickly and easily
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-card border-border"
            required
          />
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium">
            Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="pl-7 bg-card border-border"
              required
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Category</Label>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                  selectedCategory === category
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <span className="text-2xl">
                  {categoryIcons[category] || '📦'}
                </span>
                <span className="text-xs font-medium text-center leading-tight">
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Memo */}
        <div className="space-y-2">
          <Label htmlFor="memo" className="text-sm font-medium">
            Memo (Optional)
          </Label>
          <Textarea
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Add a note..."
            className="bg-card border-border resize-none"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-14 text-base font-semibold"
          disabled={!selectedCategory || !amount}
        >
          Add Expense
        </Button>
      </form>
    </div>
  )
}
