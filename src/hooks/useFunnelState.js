import { useState, useCallback } from 'react';
import addressData from '../data/address_lookup.json';
import marketData from '../data/market_comps.json';

const INITIAL_STATE = {
  currentStage: 1,
  variant: 'A',
  address: {
    raw: '',
    normalized: '',
    property: null,
    marketComps: null,
  },
  qualification: {
    condition: null,
    timeline: null,
    occupancy: null,
    structuralIssues: null,
  },
  identity: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
};

export function useFunnelState() {
  // Parse URL variant on init
  const urlParams = new URLSearchParams(window.location.search);
  const variant = urlParams.get('v') === 'B' ? 'B' : 'A';

  const [state, setState] = useState({ ...INITIAL_STATE, variant });

  const setStage = useCallback((stage) => {
    setState((prev) => ({ ...prev, currentStage: stage }));
  }, []);

  const submitAddress = useCallback((rawAddress) => {
    const normalized = rawAddress.toLowerCase().trim();
    const property = addressData[normalized] || null;
    const marketComps = property ? marketData[property.zip] || null : null;

    console.log('EVENT:', { stage: 'stage_1', action: 'address_submitted', address: rawAddress, matched: !!property, timestamp: Date.now() });

    setState((prev) => ({
      ...prev,
      address: { raw: rawAddress, normalized, property, marketComps },
      currentStage: 3,
    }));
  }, []);

  const submitQualification = useCallback((answers) => {
    console.log('EVENT:', { stage: 'stage_4', action: 'qualification_complete', answers, timestamp: Date.now() });

    setState((prev) => ({
      ...prev,
      qualification: { ...prev.qualification, ...answers },
      currentStage: 5,
    }));
  }, []);

  const submitIdentity = useCallback((identity) => {
    console.log('EVENT:', { stage: 'stage_5', action: 'identity_submitted', timestamp: Date.now() });
    console.log('LEAD_SUBMIT:', identity);

    setState((prev) => ({
      ...prev,
      identity,
      currentStage: 6,
    }));
  }, []);

  return {
    state,
    setStage,
    submitAddress,
    submitQualification,
    submitIdentity,
  };
}
