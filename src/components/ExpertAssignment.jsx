import { useState, useEffect } from 'react';

export default function ExpertAssignment({ onContinue, property }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const city = property?.city || 'your area';

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 text-center">
        {loading ? (
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-gold rounded-full animate-pulse" />
            <span className="text-gray-400 text-sm">Matching you with a local expert…</span>
          </div>
        ) : (
          <div className="w-full max-w-xl flex flex-col items-center gap-6">
            <p className="text-[11px] tracking-[3px] uppercase text-gold">Your Dedicated Expert</p>

            <h1 className="text-2xl font-extrabold text-navy">
              Meet Your Local Assessment Specialist
            </h1>
            <p className="text-sm text-gray-400">
              Selected based on your ZIP code, property type, and market conditions in {city}.
            </p>

            {/* Agent Card */}
            <div className="flex items-start gap-6 bg-card-bg rounded-xl p-6 border border-gray-200 text-left max-w-lg w-full">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2d4a70] to-navy flex items-center justify-center text-3xl text-gold shrink-0">
                👤
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-extrabold text-navy">Jennifer Caldwell</h2>
                <p className="text-xs uppercase tracking-wider text-gold font-bold mb-2">
                  LPT Certified Assessment Specialist
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span><strong className="text-navy">94</strong> homes assessed</span>
                  <span><strong className="text-navy">8 yrs</strong> {city} market</span>
                  <span><strong className="text-navy">4.9★</strong> seller rating</span>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mt-2.5">
                  Jennifer specialises in {city} residential sales. She&rsquo;ll personally review your home
                  profile and contact you with your market assessment options.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3.5">
              <button
                onClick={() => {
                  console.log('EVENT:', { stage: 'stage_6', action: 'expert_confirmed', timestamp: Date.now() });
                  onContinue();
                }}
                className="bg-navy text-white px-7 py-3.5 rounded-md font-bold text-sm hover:bg-navy/90 transition-colors cursor-pointer"
              >
                Confirm &amp; Continue →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
