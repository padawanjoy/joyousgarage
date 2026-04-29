"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Fuse, { type FuseResult } from "fuse.js";
import { formatPostDate, type SearchIndexEntry } from "@/lib/post-utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndexEntry[] | null>(null);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open || index) return;
    fetch("/api/search-index")
      .then((r) => r.json())
      .then((data) => setIndex(data as SearchIndexEntry[]))
      .catch(() => setIndex([]));
  }, [open, index]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
    setQuery("");
    setActive(0);
  }, [open]);

  const results = useMemo<SearchIndexEntry[]>(() => {
    if (!index) return [];
    if (!query.trim()) return index.slice(0, 8);
    const fuse = new Fuse(index, {
      keys: [
        { name: "title", weight: 2 },
        { name: "description", weight: 1 },
        { name: "tags", weight: 1.5 },
        { name: "category", weight: 0.5 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
    });
    return fuse.search(query).slice(0, 12).map((r: FuseResult<SearchIndexEntry>) => r.item);
  }, [query, index]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[active]) {
        e.preventDefault();
        window.location.href = `/writing/${results[active].slug}`;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, active, onClose]);

  if (!open) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div
        className="search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-input-row">
          <svg
            className="search-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="제목, 설명, 태그로 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="search-kbd">esc</kbd>
        </div>

        <div className="search-results">
          {!index ? (
            <div className="search-msg">불러오는 중...</div>
          ) : results.length === 0 ? (
            <div className="search-msg">
              {query ? "검색 결과 없음" : "아직 글이 없습니다"}
            </div>
          ) : (
            <ul className="search-list">
              {!query && (
                <li className="search-section-label">최근 글</li>
              )}
              {results.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className={`search-item ${i === active ? "active" : ""}`}
                    onClick={onClose}
                    onMouseEnter={() => setActive(i)}
                  >
                    <div className="search-item-meta">
                      <span className="search-item-cat">{post.category}</span>
                      <span className="search-item-date">{formatPostDate(post.date)}</span>
                    </div>
                    <div className="search-item-title">{post.title}</div>
                    <div className="search-item-desc">{post.description}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> 이동</span>
          <span><kbd>↵</kbd> 열기</span>
          <span><kbd>esc</kbd> 닫기</span>
        </div>
      </div>
    </div>
  );
}
