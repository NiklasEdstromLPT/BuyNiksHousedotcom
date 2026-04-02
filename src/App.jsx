import { useFunnelState } from './hooks/useFunnelState';
import AddressEntry from './components/AddressEntry';
import TrustLayer from './components/TrustLayer';
import EvaluationInterstitial from './components/EvaluationInterstitial';
import PropertyQualification from './components/PropertyQualification';
import IdentityForm from './components/IdentityForm';
import ExpertAssignment from './components/ExpertAssignment';
import Confirmation from './components/Confirmation';
import StageTransition from './components/StageTransition';
import ProgressBar from './components/ProgressBar';

// Map funnel stages to progress bar steps (only stages 4-6 show it)
const STAGE_TO_STEP = { 4: 3, 5: 4, 6: 5 };
const PROGRESS_MAX_W = { 4: 'max-w-xl', 5: 'max-w-xl', 6: 'max-w-xl' };

export default function App() {
  const { state, setStage, submitAddress, submitQualification, submitIdentity } = useFunnelState();
  const { currentStage, variant, address, qualification, identity } = state;

  const progressStep = STAGE_TO_STEP[currentStage];
  const showProgress = progressStep !== undefined;

  const renderStage = () => {
    if (currentStage === 1 || currentStage === 2) {
      return (
        <>
          <AddressEntry onSubmit={submitAddress} />
          <TrustLayer variant={variant} />
        </>
      );
    }

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

    if (currentStage === 4) {
      return <PropertyQualification onComplete={submitQualification} />;
    }

    if (currentStage === 5) {
      return (
        <IdentityForm
          onSubmit={submitIdentity}
          property={address.property}
          qualification={qualification}
        />
      );
    }

    if (currentStage === 6) {
      return (
        <ExpertAssignment
          onContinue={() => setStage(7)}
          property={address.property}
        />
      );
    }

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
  };

  return (
    <div>
      {showProgress && (
        <div className={`w-full ${PROGRESS_MAX_W[currentStage]} mx-auto`}>
          <ProgressBar currentStep={progressStep} totalSteps={5} />
        </div>
      )}
      <StageTransition stageKey={currentStage}>
        {renderStage()}
      </StageTransition>
    </div>
  );
}
