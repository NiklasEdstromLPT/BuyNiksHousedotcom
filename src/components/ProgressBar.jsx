import { useEffect, useState } from 'react';

export default function ProgressBar({ currentStep, totalSteps = 5 }) {
  const [animatedStep, setAnimatedStep] = useState(currentStep);

  useEffect(() => {
    // Small delay so the fill animation plays after mount
    const timer = setTimeout(() => setAnimatedStep(currentStep), 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="flex items-center gap-2 px-6 py-5">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isDone = step < animatedStep;
        const isActive = step === animatedStep;
        // The line between step and step+1 should fill when step+1 becomes active/done
        const lineFilled = step < animatedStep;

        return (
          <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
            {/* Dot */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-500 ${
                isDone
                  ? 'bg-navy text-white'
                  : isActive
                  ? 'bg-gold text-navy scale-110'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isDone ? '✓' : step}
            </div>
            {/* Line */}
            {step < totalSteps && (
              <div className="h-0.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-navy rounded-full transition-all duration-500 ease-out"
                  style={{ width: lineFilled ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
