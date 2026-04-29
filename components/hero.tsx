import { HeroHexBg } from "./hero-hexbg";
import { HeroBall } from "./hero-ball";

export function Hero() {
  return (
    <section className="hero" aria-label="Intro">
      <HeroHexBg />
      <div className="hero-content">
        <h1 className="hero-mark">
          <span className="line">Joyous</span>
          <span className="line">Garage</span>
          <HeroBall />
        </h1>
        <p className="hero-tagline">{"// 개발자의 작업 노트"}</p>
      </div>
      <div className="hero-scroll-cue" aria-hidden>
        <span className="pill" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
