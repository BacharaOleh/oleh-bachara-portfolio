type ArtworkId = "reh4mat-ecosystem" | "tech-infrastructure" | "telegram-auth-bridge";

const LABELS: Record<ArtworkId, string> = {
  "reh4mat-ecosystem": "Catalogue field",
  "tech-infrastructure": "Migration path",
  "telegram-auth-bridge": "Signed signal",
};

export function CaseArtwork({ id, index, label }: { id: ArtworkId; index: string; label?: string }) {
  return (
    <div className={`case-art case-art--${id === "reh4mat-ecosystem" ? "reh4mat" : id === "tech-infrastructure" ? "migration" : "telegram"}`} aria-hidden="true">
      <span className="case-art__corner case-art__corner--top" />
      <span className="case-art__corner case-art__corner--bottom" />
      <span className="case-art__index">{index}</span>
      <span className="case-art__label">{label ?? LABELS[id]}</span>
      {id === "reh4mat-ecosystem" && (
        <svg viewBox="0 0 720 420" fill="none" preserveAspectRatio="xMidYMid slice">
          <g className="art-stroke" strokeWidth="1">
            <path d="M0 84H720M0 168H720M0 252H720M0 336H720" opacity=".38" />
            <path d="M120 0V420M240 0V420M360 0V420M480 0V420M600 0V420" opacity=".38" />
          </g>
          <rect className="art-fill" x="80" y="72" width="200" height="120" />
          <rect className="art-fill" x="324" y="156" width="168" height="132" />
          <rect className="art-fill" x="532" y="54" width="108" height="210" />
          <g className="art-stroke" strokeWidth="2"><path d="M80 192L280 72M324 288L492 156M532 264L640 54" /></g>
          <circle className="art-fill" cx="280" cy="72" r="9" /><circle className="art-fill" cx="492" cy="156" r="9" /><circle className="art-fill" cx="640" cy="54" r="9" />
        </svg>
      )}
      {id === "tech-infrastructure" && (
        <svg viewBox="0 0 720 420" fill="none" preserveAspectRatio="xMidYMid slice">
          <g className="art-stroke" strokeWidth="1" opacity=".42"><path d="M0 91H720M0 210H720M0 329H720" /><path d="M150 0V420M360 0V420M570 0V420" /></g>
          <path className="art-stroke" d="M38 315C132 315 138 105 236 105C331 105 332 258 426 258C520 258 523 55 682 55" strokeWidth="3" />
          <g className="art-fill"><circle cx="38" cy="315" r="14" /><circle cx="236" cy="105" r="14" /><circle cx="426" cy="258" r="14" /><circle cx="682" cy="55" r="14" /></g>
          <g className="art-stroke" strokeWidth="1.5"><path d="M90 361H213M482 319H642" /><path d="M213 350V372M482 308V330" /></g>
        </svg>
      )}
      {id === "telegram-auth-bridge" && (
        <svg viewBox="0 0 720 420" fill="none" preserveAspectRatio="xMidYMid slice">
          <g className="art-stroke" strokeWidth="1" opacity=".42"><circle cx="360" cy="210" r="70" /><circle cx="360" cy="210" r="132" /><circle cx="360" cy="210" r="200" /></g>
          <path className="art-stroke" d="M80 260L270 214L360 117L489 218L640 135" strokeWidth="3" />
          <g className="art-fill"><rect x="62" y="242" width="36" height="36" /><rect x="252" y="196" width="36" height="36" /><rect x="342" y="99" width="36" height="36" /><rect x="471" y="200" width="36" height="36" /><rect x="622" y="117" width="36" height="36" /></g>
          <path className="art-stroke" d="M80 260C168 374 515 378 640 135" strokeWidth="1.5" opacity=".72" />
        </svg>
      )}
    </div>
  );
}
