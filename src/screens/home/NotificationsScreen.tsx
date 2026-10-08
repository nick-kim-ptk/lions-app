import { useNavigate } from 'react-router-dom'
import { CaseSelect } from '@/components/CaseSelect'
import { useState, useEffect } from 'react'
import { NOTIF_DATA, type NotifItem } from '@/data/home'
import { markAllNotifRead } from '@/data/notifStore'

// 005-SL-HM-02 알림
export function NotificationsScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'알림' | '알림 없음'>('알림')
  // 정책: 알림 페이지에 진입하면 미확인 알림을 포함한 전체 알림이 읽음 처리된다
  const items = NOTIF_DATA.map((n) => ({ ...n, read: true }))
  useEffect(() => { markAllNotifRead() }, [])

  const handleItemClick = (n: NotifItem) => {
    if (n.link?.path) navigate(n.link.path)
  }

  const groups = ['오늘', '어제', '이전']

  const SettingsIcon = () => (
    <button onClick={() => navigate('/my/settings')} className="w-8 h-8 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#111827" strokeWidth="1.8"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="#111827" strokeWidth="1.8"/>
      </svg>
    </button>
  )

  return (
    <div className="min-h-full bg-[#F5F7FB]">
      {/* 헤더 */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {/* 토글 */}
        <CaseSelect value={tab} options={['알림', '알림 없음'] as const} onChange={setTab} />
        <SettingsIcon />
      </div>

      {/* 알림 탭 — 기존 화면 그대로 */}
      {tab === '알림' && (
        <>
          <div className="flex flex-col pb-6">
            {groups.map(group => {
              const grouped = items.filter(n => n.date === group)
              if (!grouped.length) return null
              return (
                <div key={group}>
                  <div className="px-4 pt-4 pb-1">
                    <span className="text-xs text-[#9CA3AF] font-medium">{group}</span>
                  </div>
                  {grouped.map(n => {
                    const hasLink = Boolean(n.link?.path)
                    return (
                      <div
                        key={n.id}
                        onClick={() => handleItemClick(n)}
                        className={`mx-4 mb-2 p-4 rounded-2xl border transition-colors ${
                          hasLink ? 'cursor-pointer active:bg-[#F3F4F6]' : 'cursor-default'
                        } ${
                          n.read ? 'bg-[#FFFFFF] border-[#DDE1EC]' : 'bg-[#EBF0FF] border-[#1B5BF0]/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {!n.read && <div className="w-2 h-2 rounded-full bg-[#1B5BF0] shrink-0" />}
                            <span className="text-[13px] leading-snug truncate text-[#111827]">
                              {n.title}
                            </span>
                            {n.required && <span className="shrink-0 text-[9px] font-bold text-[#64748B] bg-[#EEF1F7] rounded px-1 py-0.5">필수</span>}
                          </div>
                          <span className="text-[11px] text-[#9CA3AF] shrink-0 pt-0.5">{n.time}</span>
                        </div>
                        <p className="text-[12px] text-[#64748B] leading-relaxed line-clamp-2">{n.body}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <p className="text-center text-[11px] text-[#9CA3AF] pb-6">
            10일이 지난 알림은 자동으로 삭제됩니다.
          </p>
        </>
      )}

      {/* 알림 없음 탭 — 빈 상태 */}
      {tab === '알림 없음' && (
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
          <p className="text-[14px] text-[#9CA3AF]">아직 도착한 알림이 없어요</p>
        </div>
      )}
    </div>
  )
}
