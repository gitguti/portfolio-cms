'use client';

// ─── Data ──────────────────────────────────────────────────────────────────────

const METRICS = [
  { value: '1,756', label: 'interactions over 6 months' },
  { value: '118', label: 'active days in the last 30' },
  { value: '15', label: 'unique AI routes used' },
] as const;

// Weekly representative points — enough texture to show character, smooth enough to read clean.
// Each month has ~5 points. X is normalised 0–5 (one unit per month).
// Nov–Dec: volatile 10–42 | Jan–Feb: flat 12–28 | Mar: elevated 32–50 | Apr: climbs to 64
const CHART_POINTS: { x: number; v: number }[] = [
  // Nov
  { x: 0.0, v: 14 },
  { x: 0.2, v: 38 },
  { x: 0.4, v: 18 },
  { x: 0.6, v: 42 },
  { x: 0.8, v: 22 },
  // Dec
  { x: 1.0, v: 35 },
  { x: 1.2, v: 12 },
  { x: 1.4, v: 40 },
  { x: 1.6, v: 16 },
  { x: 1.8, v: 38 },
  // Jan
  { x: 2.0, v: 20 },
  { x: 2.2, v: 14 },
  { x: 2.4, v: 26 },
  { x: 2.6, v: 16 },
  { x: 2.8, v: 22 },
  // Feb
  { x: 3.0, v: 18 },
  { x: 3.2, v: 28 },
  { x: 3.4, v: 12 },
  { x: 3.6, v: 24 },
  { x: 3.8, v: 16 },
  // Mar (agentic v2 — jumps up)
  { x: 4.0, v: 38 },
  { x: 4.2, v: 44 },
  { x: 4.4, v: 36 },
  { x: 4.6, v: 50 },
  { x: 4.8, v: 40 },
  // Apr (peak 64)
  { x: 5.0, v: 46 },
  { x: 5.2, v: 54 },
  { x: 5.4, v: 42 },
  { x: 5.6, v: 64 },
  { x: 5.8, v: 52 },
];

const MONTH_LABELS = [
  { label: 'Nov', x: 0 },
  { label: 'Dec', x: 1 },
  { label: 'Jan', x: 2 },
  { label: 'Feb', x: 3 },
  { label: 'Mar', x: 4 },
  { label: 'Apr', x: 5 },
];

const USAGE_CLUSTERS = [
  { name: 'Requirement breakdown', count: 246 },
  { name: 'Splitting & merging', count: 24 },
  { name: 'Analysis', count: 18 },
  { name: 'State diagram', count: 15 },
  { name: 'Language quality', count: 14 },
  { name: 'Continue iterating', count: 10 },
] as const;

const TRACE_ITEMS = [
  { time: '07:43', action: 'improve_description' },
  { time: '08:08', action: 'set_new_requirement' },
  { time: '08:18', action: 'feedback' },
  { time: '08:21', action: 'improve_description' },
  { time: '08:27', action: 'set_new_requirement' },
] as const;

// ─── Shared style constants ────────────────────────────────────────────────────

const EYEBROW = 'text-[11px] uppercase tracking-[0.08em] text-zinc-400 font-medium';
const CELL_BASE = 'rounded-[14px]';

const ACCENT = '#7F77DD';
const ACCENT_BG = '#EEEDFE';
const ACCENT_DARK = '#26215C';
const ACCENT_MID = '#3C3489';
const ACCENT_LIGHT = '#534AB7';

// ─── Cell A: Adoption ──────────────────────────────────────────────────────────

function CellAdoption() {
  return (
    <div className="flex flex-col gap-3">
      <p className={EYEBROW}>Adoption</p>
      {METRICS.map(({ value, label }) => (
        <div
          key={label}
          className={`${CELL_BASE} flex flex-col gap-1 border border-black/[0.06] bg-white px-5 py-4`}
        >
          <p
            className="font-medium leading-none"
            style={{ fontSize: 44, letterSpacing: '-0.02em', color: '#111111' }}
          >
            {value}
          </p>
          <p className="text-[13px]" style={{ color: '#6B7280' }}>
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Cell B: Usage Over Time ───────────────────────────────────────────────────

function CellUsage() {
  const W = 320;
  const H = 110;
  const PAD_TOP = 18;
  const PAD_BOTTOM = 20;
  const PAD_LEFT = 8;
  const PAD_RIGHT = 14;
  const CHART_W = W - PAD_LEFT - PAD_RIGHT;
  const CHART_H = H - PAD_TOP - PAD_BOTTOM;
  const baseline = H - PAD_BOTTOM;

  const maxX = Math.max(...CHART_POINTS.map(p => p.x));
  const maxV = Math.max(...CHART_POINTS.map(p => p.v));

  const svgX = (x: number) => PAD_LEFT + (x / maxX) * CHART_W;
  const svgY = (v: number) => PAD_TOP + CHART_H - (v / maxV) * CHART_H;

  const pts = CHART_POINTS.map(p => ({ x: svgX(p.x), y: svgY(p.v) }));

  // Smooth cubic bezier — tension 0.4 gives enough curve to feel organic but not wiggly
  let linePath = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const t = 0.4;
    const cpx = prev.x + (curr.x - prev.x) * t;
    linePath += ` C ${cpx},${prev.y} ${curr.x - (curr.x - prev.x) * t},${curr.y} ${curr.x},${
      curr.y
    }`;
  }

  const areaPath = `${linePath} L ${pts[pts.length - 1].x},${baseline} L ${pts[0].x},${baseline} Z`;

  const peakRaw = CHART_POINTS.reduce((a, b) => (b.v > a.v ? b : a));
  const peakSvg = { x: svgX(peakRaw.x), y: svgY(peakRaw.v) };

  const agenticX = svgX(4); // March boundary

  return (
    <div className={`${CELL_BASE} flex flex-col gap-3 border border-black/[0.06] bg-white p-5`}>
      <div className="flex items-baseline justify-between">
        <p className={EYEBROW}>Usage over time</p>
        <span className="text-[11px] text-zinc-400">Nov–Apr</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Smoothed line chart showing interaction patterns Nov 2025–Apr 2026. Volatile Nov–Dec peaking at 42, flat Jan–Feb ~20, strong Mar ~40 after agentic v2 launch, peak 64 in Apr."
      >
        <defs>
          <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.15" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.01" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#usageGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Agentic v2 marker */}
        <line
          x1={agenticX}
          y1={PAD_TOP - 4}
          x2={agenticX}
          y2={baseline}
          stroke={ACCENT}
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeOpacity="0.35"
        />
        <rect
          x={agenticX - 28}
          y={0}
          width={56}
          height={14}
          rx={7}
          fill={ACCENT}
          fillOpacity="0.12"
        />
        <text x={agenticX} y={10} fontSize="8.5" fill={ACCENT} textAnchor="middle" fontWeight="500">
          agentic v2
        </text>

        {/* Peak dot (global) */}
        <circle cx={peakSvg.x} cy={peakSvg.y} r="4" fill="white" stroke={ACCENT} strokeWidth="2" />

        {/* Per-month peak labels */}
        {MONTH_LABELS.map(({ x: monthX }, i) => {
          const nextX = i < MONTH_LABELS.length - 1 ? MONTH_LABELS[i + 1].x : monthX + 1;
          const monthPeak = CHART_POINTS.filter(p => p.x >= monthX && p.x < nextX).reduce((a, b) =>
            b.v > a.v ? b : a,
          );
          const mx = svgX(monthPeak.x);
          const my = svgY(monthPeak.v);
          const isGlobal = monthPeak.v === maxV;
          return (
            <text
              key={i}
              x={mx}
              y={my - 7}
              fontSize="9"
              fill={isGlobal ? ACCENT : '#A1A1AA'}
              textAnchor="middle"
              fontWeight={isGlobal ? '600' : '400'}
            >
              {monthPeak.v}
            </text>
          );
        })}

        {/* X-axis month labels */}
        {MONTH_LABELS.map(({ label, x }, i) => (
          <text
            key={label}
            x={svgX(x)}
            y={H}
            fontSize="10"
            fill="#A1A1AA"
            textAnchor={i === 0 ? 'start' : i === MONTH_LABELS.length - 1 ? 'end' : 'middle'}
          >
            {label}
          </text>
        ))}
      </svg>
      <p className="text-[11px] leading-relaxed text-zinc-400">
        Weekly samples · peaks and troughs reflect daily variance
      </p>
    </div>
  );
}

// ─── Cell D: Interaction Trace ─────────────────────────────────────────────────

function CellTrace() {
  return (
    <div
      className={`${CELL_BASE} flex flex-col justify-between gap-4 border border-black/[0.06] bg-white p-5`}
    >
      <div className="flex flex-col gap-4">
        <p className={EYEBROW}>One requirement, multiple prompts</p>
        <div className="relative flex flex-col gap-2.5">
          <div className="absolute bottom-[6px] left-[3px] top-[6px] w-px bg-zinc-200" />
          {TRACE_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="z-10 h-[7px] w-[7px] flex-shrink-0 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="flex-shrink-0 text-[11px] tabular-nums text-zinc-400"
                style={{ fontFamily: 'var(--font-mono, monospace)', minWidth: 36 }}
              >
                {item.time}
              </span>
              <span
                className="flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] text-zinc-600"
                style={{ background: '#F4F4F5' }}
              >
                {item.action}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[12px] leading-relaxed" style={{ color: '#6B7280' }}>
        40 minutes, 5 prompts — the assistant became part of the iteration loop.
      </p>
    </div>
  );
}

// ─── Cell C: Usage Clusters ────────────────────────────────────────────────────

function CellClusters() {
  return (
    <div
      className={`${CELL_BASE} flex flex-col gap-3 border border-black/[0.06] bg-white px-5 py-4`}
    >
      <p className={EYEBROW}>What users ask for</p>
      <div className="flex flex-col divide-y divide-zinc-100">
        {USAGE_CLUSTERS.map(({ name, count }, idx) => (
          <div key={name} className="flex items-baseline justify-between py-1.5">
            <span
              className="text-[13px]"
              style={{
                color: idx === 0 ? '#111111' : '#6B7280',
                fontWeight: idx === 0 ? 500 : 400,
              }}
            >
              {name}
            </span>
            <span
              className="ml-3 flex-shrink-0 text-[13px] tabular-nums"
              style={{ color: idx === 0 ? ACCENT : '#A1A1AA', fontWeight: idx === 0 ? 500 : 400 }}
            >
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function ValidationBentoDemo() {
  return (
    <div
      className="overflow-hidden rounded-2xl p-0"
      style={{ background: '#F7F7F8' }}
      aria-label="Validation summary: 1,756 interactions over 6 months across 118 active days, top user requests focused on understanding rather than generation, with engineers iterating on the same requirement multiple times"
    >
      <div className="flex flex-col gap-3 p-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1.2fr]">
          {/* Left column: adoption metrics + clusters */}
          <div className="flex flex-col gap-3">
            <CellAdoption />
            <CellClusters />
          </div>
          {/* Right column: usage chart + trace */}
          <div className="flex flex-col gap-3">
            <CellUsage />
            <CellTrace />
          </div>
        </div>
      </div>
    </div>
  );
}
