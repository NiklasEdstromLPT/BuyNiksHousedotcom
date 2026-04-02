import { useState, useEffect, useRef } from 'react';

export default function StageTransition({ stageKey, skipAnimation, children }) {
  const [phase, setPhase] = useState('enter');
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [displayedKey, setDisplayedKey] = useState(stageKey);
  const prevKeyRef = useRef(stageKey);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (stageKey !== displayedKey) {
      const wasSkipped = prevKeyRef.current === 3;
      const isSkipped = stageKey === 3;
      const shouldSkip = wasSkipped || isSkipped || skipAnimation;

      prevKeyRef.current = stageKey;

      if (shouldSkip) {
        // Instant swap, no animation
        setDisplayedChildren(children);
        setDisplayedKey(stageKey);
        setPhase('visible');
        return;
      }

      // Fade out current page to the left
      setPhase('exit');
      timeoutRef.current = setTimeout(() => {
        // Swap content and fade in from the right
        setDisplayedChildren(children);
        setDisplayedKey(stageKey);
        setPhase('enter');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase('visible');
          });
        });
      }, 350);
    } else {
      setDisplayedChildren(children);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [stageKey, children, displayedKey, skipAnimation]);

  // On initial mount, animate in
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('visible');
      });
    });
  }, []);

  const style = {
    enter: { opacity: 0, transform: 'translateX(40px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
    exit: { opacity: 0, transform: 'translateX(-40px)' },
  };

  return (
    <div
      style={{
        ...style[phase],
        transition: phase === 'visible' || phase === 'exit'
          ? 'opacity 350ms ease, transform 350ms ease'
          : 'none',
        willChange: 'opacity, transform',
      }}
    >
      {displayedChildren}
    </div>
  );
}
