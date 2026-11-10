"use client";
import { useState } from "react";
import Link from "./link";
import { Header, Footer, Arrow } from "./components";
import { PlusIcon } from "./icons";
import StrategyHero from "./strategy-hero";
import ClientLogos from "./client-logos";
import { projects, services, engagements, site, credentials } from "./data";

const order=["nike-air-max","adobe-firefly","nba-microsoft","raptors-vince-carter","neurogenesis","protopica-artechouse"];
const work=order.map(slug=>projects.find(p=>p.slug===slug)!);
export default function Home(){
 const [filter,setFilter]=useState("All work"),[active,setActive]=useState(0);
 const selectedProject=projects.find(p=>p.slug===services[active].project);
 return <><Header/><main id="main" tabIndex={-1}>
  <StrategyHero/>
  <section className="trust-section section" id="credentials" data-focus-reveal>
   <ClientLogos />
  </section>
  <section className="capabilities section" id="capabilities" data-focus-reveal>
   <div className="capability-intro"><h2>What we help<br/>you do.</h2><p>Choose the right technology. Build something useful. Give your team the skills and story to bring it to market.</p>
    {selectedProject?<Link className="capability-proof" href={"/work/"+selectedProject.slug}><img src={selectedProject.image} alt={selectedProject.alt} width="800" height="600" loading="lazy"/><span>Related work: {selectedProject.client}<Arrow/></span></Link>:null}
   </div>
   <div className="service-list">{services.map((s,i)=>{const proof=projects.find(p=>p.slug===s.project);return <div className={"service "+(active===i?"is-open":"")} key={s.title}><h3><button aria-expanded={active===i} aria-controls={"service-"+i} onClick={()=>setActive(i)}><span>{s.title}</span><span className="service-symbol" aria-hidden="true"><PlusIcon expanded={active===i}/></span></button></h3><div id={"service-"+i} hidden={active!==i} className="service-content"><p>{s.text}</p><ul>{s.items.map(item=><li key={item}>{item}</li>)}</ul>{proof?<><Link href={"/work/"+proof.slug} className="service-mobile-proof"><img src={proof.image} alt="" width="120" height="90"/><span>{proof.client}<small>Explore the work <Arrow/></small></span></Link><Link href={"/work/"+proof.slug} className="text-link desktop-proof-link">Explore related work <Arrow/></Link></>:<a href="#contact" className="text-link">Discuss your priorities <Arrow/></a>}</div></div>})}</div>
  </section>
  <section className="work section" id="work" data-focus-reveal>
   <div className="section-heading"><div><h2>The work.</h2></div><p>Campaigns, product demos, and experiences for global brands.</p></div>
   <div className="filters" aria-label="Filter selected work">{["All work","Campaigns","Demos & adoption","Emerging experiences"].map(f=><button key={f} aria-pressed={filter===f} className={filter===f?"active":""} onClick={()=>setFilter(f)}>{f}{f==="All work"&&<span>06</span>}</button>)}</div>
   <p className="sr-only" role="status">{work.filter(p=>filter==="All work"||p.category===filter).length} projects shown</p>
   <div className="work-grid">{work.filter(p=>filter==="All work"||p.category===filter).map((p,i)=><Link href={"/work/"+p.slug} className={"project-card project-"+i+" project-"+p.slug} key={p.slug}><div className="project-image"><picture><source media="(max-width: 760px)" srcSet={p.image.replace("hero.webp","hero-mobile.webp")}/><img src={p.image} width="1200" height="900" alt={p.alt} loading="lazy"/></picture><span className="project-category">{p.category}</span><span className="project-open"><Arrow/></span></div><div className="project-meta"><p>{p.client}</p><span>{p.discipline}</span></div><h3>{p.title}</h3><p className="project-summary">{p.intro}</p></Link>)}</div>
   <div className="work-end"><a className="text-link" href={site.deck} target="_blank" rel="noopener noreferrer">View the full capabilities deck <Arrow/></a></div>
  </section>
  <section className="about section" id="about" data-focus-reveal>
   <div className="about-main">
    <div className="about-photo"><img src="/media/will.webp" width="800" height="1000" loading="lazy" alt="Will Selviz, founder of RENDRD Media"/></div>
    <div className="about-copy"><h2>Led by<br/>Will Selviz.</h2><p>Advisor, educator, and creative technologist connecting emerging technology with the needs of brands and their customers.</p><p>Will consults with OpenAI research and product teams and collaborates with Adobe on creative tools. He brings that practical experience into enterprise advisory and education.</p><a className="text-link" href={"mailto:"+site.email}>Work with Will <Arrow/></a></div>
   </div>
   <div className="credentials-grid">{credentials.map(c=><article key={c.name}><p className="credential-role">{c.role}</p><h3>{c.name}</h3><p>{c.description}</p></article>)}</div>
  </section>
  <section className="engagements section" data-focus-reveal>
   <div className="section-heading"><h2>Choose the support<br/>you need.</h2><a className="text-link" href="#contact">Talk through your brief <Arrow/></a></div>
   <div className="engagement-grid">{engagements.map(e=><article key={e.title}><h3>{e.title}</h3><p>{e.text}</p></article>)}</div>
  </section>
 </main><Footer initialService={services[active].title}/></>;
}
