import { projects,site } from "./data";
export default function sitemap(){return [{url:site.url},...projects.map(p=>({url:site.url+"/work/"+p.slug}))];}
