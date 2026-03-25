export default function TrustLayer({ variant = 'A', onScrollToCTA }) {
  return (
    <section className="bg-white">
      {/* Stats Strip */}
      <div className="bg-card-bg border-b border-gray-200 px-6 py-8 flex flex-wrap justify-around text-center gap-6">
        <Stat number="2,400+" label="Homes Assessed" />
        <Stat number="$1.2B" label="Total Value Assessed" />
        <Stat number="48 hrs" label="Avg. First Contact" />
        <Stat number="4.9★" label="Seller Satisfaction" />
      </div>

      {/* How It Works */}
      <div className="px-6 md:px-12 py-10">
        <p className="text-[11px] tracking-[3px] uppercase text-gold mb-3">Process</p>
        <h2 className="text-2xl font-bold text-navy mb-7">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Step number={1} title="Enter Your Address" desc="Takes 60 seconds. We pull live market data for your property." />
          <Step
            number={2}
            title="We Match You to an Expert"
            desc={
              variant === 'A'
                ? 'A local LPT-certified agent reviews your home\'s profile.'
                : 'A Professional Property Assessment of your home is conducted.'
            }
          />
          <Step number={3} title="Get Your Options" desc="Cash offer or full market listing — you choose what fits your life." />
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-6 md:px-12 py-10 bg-card-bg">
        <p className="text-[11px] tracking-[3px] uppercase text-gold mb-3 text-center">What Homeowners Say</p>
        <h2 className="text-2xl font-bold text-navy mb-8 text-center">Real Experiences From Real Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <Testimonial
            quote="The process was straightforward and respectful. They gave us real options and we never felt pressured. It was exactly what we needed during a difficult time."
            reviewer="Sandra M."
            location="Phoenix, AZ"
          />
          <Testimonial
            quote="I filled out the form on a Tuesday. By Thursday I had a real number from a real person — not a robot. That's what sold me on moving forward."
            reviewer="David R."
            location="Austin, TX"
          />
          <Testimonial
            quote="We weren't sure if selling made sense yet, but the assessment gave us clarity. No pressure, no gimmicks — just honest information from a local expert."
            reviewer="Kevin & Trish O."
            location="Tampa, FL"
          />
        </div>
      </div>

      {/* Sticky CTA Bar */}
      <div className="bg-navy px-6 md:px-12 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-lg font-bold text-white text-center md:text-left">
          Ready to see what your home is worth?
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gold text-navy px-7 py-3.5 rounded-md font-bold text-sm hover:brightness-110 transition-all cursor-pointer"
        >
          Get My Assessment →
        </button>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="text-3xl font-extrabold text-navy">{number}</div>
      <div className="text-xs text-gray-500 tracking-wide uppercase mt-1">{label}</div>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center font-extrabold text-base mb-3">
        {number}
      </div>
      <h3 className="text-sm font-bold text-navy mb-1.5">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Testimonial({ quote, reviewer, location }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col">
      {/* Large quote mark */}
      <span className="text-3xl leading-none text-gold/40 font-serif mb-2">&ldquo;</span>
      <p className="text-[13px] text-gray-600 leading-relaxed flex-1">{quote}</p>
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
        {/* Avatar initial */}
        <div className="w-9 h-9 rounded-full bg-navy/10 text-navy font-bold text-sm flex items-center justify-center shrink-0">
          {reviewer.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy leading-tight">{reviewer}</p>
          <p className="text-xs text-gray-400">{location}</p>
        </div>
      </div>
    </div>
  );
}
