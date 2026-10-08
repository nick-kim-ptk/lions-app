import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Layout'

// 002-SL-CM-02 권한 요청
export function PermissionsScreen() {
  const navigate = useNavigate()
  const permissions = [
    { icon: '📱', label: '기기 및 앱 기록', desc: '앱 버전 확인 및 사용성 개선' },
    { icon: '📞', label: '전화', desc: '폰 상태 확인 및 예매 안내 전달 시' },
    { icon: '🔔', label: '알림', desc: '이벤트 등 다양한 정보를 Push를 통해 알림' },
    { icon: '📷', label: '카메라', desc: '이미지 촬영 시 필요 권한' },
    { icon: '🖼️', label: '앨범/저장 공간', desc: '이미지 게재 시 필요 권한' },
  ]
  return (
    <Page>
      <div className="flex-1 px-5 pt-16 pb-8 flex flex-col">
        {/* Top text */}
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-[18px] font-bold text-[#111827] leading-snug">
            라이온즈와 한 걸음 더 가까워질 시간!
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed">
            준비된 모든 서비스를 빠짐없이 즐기실 수 있도록<br />서비스 접근 권한 허용이 필요해요.
          </p>
        </div>

        {/* Permission list */}
        <div className="flex flex-col gap-3">
          {permissions.map((p, i) => (
            <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8EBF4] flex items-center justify-center shrink-0 text-lg">
                {p.icon}
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[14px] font-semibold text-[#111827] mb-0.5">{p.label}</p>
                <p className="text-[12px] text-[#64748B] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer notice */}
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
            접근 권한은 동의 하지 않으셔도 서비스 이용이 가능하나 일부 기능에 제약이 발생할 수 있습니다.
          </p>
          <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
            옵션 변경 시 [설정 - 앱 접근 권한]을 통해 변경 할 수 있습니다.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-10 flex flex-col gap-3">
        <button
          onClick={() => navigate('/notice')}
          className="h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold text-[16px]"
        >
          동의하고 시작하기
        </button>
      </div>
    </Page>
  )
}
