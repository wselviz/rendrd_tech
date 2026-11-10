"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
export default function Motion(){
  const curtain=useRef<HTMLDivElement>(null);
  const navigating=useRef(false);
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx=gsap.context(()=>{
      if(sessionStorage.getItem("rendrd-transition")==="1"){
        sessionStorage.removeItem("rendrd-transition");
        gsap.fromTo(curtain.current,{visibility:"visible",yPercent:0},{yPercent:-100,duration:reduced?0:0.55,ease:"power3.inOut",onComplete:()=>{gsap.set(curtain.current,{visibility:"hidden"});}});
      }
      if(reduced)return;
      if(document.querySelector(".hero h1,.case-title"))gsap.from(".hero h1 > span,.case-title",{y:24,opacity:0,duration:.75,stagger:.055,ease:"power3.out",clearProps:"all"});
      if(document.querySelector(".hero-intro"))gsap.from(".hero-intro,.hero-kicker",{opacity:0,duration:.65,delay:.16,ease:"power3.out",clearProps:"all"});
    });
    const click=(event:MouseEvent)=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||navigating.current)return;
      const link=(event.target as Element)?.closest("a");
      if(!link||link.target||link.hasAttribute("download"))return;
      const url=new URL(link.href,location.href);
      if(url.origin!==location.origin||url.hash||url.pathname===location.pathname||reduced)return;
      event.preventDefault();navigating.current=true;
      sessionStorage.setItem("rendrd-transition","1");
      gsap.fromTo(curtain.current,{yPercent:100,visibility:"visible"},{yPercent:0,duration:.42,ease:"power3.inOut",onComplete:()=>location.assign(url.href)});
    };
    const restore=()=>{navigating.current=false;gsap.set(curtain.current,{visibility:"hidden"});};
    document.addEventListener("click",click);
    window.addEventListener("pageshow",restore);
    return ()=>{ctx.revert();document.removeEventListener("click",click);window.removeEventListener("pageshow",restore);};
  },[]);
  return <div className="route-curtain" ref={curtain} aria-hidden="true"><span>RENDRD</span></div>;
}
