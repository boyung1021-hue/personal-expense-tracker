'use client'

export function SettingsView() {
  return (
    <div className="px-5 py-4">
      <h2 className="text-lg font-bold mb-4" style={{ color: '#4A4A42' }}>
        설정
      </h2>
      
      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-2xl" style={{ background: '#fff' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#5A5A50' }}>
            알림 설정
          </h3>
          <div className="flex flex-col gap-3">
            <SettingRow label="매일 기록 알림" />
            <SettingRow label="예산 초과 알림" />
            <SettingRow label="주간 리포트" />
          </div>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: '#fff' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#5A5A50' }}>
            표시 설정
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#6A6A60' }}>
                통화
              </span>
              <span className="text-sm font-medium" style={{ color: '#4A4A42' }}>
                KRW (₩)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#6A6A60' }}>
                테마
              </span>
              <span className="text-sm font-medium" style={{ color: '#4A4A42' }}>
                라이트
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: '#fff' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#5A5A50' }}>
            카테고리 관리
          </h3>
          <p className="text-xs" style={{ color: '#B0AEA4' }}>
            카테고리 추가, 수정, 삭제 기능은 곧 제공될 예정이에요
          </p>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: '#fff' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#5A5A50' }}>
            데이터
          </h3>
          <div className="flex flex-col gap-2">
            <button className="text-sm text-left" style={{ color: '#6A6A60' }}>
              데이터 내보내기
            </button>
            <button className="text-sm text-left" style={{ color: '#6A6A60' }}>
              데이터 가져오기
            </button>
            <button className="text-sm text-left" style={{ color: '#C48080' }}>
              모든 데이터 삭제
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: '#fff' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#5A5A50' }}>
            정보
          </h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#6A6A60' }}>
                버전
              </span>
              <span className="text-sm" style={{ color: '#B0AEA4' }}>
                1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm" style={{ color: '#6A6A60' }}>
        {label}
      </span>
      <div
        className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all"
        style={{ background: '#8BAF6E' }}
      >
        <div className="w-5 h-5 rounded-full bg-white translate-x-5 transition-transform" />
      </div>
    </div>
  )
}
