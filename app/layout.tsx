import type { Metadata } from "next";
import { site } from "./data";
import Motion from "./motion";
import "./globals.css";
import "./template.css";
import "./enterprise.css";
import "./identity.css";
import "./nba.css";
import "./theme.css";
import "./readability.css";
import "./nike.css";
import "./signal.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: {default:"RENDRD | Technology strategy & creative advisory",template:"%s | RENDRD"}, description:site.description,
  alternates:{canonical:"/"},
  openGraph:{title:"RENDRD | Technology strategy & creative advisory",description:site.description,type:"website",url:site.url,images:[{url:"/og.jpg",width:1200,height:630}]},
  twitter:{card:"summary_large_image",title:"RENDRD | Technology strategy & creative advisory",description:site.description,images:["/og.jpg"]},
  icons:{icon:"/favicon.svg"},
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><head><meta name="color-scheme" content="light dark" /><meta name="theme-color" media="(prefers-color-scheme: light)" content="#f2f0e9" /><meta name="theme-color" media="(prefers-color-scheme: dark)" content="#131316" /><link rel="preload" href="/fonts/archivo-600-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><a href="#main" className="skip-link">Skip to content</a><Motion />{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Organization",name:"RENDRD Media",url:site.url,email:site.email,description:site.description,founder:{"@type":"Person",name:"Will Selviz"}})}} /></body></html>;
}
