"use client";
import { useEffect } from "react";

export default function ScrollFocus() {
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...document.querySelectorAll<HTMLElement>("[data-focus-reveal]")];
    const cleared = new Set<HTMLElement>();
    let frame = 0;
    const draw = () => {
      frame = 0;
      for (const section of sections) {
        if (cleared.has(section)) continue;
        const progress = query.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * 1.06 - section.getBoundingClientRect().top) / (innerHeight * .3)));
        const remaining = 1 - progress;
        section.style.setProperty("--focus-blur", (remaining * 3.5).toFixed(2) + "px");
        section.style.setProperty("--focus-offset", (remaining * 12).toFixed(2) + "px");
        section.classList.toggle("is-awaiting-focus", progress < 1);
        if (progress === 1) cleared.add(section);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const focus = (event: FocusEvent) => {
      const section = (event.target as HTMLElement)?.closest<HTMLElement>("[data-focus-reveal]");
      if (section) { cleared.add(section); section.classList.remove("is-awaiting-focus"); }
    };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    query.addEventListener("change", schedule);
    document.addEventListener("focusin", focus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      query.removeEventListener("change", schedule);
      document.removeEventListener("focusin", focus);
      sections.forEach(section => section.classList.remove("is-awaiting-focus"));
    };
  }, []);
  return null;
}
