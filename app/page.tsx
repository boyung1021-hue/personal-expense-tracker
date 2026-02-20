'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExpenseApp } from '@/components/expense-app'
import { getSession, supabase } from '@/lib/supabase'

export default function Page() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace('/login')
      } else {
        setAuthed(true)
      }
      setChecking(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login')
        setAuthed(false)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDFBF7' }}>
        <p className="text-sm" style={{ color: '#B0AEA4' }}>로딩 중...</p>
      </div>
    )
  }

  if (!authed) return null

  return <ExpenseApp />
}