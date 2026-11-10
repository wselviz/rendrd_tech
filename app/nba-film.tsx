"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow, PlayIcon, PauseIcon } from "./icons";

export type NBAFilm = {
  id: string;
  title: string;
  detail: string;
  duration: string;
  wide?: boolean;
  namespace?: "nba" | "nike" | "raptors" | "artechouse" | "neurogenesis";
  aspect?: string;
};

export function NBAFilmPlayer({ film, featured = false }: { film: NBAFilm; featured?: boolean }) {
  const Heading = featured ? "h2" : "h3";
  const video = useRef<HTMLVideoElement>(null);
  const resumeAt = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = `/media/${film.namespace || "nba"}/${film.id}.mp4`;

  const start = useCallback(() => {
    const player = video.current;
    if (!player) return;
    // Release the previous connection before starting a new request.
    document.dispatchEvent(new CustomEvent("rendrd:film-start", { detail: player }));
    if (!player.getAttribute("src")) player.src = src;
    void player.play().catch(() => { if (player.error) setFailed(true); });
  }, [src]);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    // A visitor can explore the collection without competing soundtracks.
    const solo = (event: Event) => {
      if ((event as CustomEvent).detail === player || !player.getAttribute("src")) return;
      resumeAt.current = player.ended ? 0 : player.currentTime;
      player.pause();
      player.removeAttribute("src");
      player.load();
      setStarted(false);
      setPlaying(false);
    };
    const hidden = () => { if (document.hidden) player.pause(); };
    document.addEventListener("rendrd:film-start", solo);
    document.addEventListener("visibilitychange", hidden);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let attempted = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { player.pause(); return; }
      if (!featured || attempted) return;
      attempted = true;
      if (reduced.matches || connection?.saveData) return;
      if ([...document.querySelectorAll("video")].some(other => other !== player && !other.paused)) return;
      player.muted = true;
      start();
    }, { threshold: 0.2 });
    observer.observe(player);
    const motionChanged = () => { if (reduced.matches) player.pause(); };
    reduced.addEventListener("change", motionChanged);
    return () => {
      observer.disconnect();
      document.removeEventListener("rendrd:film-start", solo);
      document.removeEventListener("visibilitychange", hidden);
      reduced.removeEventListener("change", motionChanged);
      player.pause();
      // Release Safari's media connection when leaving the project, as well as when switching films.
      player.removeAttribute("src");
      player.load();
    };
  }, [featured, start]);

  const toggle = () => {
    const player = video.current;
    if (!player) return;
    if (!player.paused) player.pause();
    else start();
  };

  return <figure className={`nba-film${featured ? " nba-film-featured" : ""}${film.wide ? " nba-film-wide" : ""}`}>
    <div className="nba-film-screen" style={film.aspect ? { aspectRatio: film.aspect } : undefined}>
      <video ref={video} poster={`/media/${film.namespace || "nba"}/${film.id}.webp`}
        controls={started} playsInline preload="none" muted={featured} loop={featured}
        aria-label={film.title + " — project film"}
        onPlay={() => { setPlaying(true); setStarted(true); }} onPause={() => setPlaying(false)}
        onLoadedMetadata={() => { if (video.current && resumeAt.current > 0) video.current.currentTime = resumeAt.current; }}
        onEnded={() => setPlaying(false)} onError={() => { if (video.current?.getAttribute("src")) setFailed(true); }} />
      {!started && !failed && <button type="button" className="nba-film-play" onClick={toggle} aria-label={`Play ${film.title}`}><PlayIcon /></button>}
    </div>
    <figcaption>
      <div><Heading>{film.title}</Heading><p>{film.detail} <span aria-hidden="true">/</span> {film.duration}</p></div>
      {failed ? <a className="nba-film-toggle" href={src}>Open film <Arrow /></a> : <button type="button" className="nba-film-toggle" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} film: ${film.title}`}>{playing ? "Pause" : "Play"}{playing ? <PauseIcon /> : <PlayIcon />}</button>}
    </figcaption>
  </figure>;
}

const montrealFilm: NBAFilm = { id: "montreal", title: "Maison NBA — Montréal", detail: "Event visuals", duration: "0:17", wide: true };

export function NBAFeaturedFilm() {
  return <NBAFilmPlayer film={montrealFilm} featured />;
}

const campaignFilms: NBAFilm[] = [
  { id: "asset8", title: "The game, in gold.", detail: "NBA Canada / 3D campaign film", duration: "0:32", wide: true },
  { id: "anniversary", title: "75 years of the game.", detail: "NBA 75th anniversary / Event visuals", duration: "0:30" },
  { id: "surface", title: "A new dimension of play.", detail: "NBA × Microsoft / Campaign animation", duration: "0:24" },
  { id: "microsoft", title: "Team spirit, in motion.", detail: "NBA × Microsoft / Campaign animation", duration: "0:26" },
  { id: "playoffs", title: "The energy of the game.", detail: "NBA Canada / Team identities", duration: "0:28" },
  { id: "draft", title: "The next chapter.", detail: "NBA Draft Lottery / Campaign animation", duration: "0:24" },
  { id: "payton", title: "Gary Payton / Seattle.", detail: "NBA Canada / Player tribute", duration: "0:21" },
];

const copilotFilms: NBAFilm[] = [
  { id: "uswt", title: "USA Basketball / Women’s team", detail: "Microsoft Copilot / Hero animation", duration: "0:15" },
  { id: "usmt", title: "USA Basketball / Men’s team", detail: "Microsoft Copilot / Hero animation", duration: "0:15" },
];

export function NBAFilmCollection() {
  return <>
    <section className="nba-collection section" aria-labelledby="nba-campaigns-heading">
      <div className="nba-collection-heading"><p className="section-label">01 / NBA CANADA</p><div><h2 id="nba-campaigns-heading">Make the game<br />impossible to ignore.</h2><p>Campaign films and event visuals that turn the teams, players, and culture of basketball into worlds of their own.</p></div></div>
      <div className="nba-film-grid">{campaignFilms.map(film => <NBAFilmPlayer key={film.id} film={film} />)}</div>
    </section>
    <section className="nba-collection nba-copilot section" aria-labelledby="nba-copilot-heading">
      <div className="nba-collection-heading"><p className="section-label">02 / MICROSOFT COPILOT × USA BASKETBALL</p><div><h2 id="nba-copilot-heading">A team. A new perspective.</h2><p>Creative exploration takes a finished form. Hero animations from the USA Basketball project bring a tangible result to the conversation around new tools.</p></div></div>
      <div className="nba-copilot-grid">{copilotFilms.map(film => <NBAFilmPlayer key={film.id} film={film} />)}</div>
    </section>
  </>;
}
