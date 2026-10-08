import { Header } from '@/components/Layout'
import { PRIVACY_POLICY } from '@/data/my'
import { LegalDocument } from './LegalDocument'

// 032-SL-MY-03 개인정보 처리방침
export function PrivacyPolicyScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="개인정보 처리방침" />
      <LegalDocument doc={PRIVACY_POLICY} />
    </div>
  )
}
