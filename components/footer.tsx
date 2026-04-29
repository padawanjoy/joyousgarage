"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

export function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo href="/" size="1.15rem" />
          <p>
            개발자 <strong>Padawan Joy</strong>의 작업실.
            <br />
            코드, 도구, 그 사이의 노트.
          </p>
        </div>
        <div>
          <h5>Browse</h5>
          <ul>
            <li><Link href="/writing">Writing</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/uses">Uses</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h5>Elsewhere</h5>
          <ul>
            <li><a href="https://github.com/padawanjoy" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://www.threads.com/@padawan.joy" target="_blank" rel="noreferrer">Threads</a></li>
            <li><a href="https://x.com/padawanjoy" target="_blank" rel="noreferrer">X</a></li>
            <li><a href="/rss.xml">RSS</a></li>
            <li><a href="#newsletter">Newsletter</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {year} JoyousGarage · All rights reserved. ·{" "}
          <Link href="/privacy">Privacy</Link>
        </span>
        <span>Built with craft</span>
      </div>
    </footer>
  );
}
