"use client";
import { useEffect, useRef, useState } from "react";
import Link from "./link";
import { site, services } from "./data";
import { Arrow, PlusIcon } from "./icons";

export { Arrow };
export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  return <header className="header">
    <Link className="wordmark" href="/">RENDRD <span>MEDIA</span></Link>
    <nav aria-label="Main navigation" className="desktop-nav">
      <Link href="/#work">Selected work</Link><Link href="/#capabilities">Capabilities</Link><Link href="/#about">About</Link>
    </nav>
    <Link className="pill header-cta" href="/#contact">Let's talk <Arrow /></Link>
    <button className="menu-button" onClick={() => { menu.current?.showModal(); setOpen(true); }} aria-expanded={open} aria-controls="mobile-menu">Menu <PlusIcon /></button>
    <dialog id="mobile-menu" className="mobile-menu" ref={menu} onClose={() => setOpen(false)}>
      <div><span className="wordmark">RENDRD</span><button className="pill" onClick={() => menu.current?.close()}>Close <PlusIcon close /></button></div>
      <nav aria-label="Mobile navigation">{[["Selected work","work"],["Capabilities","capabilities"],["About","about"],["Let's talk","contact"]].map(([label,id]) => <Link key={id} href={"/#" + id} onClick={() => menu.current?.close()}>{label}<Arrow /></Link>)}</nav>
    </dialog>
  </header>;
}

export function LoopVideo({ src, poster, className = "", label = "Project preview" }: { src: string; poster: string; className?: string; label?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setEnabled(!query.matches); if(query.matches) video.current?.pause(); };
    update(); query.addEventListener("change",update);
    return () => query.removeEventListener("change",update);
  }, []);
  useEffect(() => {
    if (!video.current || !enabled) return;
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting && !paused) video.current?.play().catch(() => {});
      else video.current?.pause();
    }, {threshold: 0.1});
    observer.observe(video.current); return () => observer.disconnect();
  }, [enabled,paused]);
  return <div className={"loop " + className}>
    <img src={poster} alt="" aria-hidden="true" width="1600" height="1000" />
    {enabled && <video ref={video} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />}
    <button className="play-toggle" aria-label={paused || !enabled ? "Play motion: " + label : "Pause motion: " + label} onClick={() => {
      if(!enabled) {setEnabled(true); setPaused(false);}
      else {setPaused(!paused); if(!paused)video.current?.pause(); else video.current?.play().catch(() => {});}
    }}><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">{paused || !enabled ? <path d="M4 2 14 8 4 14Z" fill="currentColor"/> : <><path d="M3 2h3v12H3zM10 2h3v12h-3z" fill="currentColor"/></>}</svg></button>
  </div>;
}

export function Footer({ initialService }: { initialService?: string }) {
  const [service, setService] = useState(services[0].title);
  const [brief, setBrief] = useState("");
  useEffect(() => { if(initialService) setService(initialService); },[initialService]);
  return <footer id="contact" className="footer">
    <h2>Tell us what<br /><span>you need to solve.</span></h2>
    <div className="contact-grid">
      <div><a className="email-link" href={"mailto:" + site.email}>{site.email}<Arrow /></a><p>Technology strategy, practical use cases,<br />and work that reaches customers.</p></div>
      <form onSubmit={(event) => {event.preventDefault(); window.location.href = "mailto:" + site.email + "?subject=" + encodeURIComponent("RENDRD enquiry: " + service) + "&body=" + encodeURIComponent("Hi Will,\n\nI'm interested in " + service.toLowerCase() + ".\n\n" + brief + "\n\n");}}>
        <label htmlFor="interest">How can we help?</label>
        <select id="interest" value={service} onChange={e => setService(e.target.value)}>
          {services.map(s => <option key={s.title}>{s.title}</option>)}
        </select>
        <label htmlFor="brief">What are you working on?</label>
        <textarea id="brief" placeholder="Your business question, your team, your timeline…" value={brief} onChange={e => setBrief(e.target.value)} rows={2} required />
        <div className="form-bottom"><span>Opens a draft in your email app.</span><button className="pill" type="submit">Start a conversation <Arrow /></button></div>
      </form>
    </div>
    <div className="footer-bottom"><Link className="wordmark" href="/">RENDRD<span>MEDIA</span></Link><span>© {new Date().getFullYear()} RENDRD Media</span><a href="#main">Back to top <Arrow direction="up" /></a></div>
  </footer>;
}
