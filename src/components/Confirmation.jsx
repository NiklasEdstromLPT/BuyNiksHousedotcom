export default function Confirmation({ address, qualification, identity, property }) {
  const firstName = identity?.firstName || '';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navy Hero Banner */}
      <div
        className="px-6 py-12 md:py-14 text-center"
        style={{ background: 'linear-gradient(135deg, #1B2B4B 60%, #2d4a70)' }}
      >
        {/* Green Check Circle */}
        <div className="w-16 h-16 rounded-full bg-terminal-green mx-auto mb-5 flex items-center justify-center text-2xl text-white">
          ✓
        </div>
        <h1 className="text-[28px] font-extrabold text-white mb-2.5">
          You&rsquo;re Confirmed{firstName ? `, ${firstName}` : ''}.
        </h1>
        <p className="text-[15px] text-light-blue max-w-md mx-auto leading-relaxed">
          Jennifer Caldwell will reach out within 48 hours to review your assessment and walk you through your options.
        </p>
      </div>

      {/* Next Steps */}
      <div className="px-6 py-9 max-w-xl mx-auto w-full">
        <h2 className="text-base font-bold text-navy mb-5 text-center">What Happens Next</h2>

        <div className="flex flex-col gap-4.5">
          <NextStep
            number={1}
            title="Personal Review"
            desc="Jennifer reviews your property profile and pulls live comparable sales for your neighbourhood."
          />
          <NextStep
            number={2}
            title="Your Options Call"
            desc="She'll present you with both a Certainty Path (cash offer) and Market Path (listing) — you decide which fits your situation."
          />
          <NextStep
            number={3}
            title="In-Person Walk-Through"
            desc="Optional on-site visit to verify condition and finalize any offer details."
          />
        </div>

        {/* Property Summary Card */}
        {property && (
          <div className="bg-card-bg rounded-lg border border-gray-200 p-5 mt-8">
            <h3 className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-3">Your Property Summary</h3>
            <p className="text-sm font-semibold text-navy">{property.normalizedAddress}</p>
            <p className="text-xs text-gray-400 mt-1">
              {property.beds} bed · {property.baths} bath · {property.sqft?.toLocaleString()} sqft · Built {property.yearBuilt}
            </p>
            {(qualification?.condition || qualification?.timeline || qualification?.occupancy) && (
              <div className="border-t border-gray-200 mt-3 pt-3 grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs">
                {qualification.condition && (
                  <>
                    <span className="text-gray-400">Condition</span>
                    <span className="text-gray-700 font-medium">{qualification.condition}</span>
                  </>
                )}
                {qualification.timeline && (
                  <>
                    <span className="text-gray-400">Timeline</span>
                    <span className="text-gray-700 font-medium">{qualification.timeline}</span>
                  </>
                )}
                {qualification.occupancy && (
                  <>
                    <span className="text-gray-400">Occupancy</span>
                    <span className="text-gray-700 font-medium">{qualification.occupancy}</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Assessment info */}
        <p className="text-sm text-gray-400 text-center mt-6">
          The assessment takes 20–30 minutes. No obligation, no cost.
        </p>
        <p className="text-xs text-gray-300 text-center mt-3">
          Questions? Call or text us at [LPT phone placeholder]
        </p>
      </div>
    </div>
  );
}

function NextStep({ number, title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-navy text-gold flex items-center justify-center text-sm font-bold shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-sm font-bold text-navy mb-0.5">{title}</h3>
        <p className="text-[13px] text-gray-500 leading-snug">{desc}</p>
      </div>
    </div>
  );
}
