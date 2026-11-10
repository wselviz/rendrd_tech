import type { ReactNode } from "react";
import Link from "./link";
import { Header, Footer, Arrow } from "./components";
import { NBAFilmPlayer, type NBAFilm } from "./nba-film";

function Film({ namespace, id, title, detail, duration, aspect = "16 / 9" }: NBAFilm & { namespace: NonNullable<NBAFilm["namespace"]> }) {
  return <NBAFilmPlayer film={{ namespace, id, title, detail, duration, aspect }} />;
}
function Figure({ src, alt, caption, width = 1920, height = 1080 }: { src: string; alt: string; caption: string; width?: number; height?: number }) {
  return <figure className="case-evidence"><img src={src} alt={alt} width={width} height={height} loading="lazy" /><figcaption>{caption}</figcaption></figure>;
}
function Chapter({ label, title, text, children, className = "" }: { label: string; title: ReactNode; text: string; children: ReactNode; className?: string }) {
  return <section className={`case-chapter section ${className}`}><div className="case-chapter-heading"><p>{label}</p><div><h2>{title}</h2><p>{text}</p></div></div>{children}</section>;
}
function Outcome({ title, text, action }: { title: ReactNode; text: string; action: string }) {
  return <section className="case-outcome section"><p>What this brings to your team</p><h2>{title}</h2><div><p>{text}</p><Link className="pill" href="/#contact">{action}<Arrow /></Link></div></section>;
}
function Shell({ client, title, lead, facts, image, imageAlt, imageWidth, imageHeight, next, children, className = "" }: {
  client: string; title: ReactNode; lead: string; facts: [string, string][]; image: string; imageAlt: string; imageWidth: number; imageHeight: number;
  next: [string, string]; children: ReactNode; className?: string;
}) {
  return <><Header /><main id="main" tabIndex={-1} className={`case-page story-case ${className}`}>
    <section className="case-opening section"><Link href="/#work" className="text-link"><Arrow direction="left" />Selected work</Link>
      <div className="case-opening-grid"><div className="case-opening-copy"><p className="case-client">{client}</p><h1 className="case-title">{title}</h1><p className="case-lead">{lead}</p><dl className="case-facts">{facts.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="text-link" href="#project-story">Explore the project<Arrow /></a></div>
        <div className="case-opening-image"><picture><source media="(max-width: 760px)" srcSet={image.replace("hero.webp","hero-mobile.webp")} /><img src={image} alt={imageAlt} width={imageWidth} height={imageHeight} fetchPriority="high" decoding="async" /></picture></div>
      </div>
    </section>
    <div id="project-story">{children}</div>
    <section className="case-next section"><p>Next project</p><Link href={`/work/${next[0]}`}><h2>{next[1]}</h2><Arrow /></Link></section>
  </main><Footer /></>;
}

export function RaptorsCase() {
  return <Shell className="raptors-case" client="MLSE / Toronto Raptors / Bell" title={<>Vince Carter.<br />Larger than life.</>} lead="A defining basketball moment, reimagined for the people who love the game. Sky Slam brings Vince Carter into the fan’s world through augmented reality, supported by a campaign built for social and public screens."
    facts={[["Experience","Mobile augmented reality"],["Contribution","Direction, production, 3D animation & AR"],["Recognition","2025 NBA Innovation Award"]]}
    image="/media/raptors/hero.webp" imageAlt="Vince Carter mid-dunk in the finished Raptors and Bell Sky Slam campaign" imageWidth={1600} imageHeight={2000} next={["nba-microsoft","NBA × Microsoft"]}>
    <Chapter label="The finished campaign" title={<>An iconic dunk.<br />A new way to experience it.</>} text="The campaign connects the memory of Vince’s game with an experience fans can participate in. The finished film shows the idea in context, from basketball culture to the digital character and the experience on a phone.">
      <Film namespace="raptors" id="case-study" title="Sky Slam" detail="Raptors × Bell / Final campaign film" duration="1:01" />
      <div className="case-note-row"><p>The creative problem</p><p>Make an emerging technology feel familiar and worth trying. The entry point is the player and the moment, with the technology serving the fan experience.</p></div>
    </Chapter>
    <Chapter label="Campaign delivery" title="Meet fans where they are." text="The same campaign identity carries into different placements. These are the delivered social and kiosk films, with the product invitation built into the creative.">
      <div className="case-media-duo case-portrait-pair"><Film namespace="raptors" id="social" title="The social campaign" detail="Finished 4:5 ad" duration="0:15" aspect="4 / 5" /><Film namespace="raptors" id="kiosk" title="The kiosk creative" detail="Finished portrait placement" duration="0:18" aspect="9 / 16" /></div>
    </Chapter>
    <Chapter label="Behind the character" title="Recognition is in the details." text="The digital Vince needs to be recognizable at a glance and convincing in motion. These production captures show the face, surface materials, jersey, and dunk pose that sit behind the experience." className="case-process">
      <div className="case-still-grid"><Figure src="/media/raptors/character-face.webp" alt="Vince Carter digital face look development" caption="Facial likeness and surface detail" width={1724} height={1724}/><Figure src="/media/raptors/character-dunk.webp" alt="Digital Vince Carter character in a dunk pose" caption="Character and jersey development" width={1724} height={1724}/><Figure src="/media/raptors/character-pose.webp" alt="Vince Carter 3D character holding the ball in a second airborne pose" caption="A second animation pose" width={1724} height={1724}/></div>
      <div className="case-media-duo"><Film namespace="raptors" id="lookdev" title="Look development" detail="Production walkthrough / excerpt" duration="0:24" /><Film namespace="raptors" id="materials" title="Materials and texture" detail="Character painting / production capture" duration="0:36" /></div>
    </Chapter>
    <Chapter label="From asset to experience" title="Make the movement work." text="The finished image is one part of the job. Browser playback and animation studies show the character in motion, with attention to how the dunk reads in the live experience.">
      <div className="case-media-duo"><Film namespace="raptors" id="dunk" title="The dunk in the browser" detail="PlayCanvas / real-time preview" duration="0:28" /><Film namespace="raptors" id="raptor" title="The Raptor in motion" detail="Character animation / production capture" duration="0:23" /></div>
      <p className="case-media-note">Production captures are shown as behind-the-scenes work; the final campaign films appear above.</p>
    </Chapter>
    <Outcome title={<>A reason to try it.<br />A working experience behind it.</>} text="RENDRD connects the campaign idea with the technical work that makes it real. For your team, that means a customer-facing story, convincing digital assets, and an experience that demonstrates what the technology can do." action="Discuss an interactive campaign" />
  </Shell>;
}

export function ArtechouseCase() {
  return <Shell className="artechouse-case" client="Protopica × ARTECHOUSE / New York" title={<>A world you<br />step inside.</>} lead="Moving images become a shared environment. Protopica’s work at ARTECHOUSE carries visual storytelling into an 18K, 270-degree installation, where the room and the audience become part of the composition."
    facts={[["Setting","ARTECHOUSE, New York"],["Canvas","18K / 270-degree environment"],["Practice","World-building & immersive visuals"]]}
    image="/media/artechouse/hero.webp" imageAlt="Visitors surrounded by Protopica’s large-scale visuals at ARTECHOUSE" imageWidth={1920} imageHeight={1080} next={["neurogenesis","Protopica / Neurogenesis"]}>
    <Chapter label="The work in place" title="The room is part of the story." text="Seen at architectural scale, an environment has to hold together across the audience’s field of view. This footage shows the installed work, with visitors giving a sense of its scale.">
      <Film namespace="artechouse" id="installation" title="Inside ARTECHOUSE" detail="Installed experience / New York" duration="0:31" />
      <div className="case-note-row"><p>The creative problem</p><p>Build a world that invites people to look around and spend time in it. Composition, motion, and pacing need to work across a room rather than a single conventional screen.</p></div>
    </Chapter>
    <Chapter label="World-building" title="Design beyond the frame." text="The production master stretches the world across a panoramic canvas. Closer render studies reveal the marine life, light, and surface detail that give the environment its atmosphere." className="case-process">
      <div className="case-panorama-stack"><Figure src="/media/artechouse/world-1.webp" alt="Panoramic environment artwork from the Protopica ARTECHOUSE production" caption="Panoramic production master prepared for immersive projection" width={1920} height={960}/><div className="case-media-duo"><Figure src="/media/artechouse/world-2.webp" alt="Rendered underwater world from the ARTECHOUSE production" caption="Environment study / the underwater world"/><Figure src="/media/artechouse/world-detail.webp" alt="Marine life, rock and light in the ARTECHOUSE production render" caption="A closer look at marine life, rock, and light"/></div></div>
    </Chapter>
    <Chapter label="Production to presence" title="Give the audience a place in it." text="Cinema 4D, Houdini, and After Effects support the production of environments made to surround people. The result is best understood through the relationship between the artwork, the room, and its visitors.">
      <div className="case-media-duo"><Figure src="/media/artechouse/audience.webp" alt="Audience members watching Protopica visuals in the immersive room" caption="The installation with its audience" width={1920} height={1080}/><Figure src="/media/artechouse/narrative.webp" alt="Narrative imagery projected across the ARTECHOUSE space" caption="Film and environment share the architectural canvas" width={1080} height={1448}/></div>
      <p className="case-media-note">Protopica / Will Selviz and Manuel Sainsily.</p>
    </Chapter>
    <Outcome title={<>A brand story<br />people can inhabit.</>} text="The same approach can make an event, launch, or demonstration more tangible: start with the story and audience, then design the technology and media around the physical experience." action="Discuss an immersive experience" />
  </Shell>;
}

export function NeurogenesisCase() {
  return <Shell className="neurogenesis-case" client="Protopica / Sónar Barcelona" title={<>A story shaped<br />by its audience.</>} lead="Neurogenesis is an interactive experience and generative short film exploring identity and ancestral memory. Gestures, emotions, and brainwave data become inputs to a shifting world that connects Afro-Caribbean heritage with future possibilities."
    facts={[["Setting","Sónar Barcelona"],["Format","Interactive installation & generative film"],["Authors","Manuel Sainsily & Will Selviz"]]}
    image="/media/neurogenesis/hero.webp" imageAlt="A visitor experiencing Neurogenesis at Sónar with a headset, display, and illuminated computer" imageWidth={1920} imageHeight={1280} next={["adobe-firefly","Adobe"]}>
    <Chapter label="The human experience" title="Make participation the starting point." text="The participant is part of the narrative. The installation uses gestures, emotions, and neural signals to explore a more personal relationship between an audience and moving images.">
      <div className="case-media-duo"><Figure src="/media/neurogenesis/participant.webp" alt="Side view of a participant wearing a headset at the Neurogenesis installation" caption="A visitor inside the experience" width={2400} height={1600}/><Figure src="/media/neurogenesis/setup.webp" alt="Neurogenesis installation with its screen, computer, and project signage" caption="The complete installation at Sónar" width={1600} height={2400}/></div>
      <p className="case-media-note">Created by Manuel Sainsily and Will Selviz, with Louise Lessel and Debi Wong.</p>
    </Chapter>
    <Chapter label="A visible system" title="From an input to a moving world." text="The hardware, the participant, and the film belong to one experience. These installation photographs make that system visible, rather than presenting the generated imagery in isolation." className="case-process">
      <Figure src="/media/neurogenesis/hardware.webp" alt="The illuminated computer and installation hardware used for Neurogenesis" caption="Hardware and display / installation documentation" width={2400} height={1600}/>
      <div className="case-approach"><article><h3>Invite participation</h3><p>Give the visitor an active role through the physical installation and its inputs.</p></article><article><h3>Connect it to a story</h3><p>Use emerging technology to explore identity, heritage, and possible futures.</p></article><article><h3>Make the result tangible</h3><p>Bring the idea into a working public experience that people can see and engage with.</p></article></div>
    </Chapter>
    <Chapter label="The film language" title="A world that can change with you." text="Selected production sequences show the visual language of the experience. These clips are parts of the generative film system, shown separately from the live installation.">
      <Film namespace="neurogenesis" id="connections" title="Connections" detail="Generative film / production sequence" duration="0:10" />
      <div className="case-media-duo case-film-followup"><Film namespace="neurogenesis" id="joy" title="Joy" detail="Generative film / production sequence" duration="0:30" /><Film namespace="neurogenesis" id="fear" title="Fear" detail="Generative film / production sequence" duration="0:30" /></div>
    </Chapter>
    <Outcome title={<>An emerging capability.<br />A human reason to care.</>} text="For a marketing or product team, a working installation can explain an unfamiliar capability more clearly than a promise. RENDRD helps shape the use case, the story, and the demonstration around the audience." action="Discuss a working prototype" />
  </Shell>;
}

export function AdobeCase() {
  return <Shell className="adobe-case" client="Adobe / Creative advisory, workshops & speaking" title={<>New tools.<br />Better creative decisions.</>} lead="Creative tools need a practitioner’s perspective. Will’s work with Adobe connects hands-on experimentation and product conversations with workshops, talks, and dialogue about technology’s role in culture."
    facts={[["Practice","Consultation & creative workflows"],["In the room","Adobe HQ & Adobe MAX VIP Summit"],["Focus","Adoption, culture & creative purpose"]]}
    image="/media/adobe/hero.webp" imageAlt="Will Selviz with creative collaborators at Adobe headquarters" imageWidth={1280} imageHeight={854} next={["nike-air-max","Nike"]}>
    <Chapter label="Creative practice & product insight" title="Bring the tools into a real workflow." text="The collaboration includes consultation, workshops, and review sessions around emerging creative technology. Practical experience helps connect a product’s possibilities with the decisions creatives make in their day-to-day work.">
      <div className="case-note-row"><p>A practical example</p><p>An iPhone-based experiment combined 3D animation and generated audio in a workflow using Simulon and Premiere Pro. It turns a discussion about new capabilities into a process a creative team can examine and try.</p></div>
      <div className="case-approach"><article><h3>Build the scene</h3><p>Use Simulon to place 3D work into a captured environment.</p></article><article><h3>Shape the sound</h3><p>Explore generated audio as part of the film’s creative direction.</p></article><article><h3>Bring it together</h3><p>Use Premiere to edit the picture and sound into a finished story.</p></article></div>
      <Figure src="/media/adobe/workflow.webp" alt="Adobe Premiere mobile and desktop editing workflow reference" caption="Premiere mobile workflow / product reference" width={1300} height={750}/>
    </Chapter>
    <Chapter label="Adobe HQ" title="Share the practice behind the work." text="Presenting Protopica brings questions of culture, human connection, and emerging technology into the same conversation. The work provides a concrete starting point for discussing what creative tools can make possible.">
      <div className="case-adobe-practice"><Figure src="/media/adobe/portrait.webp" alt="Will Selviz and Manuel Sainsily at Adobe headquarters" caption="Protopica at Adobe headquarters" width={660} height={880}/><div><h3>From making to explaining.</h3><p>The Protopica talk draws on work that people can see and discuss. Creative experiments become a way to explore how a new tool changes an existing process, where judgment still matters, and how to communicate the result.</p><p>That perspective carries into Firefly consultation and hands-on workshops: a practical conversation between the people developing tools and the people using them.</p></div></div>
    </Chapter>
    <Chapter label="Adobe MAX VIP Summit" title="Put purpose ahead of the tool." text="Will moderated a conversation on technology for cultural preservation and purpose. The discussion moves beyond the feature list to the people, histories, and creative intentions behind the work." className="case-process">
      <div className="case-discussion"><p className="case-discussion-title">Questions that matter<br />when new tools enter culture.</p><ul><li>How can technology help preserve cultural knowledge and creative traditions?</li><li>How do artists keep purpose and authorship at the centre of new workflows?</li><li>What does responsible experimentation look like in creative practice?</li></ul></div>
      <p className="case-media-note">Discussion themes summarized from the Adobe panel transcript.</p>
    </Chapter>
    <Outcome title={<>Help your team<br />understand what comes next.</>} text="RENDRD brings practical creative experience into advisory sessions, workshops, and leadership conversations. The goal is clearer decisions about the tools, workflows, and stories worth pursuing." action="Discuss a workshop or advisory brief" />
  </Shell>;
}
