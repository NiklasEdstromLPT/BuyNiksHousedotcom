import { useState, useRef, useEffect } from 'react';
import addressData from '../data/address_lookup.json';

// Build list of display addresses from the lookup JSON (skip _meta)
const ADDRESS_LIST = Object.entries(addressData)
  .filter(([key]) => key !== '_meta')
  .map(([, val]) => val.normalizedAddress);

export default function AddressEntry({ onSubmit }) {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);

  // Filter suggestions as user types
  const handleChange = (e) => {
    const val = e.target.value;
    setAddress(val);
    setActiveIndex(-1);

    if (val.trim().length >= 2) {
      const query = val.toLowerCase();
      const matches = ADDRESS_LIST.filter((a) => a.toLowerCase().includes(query)).slice(0, 6);
      setSuggestions(matches);
      setShowDropdown(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const selectAddress = (addr) => {
    setAddress(addr);
    setShowDropdown(false);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim()) {
      setShowDropdown(false);
      onSubmit(address.trim());
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      selectAddress(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav Bar */}
      <nav className="bg-navy-dark px-6 md:px-12 py-3.5 flex items-center justify-between">
        <div className="text-base font-extrabold text-white tracking-tight">
          BUY<span className="text-gold">MY</span>HOUSE
        </div>
        <div className="hidden md:flex gap-6 text-sm text-light-blue">
          <span>How It Works</span>
          <span>Reviews</span>
          <span>About LPT</span>
        </div>
      </nav>

      {/* Hero — Above the Fold */}
      <section className="bg-navy flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-16 text-center">
        <div className="w-full max-w-xl flex flex-col items-center gap-4">
          {/* Eyebrow */}
          <p className="text-[11px] tracking-[3px] uppercase text-light-blue">
            LPT Holdings — Verified Local Assessment
          </p>

          {/* Headline */}
          <h1 className="text-3xl md:text-[38px] font-extrabold text-white leading-tight max-w-lg">
            Sell Your House for Cash. No Repairs. No Surprises.
          </h1>

          {/* Subheadline */}
          <p className="text-base text-[#b0c4d8] max-w-md leading-relaxed">
            Enter your address to check eligibility for a firm cash offer.
          </p>

          {/* Address Input Row */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[560px] mt-4 relative"
            ref={wrapperRef}
          >
            <div className="flex flex-col sm:flex-row rounded-md overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <input
                type="text"
                value={address}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
                placeholder="123 Main Street, City, State…"
                className="flex-1 bg-white border-none px-5 py-4.5 text-[15px] text-gray-700 focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-gold text-navy font-bold text-sm tracking-wide px-4 md:px-7 py-4.5 whitespace-nowrap hover:brightness-110 transition-all cursor-pointer"
              >
                <span className="hidden sm:inline md:hidden">Check →</span>
                <span className="sm:hidden">Check My Property →</span>
                <span className="hidden md:inline">Check My Property →</span>
              </button>
            </div>

            {/* Autocomplete Dropdown */}
            {showDropdown && (
              <ul className="absolute left-0 right-0 top-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
                {suggestions.map((addr, i) => (
                  <li
                    key={addr}
                    onClick={() => selectAddress(addr)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`px-5 py-3 text-sm text-gray-700 cursor-pointer flex items-center gap-3 ${
                      i === activeIndex ? 'bg-navy/5' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-navy/40 text-base">📍</span>
                    <span>{addr}</span>
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* Trust Row */}
          <div className="flex flex-wrap justify-center gap-6 mt-5">
            <TrustChip text="No spam. No obligation." />
            <TrustChip text="Local LPT-certified agent" />
            <TrustChip text="48-hour response" />
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustChip({ text }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#7a9cbf]">
      <div className="w-4 h-4 rounded-full bg-[#2d4a70] flex items-center justify-center text-[9px] text-light-blue">
        ✓
      </div>
      {text}
    </div>
  );
}
