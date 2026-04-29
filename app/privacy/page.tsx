import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "JoyousGarage 개인정보처리방침 — 어떤 정보를 수집하고 어떻게 사용하는지.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="privacy-page">
        <header className="page-header">
          <div className="section-eyebrow">Legal</div>
          <h1 className="section-title">
            Privacy <em>policy</em>.
          </h1>
          <p className="page-lead">개인정보처리방침</p>
          <p className="page-meta">Last updated · 2026.04.27</p>
        </header>

        <article className="prose">
          <p>
            JoyousGarage(이하 &ldquo;사이트&rdquo;)는 운영자 Padawan Joy의 개인
            블로그입니다. 본 방침은 사이트가 어떤 정보를 수집하고, 어떤 목적으로
            사용하는지를 설명합니다.
          </p>

          <h2>1. 수집하는 정보</h2>
          <ul>
            <li>
              <strong>자동 수집 정보</strong> — 방문자의 IP 주소, 브라우저
              종류, 운영체제, 방문 시각, 참조 URL, 페이지 조회 기록 (웹 분석
              도구 및 광고 시스템에서 자동으로 수집)
            </li>
            <li>
              <strong>쿠키</strong> — 사이트 이용 환경 개선 및 광고 노출 최적화를
              위해 쿠키를 사용합니다
            </li>
            <li>
              <strong>자발적 제공 정보</strong> — 뉴스레터 구독 시 입력하신 이메일
              주소
            </li>
          </ul>
          <p>
            사이트는 별도의 회원가입 기능을 제공하지 않으며, 그 외 개인 식별
            정보를 수집하지 않습니다.
          </p>

          <h2>2. 수집 목적</h2>
          <ul>
            <li>사이트 이용 통계 분석 및 콘텐츠 개선</li>
            <li>뉴스레터 발송 (구독자에 한함)</li>
            <li>광고 게재 (Google AdSense)</li>
            <li>보안 및 부정 이용 방지</li>
          </ul>

          <h2>3. 쿠키 사용</h2>
          <p>사이트는 다음 목적의 쿠키를 사용합니다.</p>
          <ul>
            <li>
              <strong>필수 쿠키</strong> — 테마(라이트/다크) 설정 등 사이트 기능
              유지
            </li>
            <li>
              <strong>분석 쿠키</strong> — 방문자 통계 수집 (Vercel Analytics)
            </li>
            <li>
              <strong>광고 쿠키</strong> — Google AdSense의 광고 개인화
              (DoubleClick 등)
            </li>
          </ul>
          <p>
            브라우저 설정에서 언제든 쿠키를 거부하거나 삭제할 수 있습니다. 다만
            일부 기능이 정상 동작하지 않을 수 있습니다.
          </p>

          <h2>4. Google AdSense 광고</h2>
          <p>
            사이트는 광고를 표시하기 위해 Google AdSense를 사용합니다. Google
            및 그 파트너사는 광고 게재를 위해 쿠키와 웹 비콘을 사용할 수
            있습니다.
          </p>
          <ul>
            <li>
              Google의 광고 사용 정책 ·{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noreferrer"
              >
                policies.google.com/technologies/ads
              </a>
            </li>
            <li>
              개인화 광고 거부 ·{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
              >
                google.com/settings/ads
              </a>
            </li>
          </ul>

          <h2>5. 분석 도구</h2>
          <p>방문자 통계를 위해 다음 도구를 사용할 수 있습니다.</p>
          <ul>
            <li>
              <strong>Vercel Analytics</strong> — 페이지 조회수, 방문 경로 (개인
              식별 정보 미수집)
            </li>
            <li>
              <strong>Google Search Console</strong> — 검색 노출 통계 (집계
              정보만)
            </li>
          </ul>

          <h2>6. 정보 보유 기간</h2>
          <ul>
            <li>자동 수집 로그 — 최대 6개월</li>
            <li>뉴스레터 구독 정보 — 구독 해지 시 즉시 삭제</li>
            <li>쿠키 — 브라우저 설정 또는 자동 만료에 따름</li>
          </ul>

          <h2>7. 사용자의 권리</h2>
          <p>방문자는 언제든 다음 권리를 행사할 수 있습니다.</p>
          <ul>
            <li>본인 정보의 열람·정정·삭제 요청</li>
            <li>뉴스레터 구독 해지 (메일 하단의 unsubscribe 링크 또는 직접 연락)</li>
            <li>광고 개인화 거부 (위 4항 링크 참조)</li>
          </ul>
          <p>요청은 본 방침 마지막의 연락처로 보내주시면 신속히 처리합니다.</p>

          <h2>8. 미성년자 보호</h2>
          <p>
            사이트는 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.
            만 14세 미만 아동이 정보를 제공한 사실이 확인되면 즉시 삭제 조치를
            취합니다.
          </p>

          <h2>9. 데이터 보안</h2>
          <p>
            사이트는 HTTPS 전송, 정기 보안 업데이트, 최소 권한 접근 등 합리적인
            기술적·관리적 보호 조치를 적용합니다. 다만 인터넷 전송에 절대적
            보안은 존재하지 않으므로, 100% 안전을 보장할 수는 없습니다.
          </p>

          <h2>10. 정책 변경</h2>
          <p>
            본 방침은 법령·서비스 변경에 따라 개정될 수 있습니다. 주요 변경 시
            사이트 상단 공지 또는 뉴스레터를 통해 사전 안내합니다. 변경 후
            계속해서 사이트를 이용하면 변경된 방침에 동의한 것으로 간주합니다.
          </p>

          <h2>11. 연락처</h2>
          <p>개인정보 관련 문의나 권리 행사 요청은 아래로 보내주세요.</p>
          <ul>
            <li>
              Email ·{" "}
              <a href="mailto:padawan.joy@gmail.com">padawan.joy@gmail.com</a>
            </li>
            <li>
              About ·{" "}
              <Link href="/about">사이트 소개와 추가 연락 채널</Link>
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
