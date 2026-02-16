export const CATEGORIES = [
  { id: 'coffee', name: '커피', bg: '#F3EDE4', accent: '#C4A97D' },
  { id: 'food', name: '식비', bg: '#EDEADC', accent: '#B5AD8E' },
  { id: 'transport', name: '교통', bg: '#E2E8EE', accent: '#8FA8B8' },
  { id: 'shopping', name: '쇼핑', bg: '#F2E4E4', accent: '#C4A0A0' },
  { id: 'snack', name: '간식', bg: '#F0E8F0', accent: '#BEA4BE' },
  { id: 'culture', name: '문화', bg: '#E8EAF0', accent: '#9EA4BE' },
  { id: 'health', name: '건강', bg: '#E0EDE4', accent: '#8EB89A' },
  { id: 'gift', name: '선물', bg: '#F0EAE0', accent: '#C4B49A' },
  { id: 'market', name: '마트', bg: '#E8EDE0', accent: '#A8B494' },
  { id: 'beauty', name: '미용', bg: '#EDE6EA', accent: '#BCA4B0' },
  { id: 'sub', name: '구독', bg: '#E4E8EE', accent: '#96A4B4' },
  { id: 'etc', name: '기타', bg: '#E8E8E4', accent: '#AAAA9E' },
]

export const categoryMap = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

export function formatWon(n: number): string {
  return '₩' + n.toLocaleString('ko-KR')
}

export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function mockExpenses() {
  const expenses: any[] = []
  const now = new Date()
  
  const memos: Record<string, string[]> = {
    coffee: ['스타벅스 아아', '투썸 라떼', '메가커피', '이디야'],
    food: ['김치찌개', '제육볶음', '돈까스', '비빔밥'],
    transport: ['지하철', '버스', '택시'],
    shopping: ['유니클로', '다이소', '올리브영'],
    snack: ['편의점', '붕어빵', '떡볶이'],
    culture: ['넷플릭스', '영화', '전시회'],
    health: ['약국', '비타민', '헬스장'],
    gift: ['생일선물', '기념일'],
    market: ['이마트', '홈플러스'],
    beauty: ['미용실', '네일'],
    sub: ['넷플릭스', '스포티파이'],
    etc: ['세탁', '문구'],
  }
  
  const amounts: Record<string, number[]> = {
    coffee: [4500, 5000, 5500, 6000],
    food: [8000, 9500, 11000, 15000],
    transport: [1350, 1250, 15000, 22000],
    shopping: [15000, 25000, 35000, 48000],
    snack: [2500, 3000, 1500, 5500],
    culture: [14500, 13000, 15000],
    health: [5000, 15000, 50000],
    gift: [30000, 50000],
    market: [35000, 52000, 28000],
    beauty: [15000, 35000],
    sub: [14500, 10900, 14900],
    etc: [5000, 10000],
  }
  
  const categoryIds = CATEGORIES.map((c) => c.id)
  
  for (let d = 60; d >= 0; d--) {
    const date = new Date(now)
    date.setDate(date.getDate() - d)
    const dateStr = formatDate(date)
    const count = Math.floor(Math.random() * 4) + 1
    
    for (let i = 0; i < count; i++) {
      const categoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)]
      expenses.push({
        id: `${dateStr}-${i}`,
        date: dateStr,
        category: categoryId,
        amount: amounts[categoryId][Math.floor(Math.random() * amounts[categoryId].length)],
        memo: memos[categoryId][Math.floor(Math.random() * memos[categoryId].length)],
      })
    }
  }
  
  return expenses
}
