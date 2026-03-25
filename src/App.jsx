import { useFunnelState } from './hooks/useFunnelState';
import AddressEntry from './components/AddressEntry';
import TrustLayer from './components/TrustLayer';
import EvaluationInterstitial from './components/EvaluationInterstitial';
import PropertyQualification from './components/PropertyQualification';
import IdentityForm from './components/IdentityForm';
import ExpertAssignment from './components/ExpertAssignment';
import Confirmation from './components/Confirmation';

export default function App() {
  const { state, setStage, submitAddress, submitQualification, submitIdentity } = useFunnelState();
  const { currentStage, variant, address, qualification, identity } = state;

  // Stages 1 & 2: same page (above fold + scroll)
  if (currentStage === 1 || currentStage === 2) {
    return (
      <>
        <AddressEntry onSubmit={submitAddress} />
        <TrustLayer variant={variant} />
      </>
    );
  }

  // Stage 3: Evaluation Interstitial
  if (currentStage === 3) {
    return (
      <EvaluationInterstitial
        address={address.property?.normalizedAddress || address.raw}
        zip={address.property?.zip || ''}
        alignmentTier={address.property?.alignmentTier || 'strong'}
        demandScore={address.property?.marketDemandScore}
        onComplete={() => setStage(4)}
      />
    );
  }

  // Stage 4: Qualification
  if (currentStage === 4) {
    return <PropertyQualification onComplete={submitQualification} />;
  }

  // Stage 5: Identity
  if (currentStage === 5) {
    return (
      <IdentityForm
        onSubmit={submitIdentity}
        property={address.property}
        qualification={qualification}
      />
    );
  }

  // Stage 6: Expert Assignment
  if (currentStage === 6) {
    return (
      <ExpertAssignment
        onContinue={() => setStage(7)}
        property={address.property}
      />
    );
  }

  // Stage 7: Confirmation
  if (currentStage === 7) {
    return (
      <Confirmation
        address={address}
        qualification={qualification}
        identity={identity}
        property={address.property}
      />
    );
  }

  return null;
}
