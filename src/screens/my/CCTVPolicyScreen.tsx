import { Header } from "@/components/Layout"

import { CCTV_POLICY } from "@/data/my"

import { LegalDocument } from "./LegalDocument"

// 033-SL-MY-04 영상정보처리기기 운영관리방침

export function CCTVPolicyScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="영상정보처리기기 운영관리방침" />
      <LegalDocument doc={CCTV_POLICY} />
    </div>
  )
}
