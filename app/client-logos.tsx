const clients = [
  ["openai", "OpenAI"],
  ["adobe", "Adobe"],
  ["nike", "Nike"],
  ["microsoft", "Microsoft"],
  ["nba", "NBA"],
  ["meta", "Meta"],
] as const;

export function BrandMark({ id, name }: { id: string; name: string }) {
  return <span className={`brand-mark brand-mark-${id}`} role="img" aria-label={name} data-label={name} />;
}

export default function ClientLogos() {
  return <div className="clients">
    <p id="client-list-label">Selected clients &amp; collaborators</p>
    <ul className="client-marks" aria-labelledby="client-list-label">
      {clients.map(([id, name]) => <li key={id}><BrandMark id={id} name={name} /></li>)}
    </ul>
  </div>;
}
