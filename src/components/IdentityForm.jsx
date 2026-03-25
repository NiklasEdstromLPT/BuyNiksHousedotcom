import { useState } from 'react';
import ProgressBar from './ProgressBar';

function validate(identity) {
  const errors = {};
  if (!identity.firstName.trim()) errors.firstName = 'First name is required';
  if (!identity.lastName.trim()) errors.lastName = 'Last name is required';
  if (!identity.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!identity.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/\d{10,}/.test(identity.phone.replace(/\D/g, ''))) {
    errors.phone = 'Enter a valid phone number';
  }
  return errors;
}

export default function IdentityForm({ onSubmit, property, qualification }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProgressBar currentStep={4} totalSteps={5} />

      <div className="flex-1 flex flex-col md:flex-row px-6 md:px-12 py-10 gap-10 max-w-5xl mx-auto w-full">
        {/* Left Column — Reinforcement + Summary */}
        <div className="flex-1">
          <p className="text-[11px] tracking-[3px] uppercase text-gold mb-3">Almost There</p>
          <h1 className="text-2xl font-extrabold text-navy leading-tight mb-3.5">
            Your Assessment is Ready to Be Claimed
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            A certified LPT agent will personally review your property and reach out within 48 hours
            with your complete market assessment.
          </p>

          {/* Property Summary Box */}
          <div className="bg-card-bg rounded-lg p-4 border-l-4 border-navy">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">Your Property Profile</p>
            {property && (
              <>
                <SummaryItem text={property.normalizedAddress} />
                <SummaryItem text={`${property.beds} bed / ${property.baths} bath · ${property.sqft?.toLocaleString()} sqft · Built ${property.yearBuilt}`} />
                <SummaryItem text={`Alignment: ${property.alignmentTier === 'strong' ? 'Strong Market Fit' : property.alignmentTier === 'within' ? 'Within Range' : 'Additional Assessment'}`} />
              </>
            )}
            {qualification?.condition && <SummaryItem text={`Condition: ${qualification.condition}`} />}
            {qualification?.timeline && <SummaryItem text={`Timeline: ${qualification.timeline}`} />}
          </div>
        </div>

        {/* Right Column — Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" value={form.firstName} onChange={handleChange('firstName')} error={errors.firstName} />
              <Field label="Last Name" value={form.lastName} onChange={handleChange('lastName')} error={errors.lastName} />
            </div>
            <Field label="Email Address" type="email" value={form.email} onChange={handleChange('email')} error={errors.email} placeholder="you@email.com" />
            <Field label="Phone Number" type="tel" value={form.phone} onChange={handleChange('phone')} error={errors.phone} placeholder="(555) 000-0000" />

            <button
              type="submit"
              className="w-full bg-navy text-white py-4 rounded-md font-bold text-[15px] mt-5 hover:bg-navy/90 transition-colors cursor-pointer text-center"
            >
              Connect Me With an Expert →
            </button>

            <p className="text-[11px] text-gray-400 leading-relaxed mt-2.5 text-center">
              By submitting, you agree to be contacted by an LPT Holdings agent. No spam. Unsubscribe anytime.
              <br />
              [TCPA consent language — provided by LPT legal]
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border-[1.5px] rounded-md px-3.5 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 ${
          error ? 'border-red-400' : 'border-gray-300 focus:border-navy'
        }`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}

function SummaryItem({ text }) {
  return (
    <div className="flex items-center gap-2 py-1 text-sm text-gray-700">
      <span className="text-terminal-green font-bold">✓</span>
      {text}
    </div>
  );
}
