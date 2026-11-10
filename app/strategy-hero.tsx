"use client";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./components";
import { createSignalShader } from "./signal-shader";

const letters = "RENDRDMEDIA".split("");
// The PDF's two reading paths: RENDRD down the left; MEDIA across the upper field.
const desktop = {
 start: [[.055,.09],[.195,.28],[.065,.47],[.065,.69],[.205,.66],[.225,.90],[.405,.15],[.55,.075],[.685,.15],[.81,.075],[.925,.15]],
 end: [[.06,.10],[.19,.27],[.07,.45],[.07,.665],[.205,.665],[.215,.865],[.405,.115],[.54,.10],[.67,.115],[.80,.10],[.92,.115]],
};
const mobile = {
 start: [[.12,.10],[.375,.275],[.13,.465],[.13,.69],[.395,.65],[.41,.94],[.67,.15],[.89,.07],[.71,.35],[.92,.35],[.90,.54]],
 end: [[.125,.10],[.365,.265],[.135,.45],[.135,.67],[.39,.67],[.40,.92],[.66,.13],[.88,.13],[.70,.33],[.915,.33],[.89,.53]],
};
const depth = [-75,55,-45,-35,40,-40,110,-105,75,-65,-60];
const tilt = [[5,-13,-2],[-6,12,3],[4,-10,-2],[-5,11,2],[6,-12,-2],[-4,10,2],[-5,12,-2],[5,-14,2],[-5,10,-2],[4,-12,2],[-4,10,-2]];
const bonds = [[0,1],[1,2],[2,3],[3,4],[4,5],[6,7],[7,8],[8,9],[9,10]];
const perspective = 1100;
type Projected = {x:number;y:number;w:number;h:number};

export default function StrategyHero(){
 const wrap=useRef<HTMLElement>(null), stage=useRef<HTMLDivElement>(null);
 const wake=useRef<()=>void>(()=>{}), pausedRef=useRef(false);
 const [paused,setPaused]=useState(false);
 pausedRef.current=paused;

 useEffect(()=>{
  const outer=wrap.current!, area=stage.current!;
  const frame=outer.querySelector<HTMLElement>(".strategy-frame")!;
  const nodes=Array.from(area.querySelectorAll<HTMLElement>(".identity-letter"));
  const paths=Array.from(area.querySelectorAll<SVGPathElement>(".identity-bond path"));
  const dots=Array.from(area.querySelectorAll<SVGCircleElement>(".identity-bond circle"));
  const query=matchMedia("(prefers-reduced-motion: reduce)");
  const theme=matchMedia("(prefers-color-scheme: dark)");
  const canvas=outer.querySelector<HTMLCanvasElement>(".signal-field canvas")!;
  const saveData=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData;
  let shader:ReturnType<typeof createSignalShader>=null;
  let reduced=query.matches, visible=true, dead=false, raf=0, last=0, elapsed=0;
  let width=1,height=1,start=0,range=1,isMobile=false;
  let sizes:{w:number;h:number}[]=[];
  let pointer={x:0,y:0}, currentPointer={x:0,y:0};
  const springs=letters.map(()=>({position:0,velocity:0}));
  let previousTarget:number|null=null;

  const draw=(now:number)=>{
   raf=0;if(dead)return;
   const dt=last?Math.min(now-last,40):0;last=now;
   const idle=!pausedRef.current&&!reduced&&!document.hidden;
   if(idle){elapsed+=dt;currentPointer.x+=(pointer.x-currentPointer.x)*.035;currentPointer.y+=(pointer.y-currentPointer.y)*.035;}
   const progress=reduced?1:Math.max(0,Math.min(1,(window.scrollY-start)/range));
   const target=progress*progress*(3-2*progress), layout=isMobile?mobile:desktop;
   // A lightly damped spring lets each glyph arrive, overshoot, and settle.
   // Small variations keep the assembly from landing as one rigid block.
   const targetChanged=target!==previousTarget;
   springs.forEach((spring,i)=>{
    if(previousTarget===null||reduced||(pausedRef.current&&targetChanged)){
     spring.position=target;spring.velocity=0;
    }else if(idle){
     const omega=9+(i%4)*.45, damping=.60+(i%3)*.025;
     const steps=Math.max(1,Math.ceil(dt/8)), step=dt/1000/steps;
     for(let j=0;j<steps;j++){
      spring.velocity+=(omega*omega*(target-spring.position)-2*damping*omega*spring.velocity)*step;
      spring.position+=spring.velocity*step;
     }
     if(Math.abs(target-spring.position)<.00005&&Math.abs(spring.velocity)<.0002){spring.position=target;spring.velocity=0;}
    }
   });
   previousTarget=target;
   const projected:Projected[]=[];
   sizes.forEach((size,i)=>{
    const ease=springs[i].position;
    const phase=elapsed/3300+i*.91, rest=reduced?0:1;
    const float=Math.max(.025,1-ease*.92)*rest*(isMobile?.65:1);
    const sway=Math.max(-2.4,Math.min(2.4,springs[i].velocity))*rest*(isMobile?.65:1);
    const direction=i%2===0?1:-1;
    const driftX=Math.sin(phase)*7*float, driftY=Math.cos(phase*.83)*11*float;
    const z=(depth[i]+Math.sin(phase*.7)*28)*float+sway*4;
    const x=(layout.start[i][0]+(layout.end[i][0]-layout.start[i][0])*ease)*width+driftX+currentPointer.x*z*.085+sway*direction*1.3;
    const y=(layout.start[i][1]+(layout.end[i][1]-layout.start[i][1])*ease)*height+driftY+currentPointer.y*z*.065;
    const rx=(tilt[i][0]*1.4+Math.sin(phase*.8)*4)*float+sway*.65;
    const ry=(tilt[i][1]*1.5+Math.cos(phase*.65)*5)*float-sway*direction*.9;
    const rz=(tilt[i][2]*1.4+Math.sin(phase*.6)*1.5)*float+sway*direction*.8;
    nodes[i].style.transform="translate3d("+(x-size.w/2).toFixed(2)+"px,"+(y-size.h/2).toFixed(2)+"px,"+z.toFixed(2)+"px) rotateX("+rx.toFixed(2)+"deg) rotateY("+ry.toFixed(2)+"deg) rotateZ("+rz.toFixed(2)+"deg) scaleX(1.2)";
    nodes[i].style.filter="blur("+(Math.abs(z)/65*Math.max(0,1-ease)).toFixed(2)+"px)";
    const scale=perspective/(perspective-z);
    projected.push({x:width/2+(x-width/2)*scale,y:height/2+(y-height/2)*scale,w:size.w*1.2*scale,h:size.h*.78*scale});
   });
   // Connect the outside of each letter, leaving breathing room around the glyph.
   bonds.forEach(([from,to],i)=>{
    const a=projected[from],b=projected[to];if(!a||!b)return;
    const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);
    const edge=(p:Projected)=>Math.min((p.w/2+9)/Math.max(Math.abs(dx),.001),(p.h/2+9)/Math.max(Math.abs(dy),.001));
    const t1=edge(a),t2=edge(b),x1=a.x+dx*t1,y1=a.y+dy*t1,x2=b.x-dx*t2,y2=b.y-dy*t2;
    const gap=Math.max(0,len*(1-t1-t2));
    paths[i].setAttribute("d","M"+x1.toFixed(2)+","+y1.toFixed(2)+" L"+x2.toFixed(2)+","+y2.toFixed(2));
    const bondEase=Math.max(0,Math.min(1,(springs[from].position+springs[to].position)/2));
    paths[i].style.opacity=gap>5?String(.48+bondEase*.24):"0";
    dots[i].setAttribute("cx",x2.toFixed(2));dots[i].setAttribute("cy",y2.toFixed(2));
    dots[i].style.opacity=gap>5?String(.55+bondEase*.2):"0";
   });
   outer.dataset.progress=progress.toFixed(3);
   if(!reduced)shader?.render(elapsed,progress,currentPointer,theme.matches);
   if(visible&&idle)raf=requestAnimationFrame(draw);
  };
  const schedule=()=>{if(!raf&&!dead)raf=requestAnimationFrame(draw);};
  wake.current=()=>{last=0;schedule();};
  const measure=()=>{
   if(dead)return;
   width=area.clientWidth;height=area.clientHeight;isMobile=innerWidth<=760;
   sizes=nodes.map(n=>({w:n.offsetWidth,h:n.offsetHeight}));
   start=outer.getBoundingClientRect().top+window.scrollY;
   const travel=outer.offsetHeight-frame.offsetHeight;
   range=isMobile||travel<1?Math.min(260,height*.62):travel;
   if(!reduced&&!saveData&&!shader)shader=createSignalShader(canvas);
   shader?.resize(frame.clientWidth,isMobile?frame.clientHeight*.5:frame.clientHeight);
   schedule();
  };
  const update=()=>{reduced=query.matches;currentPointer={x:0,y:0};if(reduced){shader?.dispose();shader=null;delete canvas.dataset.shader;}measure();};
  const move=(event:PointerEvent)=>{
   if(event.pointerType!=="mouse"||reduced||pausedRef.current)return;
   const bounds=area.getBoundingClientRect();pointer={x:Math.max(-1,Math.min(1,(event.clientX-bounds.left)/width*2-1)),y:Math.max(-1,Math.min(1,(event.clientY-bounds.top)/height*2-1))};
  };
  const leave=()=>{pointer={x:0,y:0};};
  const visibility=()=>{last=0;if(document.hidden){cancelAnimationFrame(raf);raf=0;}else schedule();};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){last=0;schedule();}else{cancelAnimationFrame(raf);raf=0;}});
  observer.observe(outer);
  const resize=new ResizeObserver(measure);resize.observe(area);
  frame.addEventListener("pointermove",move);frame.addEventListener("pointerleave",leave);
  window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",measure);
  document.addEventListener("visibilitychange",visibility);query.addEventListener("change",update);
  theme.addEventListener("change",schedule);
  document.fonts.ready.then(measure);measure();
  return()=>{dead=true;wake.current=()=>{};cancelAnimationFrame(raf);observer.disconnect();resize.disconnect();shader?.dispose();theme.removeEventListener("change",schedule);frame.removeEventListener("pointermove",move);frame.removeEventListener("pointerleave",leave);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",measure);document.removeEventListener("visibilitychange",visibility);query.removeEventListener("change",update);};
 },[]);
 useEffect(()=>{wake.current();},[paused]);

 return <section className="strategy-hero" ref={wrap} data-paused={paused} aria-label="RENDRD technology strategy and advisory">
  <div className="strategy-frame">
   <div className="signal-field" aria-hidden="true"><canvas /></div>
   <div className="identity-stage" ref={stage}>
    <h1 aria-label="RENDRD Media"><span className="sr-only">RENDRD Media</span>{letters.map((letter,i)=><span aria-hidden="true" key={i} className={"identity-letter identity-letter-"+i}>{letter}</span>)}</h1>
    <svg className="identity-bonds" aria-hidden="true">{bonds.map(([a,b])=><g className="identity-bond" key={a+"-"+b}><path/><circle r="1.6"/></g>)}</svg>
   </div>
   <div className="strategy-copy"><p className="hero-category">Strategy &amp; creative technology</p><h2>Technology your team<br/><span>can put to work.</span></h2><p>RENDRD helps marketing and sales teams choose the right technology, build useful tools, and create campaigns that connect with customers.</p><div className="strategy-actions"><a href="#contact" className="pill">Discuss your priorities <Arrow/></a><a href="#work" className="strategy-work-link">See the work <Arrow/></a></div></div>
   <button className="identity-toggle" aria-label={paused?"Resume animation":"Pause animation"} title={paused?"Resume animation":"Pause animation"} aria-pressed={paused} onClick={()=>setPaused(p=>!p)}><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">{paused?<path fill="currentColor" d="M5 3 17 10 5 17Z"/>:<path fill="currentColor" d="M4 3h4v14H4zM12 3h4v14h-4z"/>}</svg></button>
  </div>
 </section>;
}

