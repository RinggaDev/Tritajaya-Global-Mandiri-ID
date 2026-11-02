import { useId } from 'react'

export function HeroDiagram() {
  const titleId = useId()
  const descId = useId()
  const steps = ['Install', 'Commission', 'Maintain', 'Repair', 'Retrofit']

  return (
    <svg
      viewBox="0 0 420 320"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className="w-full"
    >
      <title id={titleId}>VRF lifecycle diagram</title>
      <desc id={descId}>
        Five connected stages: install, commission, maintain, repair, and
        retrofit.
      </desc>

      <line
        x1="40"
        y1="70"
        x2="380"
        y2="70"
        stroke="var(--color-neutral-300)"
        strokeWidth="2"
      />
      <line
        x1="40"
        y1="70"
        x2="40"
        y2="250"
        stroke="var(--color-neutral-300)"
        strokeWidth="2"
      />
      <line
        x1="380"
        y1="70"
        x2="380"
        y2="250"
        stroke="var(--color-neutral-300)"
        strokeWidth="2"
      />

      <rect
        x="28"
        y="58"
        width="24"
        height="24"
        fill="var(--color-action)"
        rx="4"
      />
      <rect
        x="368"
        y="58"
        width="24"
        height="24"
        fill="var(--color-neutral-0)"
        stroke="var(--color-neutral-500)"
        strokeWidth="2"
        rx="4"
      />

      <rect
        x="120"
        y="46"
        width="80"
        height="48"
        fill="var(--color-neutral-0)"
        stroke="var(--color-neutral-500)"
        strokeWidth="2"
        rx="6"
      />
      <rect
        x="220"
        y="46"
        width="80"
        height="48"
        fill="var(--color-neutral-0)"
        stroke="var(--color-neutral-500)"
        strokeWidth="2"
        rx="6"
      />

      <rect
        x="28"
        y="190"
        width="80"
        height="48"
        fill="var(--color-neutral-0)"
        stroke="var(--color-neutral-500)"
        strokeWidth="2"
        rx="6"
      />
      <rect
        x="128"
        y="190"
        width="80"
        height="48"
        fill="var(--color-neutral-0)"
        stroke="var(--color-neutral-500)"
        strokeWidth="2"
        rx="6"
      />
      <rect
        x="312"
        y="190"
        width="80"
        height="48"
        fill="var(--color-neutral-0)"
        stroke="var(--color-neutral-500)"
        strokeWidth="2"
        rx="6"
      />

      {steps.map((step, index) => {
        const positions = [
          [60, 78],
          [160, 78],
          [260, 78],
          [68, 218],
          [352, 218],
        ]
        const [x, y] = positions[index]
        return (
          <text
            key={step}
            x={x}
            y={y}
            textAnchor="middle"
            fill="var(--color-text)"
            fontFamily="var(--font-body)"
            fontSize="13"
            fontWeight="600"
          >
            {step}
          </text>
        )
      })}

      <text
        x="210"
        y="300"
        textAnchor="middle"
        fill="var(--color-text-muted)"
        fontFamily="var(--font-body)"
        fontSize="12"
      >
        One record across the whole system
      </text>
    </svg>
  )
}
