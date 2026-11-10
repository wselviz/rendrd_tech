import type { Metadata } from "next";
import Link from "../../link";
import { notFound } from "next/navigation";
import { projects,site } from "../../data";
import { Header,Footer,Arrow } from "../../components";
import { BrandMark } from "../../client-logos";
import { NBAFeaturedFilm, NBAFilmCollection } from "../../nba-film";
import NikeCase from "../../nike-case";
const brandMarks:Record<string,[string,string,boolean][]> = {"nike-air-max":[["nike.svg","Nike",false]],"protopica-artechouse":[["protopica-lockup.png","Protopica",true],["artechouse-wordmark.svg","ARTECHOUSE",true]],"raptors-vince-carter":[["raptors-primary.svg","Toronto Raptors",false],["bell-wordmark.svg","Bell",false]],"neurogenesis":[["protopica-lockup.png","Protopica",true]],"adobe-firefly":[["adobe.svg","Adobe",false]],"nba-microsoft":[["nba.svg","NBA",false],["microsoft.png","Microsoft",false],["best-buy.png","Best Buy",false],["usa-basketball.png","USA Basketball",false],["olympics.svg","Olympics",false]]};
const galleryCaptions:Record<string,string[]> = {
  "nike-air-max": [
    "Air Max 95: a giant shoe emerges from the AGO glass façade in the campaign film"
  ],
  "protopica-artechouse": [
    "Protopica: environment artwork for the immersive installation"
  ],
  "raptors-vince-carter": [
    "Raptors × Bell: Vince Carter experience campaign visual"
  ],
  "neurogenesis": [
    "Neurogenesis: audience participation at Sónar Barcelona"
  ],
  "adobe-firefly": [
    "Creative community at Adobe headquarters"
  ],
  "nba-microsoft": [
    "Creative technology workshop and product demonstration"
  ]
};
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const p=projects.find(p=>p.slug===slug);
  if(!p)return {title:"Project not found"};
  return {title:p.client+" · "+p.title,description:p.intro,alternates:{canonical:"/work/"+p.slug},openGraph:{title:p.title,description:p.intro,url:site.url+"/work/"+p.slug,images:[p.image]},twitter:{card:"summary_large_image",images:[p.image]}};
}
export default async function WorkPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const index=projects.findIndex(p=>p.slug===slug);if(index<0)notFound();
  const p=projects[index],next=projects[(index+1)%projects.length];
  if (p.slug === "nike-air-max") return <NikeCase />;
  return <><Header /><main id="main" tabIndex={-1} className={`case-page${p.slug === "nba-microsoft" ? " nba-case" : ""}`}>
    <div className="case-head section"><Link href="/#work" className="text-link">← Selected work</Link><p className="section-label">{p.client} / {p.subtitle}</p><h1 className="case-title">{p.title}</h1><div className="case-summary"><p>{p.intro}</p><span>{p.discipline}</span></div></div>
    <div className="case-hero"><div className="case-brand"><span>Collaborators</span><div>{brandMarks[p.slug].map(([file,name,dark])=><span className={dark?"brand-on-dark":""} key={name}>{["nike.svg","adobe.svg","nba.svg","microsoft.png","best-buy.png","usa-basketball.png","olympics.svg"].includes(file) ? <BrandMark id={file.split(".")[0]} name={name} /> : <img src={"/logos/"+file} alt={name} width="160" height="70"/>}</span>)}</div></div>{p.slug === "nba-microsoft" ? <NBAFeaturedFilm /> : <picture><source media="(max-width:760px)" srcSet={p.image.replace('.webp','-mobile.webp')}/><img src={p.image} alt={p.alt} width="1600" height="1000" fetchPriority="high" /></picture>}</div>
    <section className="case-story section"><h2>The context</h2><p>{p.context}</p><h2>The contribution</h2><p>{p.contribution}</p><h2>What took shape</h2><div><ul>{p.delivered.map(d=><li key={d}>{d}</li>)}</ul><p>{p.takeaway}</p></div></section>
    {p.slug === "nba-microsoft" && <NBAFilmCollection />}
    {p.video&&<section className="case-film section"><h2>The work in motion</h2><video controls playsInline preload="none" poster={p.image} aria-label={p.client+" project film"}><source src={p.video} type="video/mp4" />Your browser cannot play this video.</video></section>}
    <div className="case-gallery section">{p.gallery.map((src,i)=><figure key={src}><img src={src} alt={galleryCaptions[p.slug][i]} width="1200" height="900" loading="lazy" /><figcaption>{galleryCaptions[p.slug][i]}</figcaption></figure>)}</div>
    <section className="case-next section"><p>Next project</p><Link href={"/work/"+next.slug}><h2>{next.client}</h2><Arrow /></Link></section>
  </main><Footer /></>;
}

