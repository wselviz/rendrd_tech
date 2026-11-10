import type { AnchorHTMLAttributes } from "react";
// Native navigation avoids the starter's failing RSC prefetch path.
export default function Link(props:AnchorHTMLAttributes<HTMLAnchorElement>){return <a {...props}/>;}
