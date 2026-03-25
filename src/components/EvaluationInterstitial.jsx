import { useState, useEffect, useRef } from 'react';

const LINES = [
  { text: '> Locating property details for {address}...', style: 'prompt' },
  { text: '  Querying county assessor records...', style: 'dim' },
  { text: '✓ Property found. Parcel ID confirmed.', style: 'check' },
  { text: '> Checking public records...', style: 'prompt' },
  { text: '  Cross-referencing ownership and title history...', style: 'dim' },
  { text: '✓ Ownership and property profile confirmed.', style: 'check' },
  { text: '> Running market alignment check...', style: 'prompt' },
  { text: '  Analyzing current buyer demand in ZIP {zip}...', style: 'dim' },
  { text: '✓ {alignment}', style: 'check' },
  { text: '', style: 'blank' },
  { text: "  Let's confirm a few details to continue.", style: 'result' },
];

const ALIGNMENT_TEXT = {
  strong: 'Initial screening complete — strong alignment with current buying criteria.',
  within: 'Initial screening complete — within current buying criteria.',
  additional: 'Initial screening complete — additional details required to confirm alignment.',
};

export default function EvaluationInterstitial({ address, zip, alignmentTier = 'strong', onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const completeCalled = useRef(false);

  const resolvedLines = LINES.map((line) => ({
    ...line,
    text: line.text
      .replace('{address}', address || '123 Main St')
      .replace('{zip}', zip || '00000')
      .replace('{alignment}', ALIGNMENT_TEXT[alignmentTier] || ALIGNMENT_TEXT.strong),
  }));

  // Animate lines appearing one at a time
  useEffect(() => {
    if (visibleLines < resolvedLines.length) {
      const delay = resolvedLines[visibleLines].style === 'blank' ? 300 : 400;
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(timer);
    } else if (!completeCalled.current) {
      completeCalled.current = true;
      const timer = setTimeout(() => {
        console.log('EVENT:', { stage: 'stage_3', action: 'interstitial_complete', timestamp: Date.now() });
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, resolvedLines.length, onComplete]);

  const STYLE_MAP = {
    prompt: 'text-terminal-green',
    dim: 'text-terminal-grey',
    check: 'text-terminal-green-bright',
    blank: '',
    result: 'text-gray-300',
  };

  return (
    <div className="min-h-screen bg-terminal-bg flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg font-mono text-[13px] leading-relaxed">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-bold text-terminal-green tracking-[2px] uppercase">BMH / EVAL</span>
          <span className="text-terminal-green opacity-30 text-xl">|</span>
          <span className="text-[11px] text-terminal-green opacity-60">LPT Market Intelligence v2.1</span>
        </div>

        {/* Terminal Lines */}
        <div className="flex flex-col gap-1.5">
          {resolvedLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={STYLE_MAP[line.style]}>
              {line.text}
            </div>
          ))}
        </div>

        {/* Blinking cursor while lines are still appearing */}
        {visibleLines < resolvedLines.length && (
          <span className="inline-block w-[9px] h-3.5 bg-terminal-green mt-2 animate-pulse" />
        )}
      </div>
    </div>
  );
}
