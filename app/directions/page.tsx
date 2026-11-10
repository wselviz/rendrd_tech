"use client";
import { useEffect, useRef, useState } from "react";
import Link from "../link";
import "./directions.css";

const directions = [
  { name: "Into focus", line: "A sculptural identity, finding its form.", description: "Oversized letters float at different depths. A slow camera drift and soft focus make them feel suspended; scrolling draws them into a crisp RENDRD wordmark.", value: "The clearest evolution of the PDF identity. Expressive, restrained, and unmistakably RENDRD." },
  { name: "Proof in motion", line: "Your work becomes the opening statement.", description: "Campaign films sit on a curved wall in 3D space. As you scroll, the gallery rotates toward you and one project fills the frame, leading directly into the client story.", value: "Recommended: puts recognizable work beside the enterprise message, so visitors see evidence immediately." },
  { name: "Built to deliver", line: "Strategy becomes something you can use.", description: "Three architectural forms hover in an exploded arrangement. Scrolling brings them together into a connected sequence: strategy, a working use case, and a launch.", value: "The strongest consulting story. The motion explains how your thinking becomes a tangible business outcome." },
];
const gallery = [
  { image: "/media/adobe.webp", name: "Adobe" },
  { image: "/media/raptors.webp", name: "Toronto Raptors" },
  { image: "/media/nba/montreal.webp", name: "NBA × Microsoft" },
  { image: "/media/nike.webp", name: "Nike" },
  { image: "/media/artechouse.webp", name: "ARTECHOUSE" },
];
const stages = [
  { title: "Strategy", outcome: "Choose the right opportunities." },
  { title: "Build", outcome: "Prove a useful application." },
  { title: "Launch", outcome: "Bring the value to customers." },
];
const smooth = (n: number) => n * n * (3 - 2 * n);

function MotionStudy({ choice, manual, playing, automatic }: { choice: number; manual: number; playing: boolean; automatic: boolean }) {
  const area = useRef<HTMLDivElement>(null);
  const settings = useRef({ manual, playing, automatic });
  settings.current = { manual, playing, automatic };
  useEffect(() => {
    const root = area.current!;
    const camera = root.querySelector<HTMLElement>(".direction-camera")!;
    const objects = [...root.querySelectorAll<HTMLElement>("[data-object]")];
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, last = 0, elapsed = 0, visible = true;
    let pointer = 0, pointerTarget = 0;
    const resize = () => root.style.setProperty("--study-scale", String(Math.min(1, root.clientWidth / 750)));
    const draw = (now: number) => {
      const dt = last ? Math.min(40, now - last) : 0; last = now;
      const current = settings.current;
      if (current.playing && !query.matches && visible && !document.hidden) elapsed += dt;
      pointer += (pointerTarget - pointer) * .04;
      const cycle = (elapsed % 15000) / 15000;
      const demo = cycle < .18 ? 0 : cycle < .58 ? smooth((cycle - .18) / .4) : cycle < .8 ? 1 : 1 - smooth((cycle - .8) / .2);
      const p = query.matches ? current.manual : current.automatic ? demo : current.manual;
      const t = elapsed / 1000;
      const idle = query.matches ? 0 : 1;
      root.dataset.progress = p.toFixed(3);
      root.style.setProperty("--study-progress", String(p));
      camera.style.transform = `scale(var(--study-scale)) rotateX(${choice === 2 ? -9 : -3}deg) rotateY(${pointer * 7}deg)`;
      objects.forEach((node, i) => {
        if (choice === 0) {
          const angle = i / 11 * Math.PI * 2 - 1.8;
          const x0 = Math.cos(angle) * 280, y0 = Math.sin(angle) * 160;
          const x1 = i < 6 ? (i - 2.5) * 72 : (i - 8) * 56;
          const y1 = i < 6 ? -30 : 72;
          const float = Math.sin(t * .6 + i) * 10 * (1 - p) * idle;
          const z = (Math.sin(angle * 2) * 180 + Math.sin(t * .45 + i) * 25 * idle) * (1 - p);
          node.style.transform = `translate3d(${x0 + (x1 - x0) * p}px,${y0 + (y1 - y0) * p + float}px,${z}px) rotateY(${(Math.cos(angle) * 36 + Math.sin(t * .5 + i) * 7 * idle) * (1 - p)}deg) rotateX(${Math.sin(angle) * 20 * (1 - p)}deg)`;
          node.style.filter = `blur(${Math.abs(z) / 75 * (1 - p)}px)`;
        } else if (choice === 1) {
          const angle = (i - 2) * .52;
          const x = Math.sin(angle) * (480 + p * 220);
          const z = (Math.cos(angle) - 1) * 390 + (i === 2 ? p * 155 : -p * 130);
          const y = Math.cos(t * .5 + i) * 9 * idle * (1 - p);
          node.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateY(${-angle * 180 / Math.PI * (1 - p * .5)}deg)`;
          node.style.opacity = String(i === 2 ? 1 : 1 - p * .7);
          node.style.filter = `blur(${i === 2 ? 0 : p * 2}px)`;
        } else {
          const x0 = [-205, 0, 220][i], y0 = [-60, 50, -35][i], z0 = [-70, 80, -30][i];
          const y = y0 * (1 - p) + Math.sin(t * .7 + i * 2) * 12 * (1 - p) * idle;
          node.style.transform = `translate3d(${x0 + ((i - 1) * 205 - x0) * p}px,${y}px,${z0 * (1 - p)}px) rotateX(${[18, -12, 22][i] * (1 - p)}deg) rotateY(${[-30, 30, -22][i] * (1 - p) - 12 * p}deg) rotateZ(${[8, -7, 5][i] * (1 - p)}deg)`;
        }
      });
      frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(resize); observer.observe(root); resize();
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); visibility.observe(root);
    const move = (event: PointerEvent) => { pointerTarget = (event.clientX - root.getBoundingClientRect().left) / root.clientWidth * 2 - 1; };
    const leave = () => { pointerTarget = 0; };
    root.addEventListener("pointermove", move); root.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", leave); };
  }, [choice]);
  return <div className={`direction-stage direction-stage-${choice}`} ref={area} role="img" aria-label={directions[choice].name + " motion preview"}>
    <div className="direction-floor" aria-hidden="true" />
    <div className="direction-camera" aria-hidden="true">
      {choice === 0 && "RENDRDMEDIA".split("").map((letter, i) => <div data-object className={`direction-glyph direction-glyph-${i}`} key={i}>{letter}</div>)}
      {choice === 1 && gallery.map((project, i) => <div data-object className="direction-film" key={project.name}><img src={project.image} alt="" />{i === 2 && playing && <video src="/media/nba/montreal.mp4" muted autoPlay playsInline loop preload="none" />}<span>{project.name}</span></div>)}
      {choice === 2 && stages.map((stage, i) => <div data-object className="direction-block" key={stage.title}><div className="block-front"><span>0{i + 1}</span><strong>{stage.title}</strong><p>{stage.outcome}</p></div><div className="block-back"/><div className="block-side block-right"/><div className="block-side block-left"/><div className="block-top"/><div className="block-bottom"/></div>)}
    </div>
    <div className="direction-progress" aria-hidden="true"><span /></div>
  </div>;
}

export default function DirectionsPage() {
  const [choice, setChoice] = useState(0), [manual, setManual] = useState(0), [playing, setPlaying] = useState(true), [automatic, setAutomatic] = useState(true);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { if (query.matches) { setPlaying(false); setAutomatic(false); setManual(1); } };
    update(); query.addEventListener("change", update); return () => query.removeEventListener("change", update);
  }, []);
  return <main id="main" className="directions-page">
    <header className="directions-header"><Link href="/" className="wordmark">RENDRD <span>MEDIA</span></Link><Link href="/" className="text-link">Back to the website ↗</Link></header>
    <div className="directions-intro"><p>Hero direction review</p><h1>Three ways to make<br/>the first impression.</h1><p>Choose the motion language. The business message stays clear in every direction.</p></div>
    <div className="directions-tabs" role="tablist" aria-label="Motion concepts">{directions.map((direction, i) => <button role="tab" id={`direction-tab-${i}`} tabIndex={choice === i ? 0 : -1} aria-controls="direction-panel" aria-selected={choice === i} key={direction.name} onKeyDown={event => { const next = event.key === "ArrowRight" ? (i + 1) % 3 : event.key === "ArrowLeft" ? (i + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : -1; if (next < 0) return; event.preventDefault(); setChoice(next); setManual(0); setAutomatic(playing); document.getElementById(`direction-tab-${next}`)?.focus(); }} onClick={() => { setChoice(i); setManual(0); setAutomatic(playing); }}><span>0{i + 1}</span>{direction.name}</button>)}</div>
    <section id="direction-panel" role="tabpanel" aria-labelledby={`direction-tab-${choice}`}>
      <div className="direction-preview"><div className="direction-message"><p>Strategy &amp; creative technology</p><h2>Technology your team<br/><em>can put to work.</em></h2><p>RENDRD helps marketing and sales teams choose the right technology, build useful tools, and create campaigns that connect with customers.</p><span className="direction-message-cta">Discuss your priorities ↗</span></div><MotionStudy key={choice} choice={choice} manual={manual} playing={playing} automatic={automatic} /></div>
      <div className="direction-controls"><button className="pill" aria-pressed={!playing} onClick={() => setPlaying(p => !p)}>{playing ? "Pause preview" : "Play preview"}</button><button className="text-link" aria-pressed={automatic} onClick={() => { setAutomatic(a => !a); setPlaying(true); }}>{automatic ? "Auto sequence on" : "Replay auto sequence"}</button><label htmlFor="motion-progress">Scroll preview<input id="motion-progress" type="range" min="0" max="100" value={Math.round(manual * 100)} onChange={e => { setAutomatic(false); setManual(Number(e.target.value) / 100); }} /></label><button className="text-link" onClick={() => { setAutomatic(false); setManual(1); }}>Show resolved state ↗</button></div>
      <div className="direction-description"><h2>{directions[choice].line}</h2><div><p>{directions[choice].description}</p><p>{directions[choice].value}</p></div></div>
    </section>
    <p className="directions-note">These are working motion studies. Choose 1, 2, or 3 in the chat and I’ll develop that direction for the landing page.</p>
  </main>;
}
