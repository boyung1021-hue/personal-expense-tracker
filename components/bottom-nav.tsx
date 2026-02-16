'use client'

import { Calendar, PlusCircle, BarChart3, Settings } from 'lucide-react'

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'records', icon: Calendar, label: 'Records' },
    { id: 'add', icon: PlusCircle, label: 'Add', primary: true },
    { id: 'analysis', icon: BarChart3, label: 'Analysis' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <nav className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            if (item.primary) {
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className="flex flex-col items-center gap-1 relative -top-4"
                >
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {item.label}
                  </span>
                </button>
              )
            }

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center gap-1 py-2 min-w-[60px]"
              >
                <Icon
                  className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                />
                <span
                  className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
