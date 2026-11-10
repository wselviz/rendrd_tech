import Link from "./link";
import { Header, Footer, Arrow } from "./components";
import { BrandMark } from "./client-logos";
import { NBAFilmPlayer, type NBAFilm } from "./nba-film";

function Film({ id, title, detail, duration, aspect = "4 / 5", featured = false }: { id: string; title: string; detail: string; duration: string; aspect?: string; featured?: boolean }) {
  const film: NBAFilm = { id, title, detail, duration, aspect, namespace: "nike" };
  return <NBAFilmPlayer film={film} featured={featured} />;
}

const archive = [
  { id: "ofsaa-ar", title: "OFSAA / Nike XC", detail: "AR field test", duration: "0:10", aspect: "1232 / 656", text: "Instagram and Snapchat AR experiences brought the campaign into the hands of young runners, supported by motion graphics and a GIPHY sticker system.", tags: "AR development · Motion design" },
  { id: "dubai", title: "Cactus Jack × Fragment", detail: "Dubai / Regional launch", duration: "0:12", aspect: "9 / 16", text: "3D launch content for the Travis Scott, Cactus Jack, and Fragment release, adapted for branded and unbranded placements.", tags: "3D animation · Social delivery" },
  { id: "kuwait", title: "Air Max Day Kuwait", detail: "Campaign film", duration: "0:38", aspect: "16 / 9", text: "A product world built in motion, with a finished campaign film and a conveyor sequence designed for multiple placements.", tags: "3D animation · Motion systems" },
  { id: "rayguns", title: "Roswell Rayguns", detail: "Social campaign", duration: "0:27", aspect: "4 / 5", text: "An animated campaign expanded into social formats, looping films, and a branded GIPHY sticker pack.", tags: "3D animation · Campaign toolkit" },
  { id: "canada-soccer", title: "Canada Soccer", detail: "Jersey launch", duration: "0:20", aspect: "4 / 5", text: "The first Nike chapter: a CGI launch film celebrating the jersey, Swoosh, maple leaf, and Canada identity, with stills and loops for social.", tags: "Creative direction · CGI production" },
];

export default function NikeCase() {
  return <><Header /><main id="main" tabIndex={-1} className="case-page nike-case">
    <section className="nike-head section">
      <Link href="/#work" className="text-link">← Selected work</Link>
      <div className="nike-heading-brand"><BrandMark id="nike" name="Nike" /><p>Campaigns, creative technology &amp; brand experiences</p></div>
      <h1 className="case-title">From the feed.<br />To the street.</h1>
      <div className="nike-lead"><p>Product stories that move through culture. RENDRD brings Nike campaigns to life through 3D films, digital billboards, retail experiences, and interactive technology.</p><a className="text-link" href="#nike-billboard">See the work in place <Arrow /></a></div>
      <dl className="nike-metrics">
        {/* Views supplied by Will on 2026-11-09, across Nike ads; not attributed to one project. */}
        <div><dt>2M+</dt><dd>Views across Nike ads</dd></div>
        <div><dt>6+ years</dt><dd>Delivering work for Nike</dd></div>
        <div><dt>9 campaigns</dt><dd>From local launches to global stories</dd></div>
      </dl>
    </section>

    <section id="nike-billboard" className="nike-billboard section" aria-labelledby="nike-street-title">
      <div className="nike-section-head"><p>Toronto / Air Max 95</p><div><h2 id="nike-street-title">An idea with<br />a real-world presence.</h2><p>The Air Max 95 leaves the frame. CGI direction, visual effects, and a shared production pipeline carry the same product story from a Toronto billboard to social films and augmented reality.</p></div></div>
      <div className="nike-billboard-pair">
        <Film id="billboard-street" title="On the street" detail="Toronto / Installed billboard footage" duration="0:30" aspect="9 / 16" featured />
        <div className="nike-master"><Film id="billboard-animation" title="The animation" detail="Air Max 95 / Digital billboard creative" duration="0:30" aspect="1280 / 1006" /><p className="nike-media-note">The finished creative, shown alongside its real billboard placement.</p></div>
      </div>
      <div className="nike-deliverables"><span>Creative direction</span><span>CGI &amp; VFX</span><span>Digital out-of-home</span><span>Social &amp; AR</span></div>
      <div className="nike-subhead"><h3>The city becomes part of the story.</h3><p>Two campaign films combine familiar Toronto locations with larger-than-life product animation.</p></div>
      <div className="nike-two-films nike-fooh"><Film id="kensington" title="Kensington Market" detail="CGI campaign film" duration="0:14" /><Film id="ago" title="Art Gallery of Ontario" detail="CGI campaign film" duration="0:16" /></div>
    </section>

    <section className="nike-retail section" aria-labelledby="nike-retail-title">
      <div className="nike-section-head"><p>Retail &amp; culture</p><div><h2 id="nike-retail-title">Give the launch<br />a world of its own.</h2><p>A campaign needs more than a hero asset. These projects extend the idea across the places and formats where people meet the brand.</p></div></div>
      <div className="nike-feature-grid">
        <article><Film id="nike-by-you" title="Toronto Eaton Centre" detail="Nike By You / Store-opening activation" duration="0:43" aspect="9 / 16" /><p>A fast-turnaround visual system spanning pre-launch CGI, social reels, installation content, and Nike By You assets.</p><details className="nike-extra"><summary>Watch Nike Playground <span aria-hidden="true">+</span></summary><Film id="playground" title="Nike Playground" detail="Toronto Eaton Centre / Activation film" duration="0:27" aspect="9 / 16" /></details></article>
        <article><Film id="bata" title="Air Max 95 × Bata Shoe Museum" detail="Museum campaign" duration="0:44" aspect="9 / 16" /><p>A cinematic CGI and social package celebrating the Air Max 95’s induction into the Bata Shoe Museum, with a main film, teasers, and portrait imagery.</p></article>
      </div>
    </section>

    <section className="nike-worldwide section" aria-labelledby="nike-global-title">
      <div className="nike-section-head"><p>Air Max Day Worldwide</p><div><h2 id="nike-global-title">A creative voice<br />on a global stage.</h2><p>Nike selected Will to represent Canada in “Bring the Future to Light.” The collaboration connected his featured artist story with 3D animation, a live broadcast, and a locally curated panel.</p></div></div>
      <div className="nike-global-grid"><figure><img src="/media/nike/will-billboard.webp" alt="Will Selviz beside his Nike Bring the Future to Light campaign display" width="900" height="1200" loading="lazy" /><figcaption>Will Selviz / Nike featured artist</figcaption></figure><Film id="global-air-max" title="Bring the Future to Light" detail="Global campaign / Featured artist recap" duration="0:15" aspect="1" /></div>
      <div className="nike-deliverables"><span>Featured artist</span><span>3D animation</span><span>Live production</span><span>Panel curation</span></div>
    </section>

    <section className="nike-archive section" aria-labelledby="nike-archive-title">
      <div className="nike-section-head"><p>More Nike collaborations</p><div><h2 id="nike-archive-title">Different audiences.<br />The same attention to craft.</h2><p>Product launches, social worlds, and interactive experiences. Explore the films and the role behind each project.</p></div></div>
      <div className="nike-archive-list">{archive.map((project, i) => <details key={project.id} className="nike-archive-item"><summary><span className="nike-project-number">0{i + 5}</span><h3>{project.title}</h3><span className="nike-project-tags">{project.tags}</span><span className="nike-expand" aria-hidden="true">+</span></summary><div className="nike-archive-content"><div><p>{project.text}</p><p className="nike-archive-role">{project.tags}</p></div><Film {...project} /></div></details>)}</div>
    </section>

    <section className="nike-takeaway section"><p>What this brings to your team</p><h2>A strong idea.<br />A system to get it out into the world.</h2><div><p>From creative direction to final delivery, RENDRD connects the brand story with the right technology and formats. Bring us a product, a launch, or an emerging capability. We’ll help turn it into something your audience can see, understand, and engage with.</p><Link href="/#contact" className="pill pill-dark">Discuss your campaign <Arrow /></Link></div></section>
    <section className="case-next section"><p>Next project</p><Link href="/work/protopica-artechouse"><h2>Protopica × ARTECHOUSE</h2><Arrow /></Link></section>
  </main><Footer /></>;
}
