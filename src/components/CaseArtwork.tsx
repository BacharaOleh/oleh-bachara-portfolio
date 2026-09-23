export type ArtworkId =
  | "san-pajda-automation"
  | "goodvalley-automation"
  | "wfm-industrial-mes"
  | "embedded-mesh-iot";

const LABELS: Record<ArtworkId, string> = {
  "san-pajda-automation": "Turbomixer SCADA & Gas Oven PID Profile",
  "goodvalley-automation": "High-Speed Conveyors & Siemens S7 De-Jitter",
  "wfm-industrial-mes": "Factory Digital Twin & MES Dispatch Grid",
  "embedded-mesh-iot": "ESP32-C6 ESP-NOW Resilient Mesh Topology",
};

export function CaseArtwork({
  id,
  index,
  label,
}: {
  id: ArtworkId;
  index: string;
  label?: string;
}) {
  const isSanPajda = id === "san-pajda-automation";
  const isGoodvalley = id === "goodvalley-automation";
  const isMES = id === "wfm-industrial-mes";
  const isMesh = id === "embedded-mesh-iot";

  const modifierClass = isMesh
    ? "mesh"
    : isGoodvalley
    ? "robotics"
    : isMES
    ? "mes"
    : "mes";

  return (
    <div className={`case-art case-art--${modifierClass}`} aria-hidden="true">
      <span className="case-art__corner case-art__corner--top" />
      <span className="case-art__corner case-art__corner--bottom" />
      <span className="case-art__index">{index}</span>
      <span className="case-art__label">{label ?? LABELS[id]}</span>

      {/* 01. San-Pajda: Turbomixer SCADA & Continuous Gas Oven PID Curves */}
      {isSanPajda && (
        <svg viewBox="0 0 720 420" fill="none" preserveAspectRatio="xMidYMid slice">
          {/* Engineering CAD Grid */}
          <g className="art-stroke" strokeWidth="1" opacity=".35">
            <path d="M0 70H720M0 140H720M0 210H720M0 280H720M0 350H720" />
            <path d="M120 0V420M240 0V420M360 0V420M480 0V420M600 0V420" />
          </g>

          {/* Turbomixer Aeration Vessel (Left) */}
          <g className="art-stroke" strokeWidth="2" opacity=".8">
            <rect x="50" y="110" width="110" height="180" rx="20" />
            {/* Impeller shaft & blades */}
            <line x1="105" y1="70" x2="105" y2="250" strokeWidth="3" />
            <ellipse cx="105" cy="180" rx="35" ry="12" />
            <ellipse cx="105" cy="230" rx="30" ry="10" />
            {/* Motor head */}
            <rect x="85" y="60" width="40" height="40" rx="4" className="art-fill" />
            {/* Aeration pressure line into oven */}
            <path d="M160 250H230V270H270" strokeWidth="2.5" strokeDasharray="4 3" />
          </g>

          {/* Continuous Tunnel Baking Oven Envelope (Right) */}
          <g className="art-stroke" strokeWidth="2.5">
            <rect x="270" y="150" width="410" height="150" rx="10" />
            {/* Conveyor Bed */}
            <line x1="250" y1="260" x2="700" y2="260" strokeWidth="3" />
            <line x1="250" y1="270" x2="700" y2="270" strokeWidth="1" strokeDasharray="6 4" />
          </g>

          {/* Oven 3-Zone PID Burner Curves */}
          <path
            className="art-stroke"
            d="M280 230 C320 170 380 160 430 180 C480 200 540 215 620 225 C650 230 670 240 680 245"
            strokeWidth="3"
            stroke="#de9b35"
          />
          {/* Burner Nozzles */}
          <g className="art-fill" opacity=".9">
            <circle cx="330" cy="170" r="8" />
            <circle cx="410" cy="175" r="8" />
            <circle cx="490" cy="195" r="8" />
            <circle cx="570" cy="210" r="8" />
            <circle cx="640" cy="225" r="8" />
          </g>

          {/* Technical Annotations */}
          <g className="art-stroke" strokeWidth="1" opacity=".7">
            <text x="60" y="320" fill="#eeece5" fontSize="11" fontFamily="monospace">
              TURBOMIXER (57d)
            </text>
            <text x="310" y="135" fill="#c4a160" fontSize="11" fontFamily="monospace">
              ZONE 1: 160°C
            </text>
            <text x="470" y="135" fill="#c4a160" fontSize="11" fontFamily="monospace">
              ZONE 2: 125°C
            </text>
            <text x="590" y="135" fill="#c4a160" fontSize="11" fontFamily="monospace">
              ZONE 3: 95°C
            </text>
          </g>
        </svg>
      )}

      {/* 02. Goodvalley: High-Speed Food Processing & Sensor De-Jitter Schematic */}
      {isGoodvalley && (
        <svg viewBox="0 0 720 420" fill="none" preserveAspectRatio="xMidYMid slice">
          {/* Industrial Factory Grid */}
          <g className="art-stroke" strokeWidth="1" opacity=".35">
            <path d="M0 100H720M0 200H720M0 300H720" />
            <path d="M140 0V420M280 0V420M420 0V420M560 0V420" />
          </g>

          {/* Conveyor Line Structure */}
          <g className="art-stroke" strokeWidth="3">
            <line x1="30" y1="260" x2="690" y2="260" />
            <line x1="30" y1="285" x2="690" y2="285" strokeWidth="1.5" />
            {/* Conveyor Rollers */}
            <circle cx="60" cy="272" r="10" />
            <circle cx="180" cy="272" r="10" />
            <circle cx="300" cy="272" r="10" />
            <circle cx="420" cy="272" r="10" />
            <circle cx="540" cy="272" r="10" />
            <circle cx="660" cy="272" r="10" />
          </g>

          {/* Conveyor Packages moving */}
          <g className="art-fill" opacity=".7">
            <rect x="80" y="210" width="50" height="45" rx="4" />
            <rect x="200" y="210" width="50" height="45" rx="4" />
            <rect x="330" y="210" width="50" height="45" rx="4" />
            <rect x="560" y="210" width="50" height="45" rx="4" />
          </g>

          {/* Optical Sensor Station with De-Jitter Beam */}
          <g className="art-stroke" strokeWidth="2">
            <rect x="310" y="90" width="90" height="70" rx="8" className="art-fill" />
            <line x1="355" y1="160" x2="355" y2="258" strokeWidth="2.5" stroke="#a7c3e8" strokeDasharray="3 3" />
            <circle cx="355" cy="260" r="5" fill="#a7c3e8" />
          </g>

          {/* Oscilloscope Waveform: Jitter (Top) vs Filtered S7 (Bottom) */}
          <g className="art-stroke" strokeWidth="2">
            {/* Raw Jitter wave */}
            <path
              d="M440 95 L460 95 L465 75 L470 115 L475 80 L480 110 L485 95 L520 95"
              stroke="#f87171"
              strokeWidth="2"
            />
            {/* S7 Filtered Clean wave */}
            <path
              d="M440 145 L465 145 L465 120 L505 120 L505 145 L530 145"
              stroke="#4ade80"
              strokeWidth="2.5"
            />
          </g>

          {/* Wireless ESP-NOW Mesh Node & Antenna */}
          <g className="art-stroke" strokeWidth="2">
            <rect x="600" y="100" width="70" height="55" rx="6" />
            <line x1="635" y1="100" x2="635" y2="70" strokeWidth="2.5" />
            <path d="M625 65 A12 12 0 0 1 645 65" strokeWidth="1.5" />
            <path d="M618 58 A22 22 0 0 1 652 58" strokeWidth="1.5" />
          </g>

          {/* Labels */}
          <text x="315" y="115" fill="#a7c3e8" fontSize="10" fontFamily="monospace">
            OPTICAL SENSOR
          </text>
          <text x="315" y="132" fill="#eeece5" fontSize="10" fontFamily="monospace">
            %I0.3 DEBOUNCE
          </text>
          <text x="440" y="65" fill="#f87171" fontSize="9" fontFamily="monospace">
            RAW JITTER (STOPPAGE)
          </text>
          <text x="440" y="165" fill="#4ade80" fontSize="9" fontFamily="monospace">
            S7 FILTERED (99.4%)
          </text>
          <text x="605" y="175" fill="#c4a160" fontSize="10" fontFamily="monospace">
            ESP-NOW &lt;10ms
          </text>
        </svg>
      )}

      {/* 03. WFM & MES: Factory Digital Twin & Shopfloor Canvas Grid */}
      {isMES && (
        <svg viewBox="0 0 720 420" fill="none" preserveAspectRatio="xMidYMid slice">
          {/* Workshop CAD Grid */}
          <g className="art-stroke" strokeWidth="1" opacity=".35">
            <path d="M0 60H720M0 120H720M0 180H720M0 240H720M0 300H720M0 360H720" />
            <path d="M60 0V420M120 0V420M180 0V420M240 0V420M300 0V420M360 0V420M420 0V420M480 0V420M540 0V420M600 0V420M660 0V420" />
          </g>

          {/* Machine Station Envelopes */}
          <g className="art-stroke" strokeWidth="2">
            {/* CNC Mill 01 */}
            <rect x="70" y="100" width="140" height="100" rx="8" className="art-fill" />
            <circle cx="140" cy="150" r="28" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="140" cy="150" r="8" fill="#c4a160" />

            {/* CNC Mill 02 */}
            <rect x="290" y="100" width="140" height="100" rx="8" className="art-fill" />
            <circle cx="360" cy="150" r="28" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="360" cy="150" r="8" fill="#c4a160" />

            {/* Fiber Laser Station */}
            <rect x="510" y="100" width="150" height="100" rx="8" className="art-fill" />
            <line x1="530" y1="120" x2="640" y2="180" strokeWidth="2" stroke="#f59e0b" />
            <line x1="530" y1="180" x2="640" y2="120" strokeWidth="2" stroke="#f59e0b" />

            {/* Manual Workstation & QC */}
            <rect x="180" y="270" width="160" height="85" rx="8" />
            <rect x="420" y="270" width="160" height="85" rx="8" />
          </g>

          {/* Real-Time Dispatch Vectors (Order Flow Lines) */}
          <g className="art-stroke" strokeWidth="2" strokeDasharray="4 4" opacity=".8">
            <path d="M140 200 V235 H260 V270" stroke="#34d399" />
            <path d="M360 200 V235 H500 V270" stroke="#34d399" />
            <path d="M585 200 V235 H500" stroke="#34d399" />
            <path d="M500 355 V390 H680" stroke="#c4a160" />
          </g>

          {/* Labels */}
          <text x="80" y="125" fill="#eeece5" fontSize="10" fontFamily="monospace">
            CNC-01 [12,000 RPM]
          </text>
          <text x="300" y="125" fill="#eeece5" fontSize="10" fontFamily="monospace">
            CNC-02 [ACTIVE]
          </text>
          <text x="520" y="125" fill="#eeece5" fontSize="10" fontFamily="monospace">
            FIBER LASER [84%]
          </text>
          <text x="195" y="295" fill="#eeece5" fontSize="10" fontFamily="monospace">
            ASSEMBLY BENCH
          </text>
          <text x="435" y="295" fill="#eeece5" fontSize="10" fontFamily="monospace">
            QC INSPECTION
          </text>
          <text x="540" y="380" fill="#c4a160" fontSize="11" fontFamily="monospace">
            SLA &lt;12h DISPATCH ↗
          </text>
        </svg>
      )}

      {/* 04. Distributed Embedded Mesh: ESP32-C6 P2P Network Topology */}
      {isMesh && (
        <svg viewBox="0 0 720 420" fill="none" preserveAspectRatio="xMidYMid slice">
          {/* RF Radial Wave Rings */}
          <g className="art-stroke" strokeWidth="1" opacity=".35">
            <circle cx="360" cy="210" r="60" />
            <circle cx="360" cy="210" r="120" />
            <circle cx="360" cy="210" r="190" />
            <circle cx="360" cy="210" r="260" />
          </g>

          {/* Dynamic Mesh Nodes */}
          <g className="art-stroke" strokeWidth="3">
            {/* Primary Mesh P2P Links */}
            <path d="M120 280 L280 140 L360 270 L520 130 L620 280" strokeWidth="3" />
            {/* Cross-mesh redundant failover links (Self-Healing) */}
            <path d="M120 280 L360 270 L620 280" strokeWidth="1.5" strokeDasharray="6 4" opacity=".6" />
            <path d="M280 140 L520 130" strokeWidth="2" strokeDasharray="6 4" opacity=".8" />
          </g>

          {/* Microcontroller Node IC Envelopes */}
          <g className="art-fill">
            {/* Node 1 */}
            <rect x="96" y="256" width="48" height="48" rx="8" />
            {/* Node 2 */}
            <rect x="256" y="116" width="48" height="48" rx="8" />
            {/* Center Gateway */}
            <rect x="334" y="244" width="52" height="52" rx="10" stroke="#4ade80" strokeWidth="2" />
            {/* Node 4 */}
            <rect x="496" y="106" width="48" height="48" rx="8" />
            {/* Node 5 */}
            <rect x="596" y="256" width="48" height="48" rx="8" />
          </g>

          {/* Animated/Simulated Transmit Signal Dots */}
          <circle cx="200" cy="210" r="5" fill="#34d399" />
          <circle cx="440" cy="200" r="5" fill="#34d399" />
          <circle cx="400" cy="135" r="4" fill="#c4a160" />

          {/* Node Labels */}
          <text x="80" y="325" fill="#97d3c6" fontSize="10" fontFamily="monospace">
            ESP32-C6 [NODE A]
          </text>
          <text x="240" y="100" fill="#97d3c6" fontSize="10" fontFamily="monospace">
            ESP32-C6 [NODE B]
          </text>
          <text x="320" y="318" fill="#4ade80" fontSize="11" fontFamily="monospace" fontWeight="bold">
            GATEWAY [RPI2]
          </text>
          <text x="480" y="90" fill="#97d3c6" fontSize="10" fontFamily="monospace">
            ESP32-C6 [NODE C]
          </text>
          <text x="580" y="325" fill="#97d3c6" fontSize="10" fontFamily="monospace">
            RS485 BRIDGE [NODE D]
          </text>
        </svg>
      )}
    </div>
  );
}
