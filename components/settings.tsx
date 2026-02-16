'use client'

import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ChevronRight } from 'lucide-react'

export function Settings() {
  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-4">
        <h1 className="text-2xl font-medium text-balance text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Customize your expense tracking experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground px-1">
            Notifications
          </h3>
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label
                  htmlFor="daily-reminder"
                  className="text-sm font-medium text-card-foreground cursor-pointer"
                >
                  Daily Reminder
                </Label>
                <p className="text-xs text-muted-foreground">
                  Get reminded to log your expenses
                </p>
              </div>
              <Switch id="daily-reminder" />
            </div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label
                  htmlFor="weekly-report"
                  className="text-sm font-medium text-card-foreground cursor-pointer"
                >
                  Weekly Report
                </Label>
                <p className="text-xs text-muted-foreground">
                  Receive weekly spending summaries
                </p>
              </div>
              <Switch id="weekly-report" />
            </div>
          </Card>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground px-1">
            Preferences
          </h3>
          <Card className="divide-y divide-border bg-card border-border">
            <button className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="text-left">
                <p className="text-sm font-medium text-card-foreground">
                  Currency
                </p>
                <p className="text-xs text-muted-foreground">USD ($)</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="text-left">
                <p className="text-sm font-medium text-card-foreground">
                  Categories
                </p>
                <p className="text-xs text-muted-foreground">Manage categories</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="text-left">
                <p className="text-sm font-medium text-card-foreground">
                  Export Data
                </p>
                <p className="text-xs text-muted-foreground">Download your data</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </Card>
        </div>

        {/* About */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground px-1">About</h3>
          <Card className="divide-y divide-border bg-card border-border">
            <button className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <p className="text-sm font-medium text-card-foreground">
                Privacy Policy
              </p>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <p className="text-sm font-medium text-card-foreground">
                Terms of Service
              </p>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
