import Link from "./link";
import { Header } from "./components";
export const metadata = {title:"Page not found",description:"This page is still taking shape. Return to RENDRD Media's selected work and capabilities.",robots:{index:false,follow:true}};
export default function NotFound(){return <><Header /><main id="main" tabIndex={-1} className="not-found section"><p>404 / A little ahead of ourselves.</p><h1>THIS IDEA IS<br />STILL TAKING<br />SHAPE.</h1><Link href="/" className="pill">Back to RENDRD ↗</Link></main></>;}
