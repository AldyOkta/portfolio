import React, { useState, useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import { loadGithubContributions, parseContributionDays } from '../../lib/github';

const contributionLevelClasses = [
  'bg-zinc-200/80 dark:bg-zinc-800',
  'bg-[#9be9a8] dark:bg-[#0e4429]',
  'bg-[#40c463] dark:bg-[#006d32]',
  'bg-[#30a14e] dark:bg-[#26a641]',
  'bg-[#216e39] dark:bg-[#39d353]',
];

const contactCardsStyles = `
@keyframes cc-in {
  from {
    opacity: 0;
    transform: translateX(calc(var(--cc-dir, 1) * 48px)) scale(0.97);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: blur(0);
  }
}
@keyframes cc-out {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: translateX(calc(var(--cc-dir, 1) * -48px)) scale(0.97);
    filter: blur(6px);
  }
}
`;

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.append(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      textarea.remove();
      return success;
    } catch {
      return false;
    }
  }
}

export function CopyEmailButton({ email, labels, className = '' }) {
  const [status, setStatus] = useState('idle');
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  async function handleCopy() {
    const success = await copyToClipboard(email);
    setStatus(success ? 'copied' : 'manual');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus('idle'), success ? 2500 : 6000);
  }

  const copyLabel = labels?.copy ?? 'Salin email';
  const copiedLabel = labels?.copied ?? 'Email disalin!';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copyLabel}
      className={`relative inline-flex cursor-pointer items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition-all hover:bg-[var(--surface-2)] hover:border-[var(--text-muted)] active:scale-95 shadow-sm ${className}`}
    >
      <span className={`transition-all duration-300 ${status === 'idle' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-[2px]'}`}>
        {copyLabel}
      </span>
      <span
        aria-live="polite"
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 font-semibold text-[var(--pass)] ${status === 'idle' ? 'opacity-0 scale-95 blur-[2px] pointer-events-none' : 'opacity-100 scale-100'}`}
      >
        {status === 'manual' ? email : copiedLabel}
      </span>
    </button>
  );
}

function getLevel(count) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 9) return 3;
  return 4;
}

export function ContributionGraph({ days = [], locale = 'id-ID', className = '' }) {
  const [hovered, setHovered] = useState(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);

  const weeks = useMemo(() => {
    if (!days || days.length === 0) return [];
    const result = [];
    const firstDate = new Date(`${days[0].date}T00:00:00Z`);
    let currentWeek = Array.from({ length: firstDate.getUTCDay() });

    for (const day of days) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      result.push([...currentWeek, ...Array.from({ length: 7 - currentWeek.length })]);
    }
    return result;
  }, [days]);

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }),
    [locale]
  );

  const containerWidth = containerRef.current?.clientWidth ?? 0;
  const tooltipWidth = tooltipRef.current?.clientWidth ?? 0;
  const tooltipLeft = hovered
    ? Math.min(Math.max(hovered.left, tooltipWidth / 2 + 4), containerWidth - tooltipWidth / 2 - 4)
    : 0;

  return (
    <div
      ref={containerRef}
      onPointerOver={(e) => {
        const target = e.target;
        const { date, count } = target.dataset;
        if (!date) {
          setHovered(null);
          return;
        }
        setHovered({
          day: { date, count: Number(count) },
          left: target.offsetLeft + target.offsetWidth / 2,
          top: target.offsetTop,
        });
      }}
      onPointerLeave={() => setHovered(null)}
      className={`relative flex w-full flex-col gap-2 ${className}`}
    >
      <div
        className="grid grid-flow-col grid-rows-7 gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
      >
        {weeks.map((week, wIdx) => (
          <React.Fragment key={wIdx}>
            {week.map((item, dIdx) => (
              <div
                key={dIdx}
                data-date={item?.date}
                data-count={item?.count}
                className={`aspect-square w-full rounded-[2px] transition-transform duration-100 hover:scale-125 ${
                  item ? contributionLevelClasses[item.level ?? getLevel(item.count)] : 'bg-transparent'
                }`}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      <div
        ref={tooltipRef}
        style={{ left: tooltipLeft, top: hovered?.top ?? 0 }}
        className={`pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] rounded-lg bg-[var(--text)] px-2.5 py-1 text-xs whitespace-nowrap text-white shadow-xl transition-opacity duration-150 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {hovered
          ? `${hovered.day.count} ${hovered.day.count === 1 ? 'kontribusi' : 'kontribusi'} · ${dateFormatter.format(
              new Date(hovered.day.date)
            )}`
          : ''}
      </div>
    </div>
  );
}

export function GithubCard({
  github,
  locale = 'id-ID',
  contributionsLabel = 'kontribusi setahun terakhir',
  loadingLabel = 'Memuat kontribusi…',
  errorLabel = 'Gagal memuat kontribusi',
}) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (github.days !== undefined) return;
    const controller = new AbortController();
    setResult(null);
    loadGithubContributions(github.username, controller.signal)
      .then((days) => {
        if (!controller.signal.aborted) setResult({ username: github.username, days });
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ username: github.username, error: true });
      });
    return () => controller.abort();
  }, [github.days, github.username]);

  const currentResult = result?.username === github.username ? result : null;
  let days = currentResult?.days;
  let failed = currentResult?.error ?? false;
  if (github.days !== undefined) {
    try {
      days = parseContributionDays(github.days);
      failed = false;
    } catch {
      days = undefined;
      failed = true;
    }
  }
  const totalCount = days?.reduce((acc, day) => acc + day.count, 0);

  return (
    <div className="flex w-[min(23rem,calc(100vw-3rem))] flex-col gap-3 p-4 text-left">
      <div className="flex items-center gap-3">
        {github.avatar ?? (
          <img
            src={`https://github.com/${github.username}.png`}
            alt={github.username}
            className="size-11 shrink-0 rounded-full border border-[var(--border)] object-cover bg-[var(--surface-2)]"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
          />
        )}
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-sm text-[var(--text)]">@{github.username}</span>
          <span role="status" className="text-xs text-[var(--text-muted)] mt-0.5">
            {failed ? errorLabel : days === undefined ? loadingLabel : `${totalCount.toLocaleString(locale)} ${contributionsLabel}`}
          </span>
        </div>
      </div>
      {days !== undefined && <ContributionGraph days={days} locale={locale} />}
    </div>
  );
}

export function GithubIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.4 2.4 4.4 5.6V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.45-2.2 2.99V21h-4V9Z" />
    </svg>
  );
}

export default function ContactCards({
  email,
  github,
  links = [],
  labels,
  locale = 'id-ID',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animDirection, setAnimDirection] = useState(1);
  const [leavingCard, setLeavingCard] = useState(null);
  const [morphCounter, setMorphCounter] = useState(0);
  const [containerPos, setContainerPos] = useState({ left: 0, width: 0, height: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeCardRef = useRef(null);
  const triggerRefs = useRef([]);

  const allCards = useMemo(() => {
    const list = [];
    if (github) {
      list.push({
        label: 'GitHub',
        href: github.url ?? `https://github.com/${github.username}`,
        icon: <GithubIcon />,
        card: (
          <GithubCard
            github={github}
            locale={locale}
            contributionsLabel={labels?.contributions ?? 'kontribusi setahun terakhir'}
            loadingLabel={labels?.loading}
            errorLabel={labels?.error}
          />
        ),
      });
    }
    return [...list, ...links];
  }, [github, links, locale, labels]);

  useLayoutEffect(() => {
    const cardEl = activeCardRef.current;
    const triggerEl = triggerRefs.current[activeIndex];
    if (!isOpen || !cardEl || !triggerEl) return;

    const measure = () => setContainerPos({
      left: triggerEl.offsetLeft + triggerEl.offsetWidth / 2,
      width: cardEl.offsetWidth,
      height: cardEl.offsetHeight,
    });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(cardEl);
    return () => observer.disconnect();
  }, [isOpen, activeIndex, allCards]);

  useEffect(() => {
    if (!leavingCard) return;
    const timer = setTimeout(() => setLeavingCard(null), 380);
    return () => clearTimeout(timer);
  }, [leavingCard]);

  function handleTriggerEnter(index) {
    if (isOpen && index === activeIndex) return;

    if (isOpen) {
      const dir = Math.sign(index - activeIndex) || 1;
      setLeavingCard({
        index: activeIndex,
        direction: dir,
        key: morphCounter,
      });
      setAnimDirection(dir);
    }
    setIsTransitioning(isOpen);
    setActiveIndex(index);
    setMorphCounter((prev) => prev + 1);
    setIsOpen(true);
  }

  function handleContainerLeave() {
    setIsOpen(false);
    setLeavingCard(null);
    setIsTransitioning(false);
  }

  return (
    <div className={`relative inline-flex items-center justify-center gap-2.5 ${className}`}>
      <style>{contactCardsStyles}</style>

      {/* 1. Copy Email in-place button */}
      {email && <CopyEmailButton email={email} labels={labels} />}

      {/* 2. Interactive trigger icons with morphing popover card */}
      <div className="relative flex items-center" onMouseLeave={handleContainerLeave}>
        {allCards.map((item, idx) => (
          <a
            key={item.label}
            ref={(el) => {
              triggerRefs.current[idx] = el;
            }}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            onMouseEnter={() => handleTriggerEnter(idx)}
            onFocus={() => handleTriggerEnter(idx)}
            className="z-10 p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {item.icon}
          </a>
        ))}

        {/* Morphing Popover Card */}
        <div
          aria-hidden={!isOpen}
          style={{
            left: containerPos.left,
            width: containerPos.width || 'auto',
            height: containerPos.height || 'auto',
            contain: 'paint',
          }}
          className={`pointer-events-none absolute bottom-[calc(100%+0.65rem)] flex origin-bottom items-end overflow-hidden rounded-2xl bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] shadow-2xl ${
            isTransitioning
              ? 'transition-[left,width,height,opacity,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]'
              : 'transition-[opacity,transform] duration-200 ease-out'
          } ${
            isOpen
              ? '-translate-x-1/2 scale-100 opacity-100 pointer-events-auto'
              : '-translate-x-1/2 translate-y-2 scale-[0.96] opacity-0 pointer-events-none'
          }`}
        >
          {leavingCard && (
            <div
              key={`out-${leavingCard.key}`}
              style={{
                '--cc-dir': leavingCard.direction,
                animation: 'cc-out 0.35s cubic-bezier(0.32,0.72,0,1) forwards',
              }}
              className="absolute left-0 bottom-0"
            >
              {allCards[leavingCard.index]?.card}
            </div>
          )}

          <div
            ref={activeCardRef}
            key={`in-${morphCounter}`}
            style={{
              '--cc-dir': animDirection,
              animation: isTransitioning
                ? 'cc-in 0.35s cubic-bezier(0.32,0.72,0,1) backwards'
                : undefined,
            }}
            className="relative"
          >
            {allCards[activeIndex]?.card}
          </div>
        </div>

        {/* Bridge area so cursor doesn't close popover when moving between trigger and card */}
        <div className="absolute inset-0 -top-3 pointer-events-auto" />
      </div>
    </div>
  );
}
