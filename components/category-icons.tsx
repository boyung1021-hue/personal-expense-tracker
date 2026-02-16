export function CategoryIcon({ id, size = 24 }: { id: string; size?: number }) {
  const icons: Record<string, JSX.Element> = {
    coffee: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M8 12h12v10a4 4 0 01-4 4h-4a4 4 0 01-4-4V12z" fill="#C9B99A" opacity="0.5" />
        <path
          d="M8 12h12v10a4 4 0 01-4 4h-4a4 4 0 01-4-4V12z"
          stroke="#8B7D6B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M20 15h2a2 2 0 010 4h-2" stroke="#8B7D6B" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M11 9c0-2 1-3 1-3M14 8c0-2 1-3 1-3M17 9c0-2 1-3 1-3"
          stroke="#8B7D6B"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
    food: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <ellipse cx="16" cy="18" rx="9" ry="6" fill="#E8DCCC" opacity="0.5" />
        <ellipse cx="16" cy="18" rx="9" ry="6" stroke="#8B7D6B" strokeWidth="1.5" fill="none" />
        <ellipse cx="16" cy="16" rx="9" ry="3" stroke="#8B7D6B" strokeWidth="1.5" fill="#FDFBF7" />
        <circle cx="12" cy="15" r="1" fill="#C4A882" />
        <circle cx="16" cy="14.5" r="1.2" fill="#B8C4A0" />
        <circle cx="19.5" cy="15.5" r="0.9" fill="#D4A0A0" />
      </svg>
    ),
    transport: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <rect x="7" y="10" width="18" height="13" rx="4" fill="#C8D5DC" opacity="0.4" />
        <rect x="7" y="10" width="18" height="13" rx="4" stroke="#6E8898" strokeWidth="1.5" fill="none" />
        <rect x="10" y="13" width="5" height="4" rx="1" stroke="#6E8898" strokeWidth="1.2" fill="#FDFBF7" />
        <rect x="17" y="13" width="5" height="4" rx="1" stroke="#6E8898" strokeWidth="1.2" fill="#FDFBF7" />
        <circle cx="11.5" cy="25" r="1.5" fill="#6E8898" />
        <circle cx="20.5" cy="25" r="1.5" fill="#6E8898" />
      </svg>
    ),
    shopping: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M9 13h14l-2 12H11L9 13z" fill="#E8D0D0" opacity="0.4" />
        <path
          d="M9 13h14l-2 12H11L9 13z"
          stroke="#B08080"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M13 13V10a3 3 0 016 0v3" stroke="#B08080" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="19" r="1.5" fill="#B08080" opacity="0.4" />
      </svg>
    ),
    snack: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M10 22c0-6 2-12 6-12s6 6 6 12" fill="#F0DDE0" opacity="0.4" />
        <path d="M10 22c0-6 2-12 6-12s6 6 6 12" stroke="#C08890" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M9 22h14" stroke="#C08890" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="17" r="1" fill="#C08890" opacity="0.5" />
        <circle cx="17" cy="15" r="0.8" fill="#C08890" opacity="0.5" />
        <circle cx="15.5" cy="20" r="0.7" fill="#C08890" opacity="0.5" />
      </svg>
    ),
    culture: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="10" width="16" height="12" rx="2" fill="#D4D8E8" opacity="0.4" />
        <rect x="8" y="10" width="16" height="12" rx="2" stroke="#8088A8" strokeWidth="1.5" fill="none" />
        <polygon points="14,14 14,19 19,16.5" fill="#8088A8" opacity="0.6" />
        <path d="M12 25h8" stroke="#8088A8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    health: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M16 8l1.5 2.5H22l-2 3 1 3.5-5-2-5 2 1-3.5-2-3h4.5L16 8z" fill="#C8DEC8" opacity="0.4" />
        <path d="M13 15h6M16 12v6" stroke="#6B9B6B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="8" stroke="#6B9B6B" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <rect x="9" y="15" width="14" height="10" rx="2" fill="#E8DDD0" opacity="0.4" />
        <rect x="9" y="15" width="14" height="10" rx="2" stroke="#B0A080" strokeWidth="1.5" fill="none" />
        <rect x="8" y="12" width="16" height="4" rx="1.5" stroke="#B0A080" strokeWidth="1.5" fill="#FDFBF7" />
        <path d="M16 12v13" stroke="#B0A080" strokeWidth="1.5" />
        <path
          d="M16 12c-2-3-5-3-4-1s4 1 4 1M16 12c2-3 5-3 4-1s-4 1-4 1"
          stroke="#B0A080"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    market: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M10 14c0-3 2.5-5 6-5s6 2 6 5" stroke="#8BA880" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="16" cy="20" rx="8" ry="5" fill="#D8E4D0" opacity="0.4" />
        <ellipse cx="16" cy="20" rx="8" ry="5" stroke="#8BA880" strokeWidth="1.5" fill="none" />
        <circle cx="13" cy="20" r="1.2" fill="#8BA880" opacity="0.5" />
        <circle cx="17" cy="19" r="1" fill="#8BA880" opacity="0.5" />
        <circle cx="15" cy="22" r="0.8" fill="#8BA880" opacity="0.5" />
      </svg>
    ),
    beauty: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="16" cy="13" r="5" fill="#E4D8DC" opacity="0.4" />
        <circle cx="16" cy="13" r="5" stroke="#A8889C" strokeWidth="1.5" fill="none" />
        <path d="M16 18v7" stroke="#A8889C" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 22h6" stroke="#A8889C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    sub: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <rect x="10" y="8" width="12" height="18" rx="3" fill="#D0D8E4" opacity="0.3" />
        <rect x="10" y="8" width="12" height="18" rx="3" stroke="#7888A0" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="22" r="1.2" fill="#7888A0" />
        <rect x="13" y="11" width="6" height="7" rx="1" fill="#7888A0" opacity="0.15" />
      </svg>
    ),
    etc: (
      <svg viewBox="0 0 32 32" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="10" cy="16" r="2" fill="#AAA89E" />
        <circle cx="16" cy="16" r="2" fill="#AAA89E" />
        <circle cx="22" cy="16" r="2" fill="#AAA89E" />
      </svg>
    ),
  }

  return <div style={{ width: size, height: size }}>{icons[id] || icons.etc}</div>
}

export function EmotionFace({ type, size = 28 }: { type: string; size?: number }) {
  const faces: Record<string, JSX.Element> = {
    great: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <circle cx="16" cy="16" r="13" fill="#D2E6C8" />
        <circle cx="12" cy="14" r="1.5" fill="#5A7A50" />
        <circle cx="20" cy="14" r="1.5" fill="#5A7A50" />
        <path d="M11 19c2 3 8 3 10 0" stroke="#5A7A50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    good: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <circle cx="16" cy="16" r="13" fill="#DCE8C8" />
        <circle cx="12" cy="14" r="1.5" fill="#6A7A58" />
        <circle cx="20" cy="14" r="1.5" fill="#6A7A58" />
        <path d="M12 20c1.5 1.5 6.5 1.5 8 0" stroke="#6A7A58" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    okay: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <circle cx="16" cy="16" r="13" fill="#E8E0C4" />
        <circle cx="12" cy="14" r="1.5" fill="#8A7A58" />
        <circle cx="20" cy="14" r="1.5" fill="#8A7A58" />
        <path d="M12 20h8" stroke="#8A7A58" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    bad: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <circle cx="16" cy="16" r="13" fill="#E8D8C0" />
        <circle cx="12" cy="14" r="1.5" fill="#8A7058" />
        <circle cx="20" cy="14" r="1.5" fill="#8A7058" />
        <path d="M12 21c2-2 6-2 8 0" stroke="#8A7058" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    terrible: (
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <circle cx="16" cy="16" r="13" fill="#E8CCC0" />
        <path d="M10 12l4 2M22 12l-4 2" stroke="#8A6050" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="12" cy="15" r="1.3" fill="#8A6050" />
        <circle cx="20" cy="15" r="1.3" fill="#8A6050" />
        <ellipse cx="16" cy="21" rx="2.5" ry="2" fill="#8A6050" opacity="0.5" />
      </svg>
    ),
  }

  return faces[type] || null
}

export function getFaceType(amount: number): string | null {
  if (!amount) return null
  if (amount < 5000) return 'great'
  if (amount < 15000) return 'good'
  if (amount < 30000) return 'okay'
  if (amount < 50000) return 'bad'
  return 'terrible'
}

export const faceBg: Record<string, string> = {
  great: '#DDEFD4',
  good: '#E4EED4',
  okay: '#EEEAD0',
  bad: '#EEE2CC',
  terrible: '#EED8D0',
}
