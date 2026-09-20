"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MIN_VISIBLE_MS = 450;
const FINISH_MS = 280;

const TopLoader = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const startedAt = useRef(0);
  const active = useRef(false);
  const trickleId = useRef<number | null>(null);
  const hideId = useRef<number | null>(null);
  const finishId = useRef<number | null>(null);
  const mountedPath = useRef(true);

  const clearTimers = () => {
    if (trickleId.current) window.clearInterval(trickleId.current);
    if (hideId.current) window.clearTimeout(hideId.current);
    if (finishId.current) window.clearTimeout(finishId.current);
    trickleId.current = null;
    hideId.current = null;
    finishId.current = null;
  };

  const start = () => {
    if (hideId.current) window.clearTimeout(hideId.current);
    if (finishId.current) window.clearTimeout(finishId.current);
    hideId.current = null;
    finishId.current = null;
    startedAt.current = Date.now();
    active.current = true;
    setVisible(true);
    setWidth(38);
    if (trickleId.current) window.clearInterval(trickleId.current);
    trickleId.current = window.setInterval(() => {
      setWidth((current) => (current >= 88 ? current : current + Math.random() * 7 + 2));
    }, 160);
  };

  const complete = () => {
    if (!active.current) return;
    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt.current));
    hideId.current = window.setTimeout(() => {
      if (trickleId.current) window.clearInterval(trickleId.current);
      trickleId.current = null;
      setWidth(100);
      finishId.current = window.setTimeout(() => {
        setVisible(false);
        setWidth(0);
        active.current = false;
      }, FINISH_MS);
    }, wait);
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor?.href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (["tel:", "mailto:", "sms:", "blob:"].includes(url.protocol)) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }
      start();
    };

    document.addEventListener("click", onClick, true);

    const originalPush = history.pushState.bind(history);
    const originalReplace = history.replaceState.bind(history);

    const maybeStartFromHistory = (url?: string | URL | null) => {
      if (typeof url !== "string" && !(url instanceof URL)) return;
      const next = new URL(url.toString(), window.location.href);
      if (next.origin !== window.location.origin) return;
      if (next.pathname === window.location.pathname && next.search === window.location.search) {
        return;
      }
      if (!active.current) start();
    };

    history.pushState = ((data: unknown, unused: string, url?: string | URL | null) => {
      maybeStartFromHistory(url);
      return originalPush(data, unused, url);
    }) as typeof history.pushState;

    history.replaceState = ((data: unknown, unused: string, url?: string | URL | null) => {
      maybeStartFromHistory(url);
      return originalReplace(data, unused, url);
    }) as typeof history.replaceState;

    const onPop = () => start();
    window.addEventListener("popstate", onPop);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      history.pushState = originalPush;
      history.replaceState = originalReplace;
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (mountedPath.current) {
      mountedPath.current = false;
      return;
    }
    complete();
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-[99999] h-1.5 origin-left bg-[#f3e0b8] shadow-[0_0_14px_#f3e0b8,0_0_6px_#c4a574] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: `${width}%`,
          transition: visible
            ? "width 180ms ease-out, opacity 160ms linear"
            : "width 0ms, opacity 200ms linear",
        }}
      />
    </>
  );
};

export default TopLoader;
