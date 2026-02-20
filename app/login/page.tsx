'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/login-form'
import { getSession } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      if (session) router.replace('/')
    })
  }, [router])

  return <LoginForm />
}