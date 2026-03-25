export default function ProgressBar({ currentStep, totalSteps = 5 }) {
  return (
    <div className="flex items-center gap-2 px-6 py-5">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isDone = step < currentStep;
        const isActive = step === currentStep;
        return (
          <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
            {/* Dot */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                isDone
                  ? 'bg-navy text-white'
                  : isActive
                  ? 'bg-gold text-navy'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isDone ? '✓' : step}
            </div>
            {/* Line */}
            {step < totalSteps && (
              <div
                className={`h-0.5 flex-1 ${
                  isDone ? 'bg-navy' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
