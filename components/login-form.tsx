'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/supabase'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      router.push('/')
    } catch (err: any) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#FDFBF7' }}>
      <div className="w-full max-w-sm">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: '#E8F0E0' }}
          >
            <svg viewBox="0 0 40 40" width="40" height="40">
              <circle cx="20" cy="20" r="16" fill="#B8CFA8" />
              <ellipse cx="20" cy="18" rx="6" ry="8" fill="#8BAF6E" />
              <path d="M20 10c2-6 8-4 6 0" stroke="#6B8F50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#4A4A42' }}>
            소비콩
          </h1>
          <p className="text-sm mt-1" style={{ color: '#B0AEA4' }}>
            오늘 하루도 가볍게 기록해요
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-2xl p-6"
          style={{ background: '#FFFFFF', border: '1px solid #E8E6E0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <h2 className="text-base font-semibold mb-5" style={{ color: '#4A4A42' }}>
            로그인
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B6B5F' }}>
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: '#F5F3EF',
                  border: '1px solid #E8E6E0',
                  color: '#4A4A42',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid #8BAF6E'
                  e.target.style.background = '#FFFFFF'
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid #E8E6E0'
                  e.target.style.background = '#F5F3EF'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#6B6B5F' }}>
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: '#F5F3EF',
                  border: '1px solid #E8E6E0',
                  color: '#4A4A42',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid #8BAF6E'
                  e.target.style.background = '#FFFFFF'
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid #E8E6E0'
                  e.target.style.background = '#F5F3EF'
                }}
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-xs py-2.5 px-3 rounded-xl" style={{ color: '#C04848', background: '#FEF0F0' }}>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white mt-2 transition-opacity"
              style={{
                background: loading
                  ? '#A8C898'
                  : 'linear-gradient(135deg, #8BAF6E 0%, #7A9B6D 100%)',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#C8C6C0' }}>
          소비콩과 함께 현명한 소비 습관을 만들어요 🌱
        </p>
      </div>
    </div>
  )
}