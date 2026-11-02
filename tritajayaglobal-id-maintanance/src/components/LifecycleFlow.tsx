const steps = ['Install', 'Commission', 'Maintain', 'Repair', 'Retrofit']

interface LifecycleFlowProps {
  current?: string
}

export function LifecycleFlow({ current = 'Maintain' }: LifecycleFlowProps) {
  return (
    <ol className="flow" aria-label="Service lifecycle">
      {steps.map((step) => (
        <li
          key={step}
          className="flow-step"
          data-current={step === current || undefined}
        >
          {step}
        </li>
      ))}
    </ol>
  )
}
