import { useState } from 'react';
import { FLAGS } from '../config/flags';

const QUESTIONS = [
  {
    id: 'condition',
    question: "How would you describe your home's current condition?",
    sub: "Be honest — it helps us match you to the right expert and offer path.",
    options: [
      { label: 'Move-In Ready', icon: '🏡', desc: 'Updated, well-maintained, nothing major needed' },
      { label: 'Minor Updates Needed', icon: '🔨', desc: 'Cosmetic fixes, fresh paint, small repairs' },
      { label: 'Needs Work', icon: '🏗', desc: 'Kitchen, bath, or structural updates required' },
      { label: 'Significant Renovation', icon: '🏚', desc: 'Major systems or full remodel needed' },
    ],
    flag: true,
  },
  {
    id: 'timeline',
    question: 'How soon are you looking to sell?',
    sub: 'This helps us prioritize your assessment timeline.',
    options: [
      { label: 'ASAP', icon: '⚡', desc: 'Ready to move as fast as possible' },
      { label: '30 days', icon: '📅', desc: 'Within the next month' },
      { label: '1–3 months', icon: '🗓', desc: 'Planning ahead, flexible timeline' },
      { label: 'Just exploring', icon: '🔍', desc: 'Curious about options, no rush' },
    ],
    flag: true,
  },
  {
    id: 'occupancy',
    question: 'What is the current occupancy?',
    sub: 'This helps coordinate scheduling for the assessment.',
    options: [
      { label: 'Owner-occupied', icon: '🏠', desc: 'You currently live in the property' },
      { label: 'Tenant-occupied', icon: '🔑', desc: 'A renter is currently living there' },
      { label: 'Vacant', icon: '📭', desc: 'The property is currently empty' },
    ],
    flag: true,
  },
  {
    id: 'structuralIssues',
    question: 'Are there any known structural issues?',
    sub: 'Foundation, roof, or major system concerns.',
    options: [
      { label: 'No known issues', icon: '✅', desc: 'Everything appears structurally sound' },
      { label: 'Yes, minor', icon: '⚠️', desc: 'Small cracks, aging roof, minor concerns' },
      { label: 'Yes, significant', icon: '🚧', desc: 'Foundation, structural, or major system issues' },
    ],
    flag: FLAGS.ENABLE_Q4_STRUCTURAL,
  },
];

export default function PropertyQualification({ onComplete }) {
  const activeQuestions = QUESTIONS.filter((q) => q.flag);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const question = activeQuestions[currentQ];

  const handleSelect = (option) => {
    setSelected(option.label);
    const newAnswers = { ...answers, [question.id]: option.label };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ + 1 < activeQuestions.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        onComplete(newAnswers);
      }
    }, 300);
  };

  if (!question) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10">
        <div className="w-full max-w-xl mx-auto">
          {/* Question */}
          <h1 className="text-xl md:text-[22px] font-bold text-navy mb-2 max-w-lg">
            {question.question}
          </h1>
          <p className="text-sm text-gray-400 mb-7">{question.sub}</p>

          {/* Option Cards — 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-[560px]">
            {question.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt)}
                className={`border-2 rounded-xl p-4.5 text-left cursor-pointer transition-all ${
                  selected === opt.label
                    ? 'border-navy bg-[#f0f4fa]'
                    : 'border-gray-200 hover:border-navy/40'
                }`}
              >
                <div className="text-xl mb-2">{opt.icon}</div>
                <div className="text-sm font-bold text-navy mb-1">{opt.label}</div>
                <div className="text-xs text-gray-400 leading-snug">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
