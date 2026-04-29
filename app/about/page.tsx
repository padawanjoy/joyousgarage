import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Padawan Joy — 코드를 오래 짜온 개발자. 웹 · 데스크톱 · 모바일 · AI 사이를 오갑니다.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="about-page">
        <header className="page-header">
          <div className="section-eyebrow">About</div>
          <h1 className="section-title">
            Padawan <em>Joy</em>.
          </h1>
          <p className="page-lead">
            코드를 오래 짜왔습니다. 만든 것을 글로 남기고 있어요.
          </p>
        </header>

        <article className="about-bio">
          <p>
            안녕하세요, <strong>Padawan Joy</strong> 입니다.
          </p>

          <h2>이름 이야기</h2>
          <p>
            Padawan(파다완)은 스타워즈에서 제다이가 되기 위해 수련하는
            견습생을 가리킵니다. 업계에 들어온 지 곧 20년이 되어가지만, 처음
            이 닉네임을 정할 때 했던 다짐은 지금도 그대로예요.{" "}
            <strong>&ldquo;안주하지 말고, 계속 배우자.&rdquo;</strong>{" "}
            그래서 지금도 견습생을 자처하고 있습니다.
          </p>

          <h2>만들어 온 것들</h2>
          <p>이런저런 환경을 두루 거쳤어요.</p>
          <ul>
            <li>
              <strong>웹</strong> — 프론트엔드 (React, Angular 등), 백엔드
              (Node.js, Spring 등)
            </li>
            <li>
              <strong>데스크톱</strong> — Windows, macOS
            </li>
            <li>
              <strong>모바일 네이티브</strong> — iOS (Objective-C, Swift),
              Android (Java, Kotlin)
            </li>
            <li>
              <strong>모바일 하이브리드</strong> — Ionic, React Native
            </li>
          </ul>
          <p>
            여러 환경과 기술을 거쳐온 시간이 쌓이면서, 경험의 폭만큼 깊이도
            함께 따라왔던 것 같습니다.
          </p>

          <h2>AI와 보낸 시간</h2>
          <p>
            2016년 3월, 이세돌 9단과 알파고의 대국을 본 직후, 머신러닝을
            공부하기 시작했어요. 그 뒤로 거쳐온 것들은 이렇습니다.
          </p>
          <ul>
            <li>머신러닝·딥러닝 기반 서비스 개발</li>
            <li>컴퓨터 비전 모델</li>
            <li>few-shot 음성 합성 솔루션</li>
            <li>LLM 기반 서비스 (지금)</li>
          </ul>

          <h2>이 사이트</h2>
          <p>
            티스토리에서 블로그를 운영했었는데요. 플랫폼에 묶여 있다 보니
            디자인을 바꾸거나 기능을 붙이려 할 때마다 막히는 게 많았고, 결국
            직접 만들어서 다시 시작하기로 했어요. 천천히, 오래 쓸 생각입니다.
          </p>

          <h2>연락</h2>
          <p>피드백, 협업 제안, 에러 신고 모두 환영합니다.</p>
          <ul className="about-contact">
            <li>
              Email ·{" "}
              <a href="mailto:padawan.joy@gmail.com">
                padawan.joy@gmail.com
              </a>
            </li>
            <li>
              GitHub ·{" "}
              <a
                href="https://github.com/padawanjoy"
                target="_blank"
                rel="noreferrer"
              >
                @padawanjoy
              </a>
            </li>
            <li>
              Newsletter ·{" "}
              <Link href="/#newsletter">Builder&apos;s letter</Link>
            </li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
