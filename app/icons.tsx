type IconProps = { className?: string };

export function Arrow({ direction = "diagonal", className = "" }: IconProps & { direction?: "diagonal" | "left" | "up" }) {
  const path = direction === "left" ? "M19 12H5m6-6-6 6 6 6" : direction === "up" ? "M12 19V5m-6 6 6-6 6 6" : "M6 18 18 6M6 6h12v12";
  return <svg className={`arrow ${className}`} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={path}/></svg>;
}
export function PlayIcon() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" focusable="false"><path d="M7 4 20 12 7 20Z"/></svg>;
}
export function PauseIcon() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>;
}
export function PlusIcon({ expanded = false, close = false }: { expanded?: boolean; close?: boolean }) {
  return <svg className="plus-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false" style={close ? { rotate: "45deg" } : undefined}><path d="M5 12h14"/>{!expanded && <path d="M12 5v14"/>}</svg>;
}
