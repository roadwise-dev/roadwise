"use client";

import { Suspense, useState } from 'react';
import { OnboardingProvider, useOnboarding } from '@/contexts/onboarding-context';
import { ProgressIndicator } from '@/components/onboarding/progress-indicator';
import { OnboardingNavigation } from '@/components/onboarding/navigation';
import { createAppWithOnboardingAction } from '@/actions/create-app-with-onboarding';

// Import step components (we'll create these next)
import { AppDetailsForm } from '@/components/onboarding/app-details-form';
import { TemplateSelector } from '@/components/onboarding/template-selector';
import { CustomBoardCreator } from '@/components/onboarding/custom-board-creator';
import { SettingsForm } from '@/components/onboarding/settings-form';
import { LaunchPreview } from '@/components/onboarding/launch-preview';

function OnboardingContent() {
  const { 
    currentStep, 
    data, 
    canGoNext, 
    nextStep, 
    previousStep 
  } = useOnboarding();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStep = () => {
    switch (currentStep) {
      case 'app':
        return <AppDetailsForm />;
      case 'boards':
        return <TemplateSelector />;
      case 'custom':
        return <CustomBoardCreator />;
      case 'settings':
        return <SettingsForm />;
      case 'launch':
        return <LaunchPreview />;
      default:
        return <AppDetailsForm />;
    }
  };

  const getNextLabel = () => {
    switch (currentStep) {
      case 'launch':
        return 'Create App & Launch';
      default:
        return 'Continue';
    }
  };

  const handleNext = async () => {
    if (currentStep === 'launch') {
      // Submit the form on the launch step
      setIsSubmitting(true);
      
      try {
        const formData = new FormData();
        formData.append('appName', data.appName);
        formData.append('appSlug', data.appSlug);
        formData.append('appDescription', data.appDescription);
        formData.append('avatarUrl', data.avatarUrl);
        formData.append('template', data.template);
        formData.append('customBoards', JSON.stringify(data.customBoards));
        formData.append('isPublic', data.isPublic.toString());
        formData.append('emailNotifications', data.emailNotifications.toString());
        
        const result = await createAppWithOnboardingAction(formData);
        if (typeof result === 'string') {
          // Handle error case
          console.error('Error creating app:', result);
          alert('Error creating app: ' + result);
        }
        // If successful, the action will redirect automatically
      } catch (error) {
        console.error('Error creating app:', error);
        alert('An unexpected error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Regular navigation for other steps
      nextStep();
    }
  };

  const canGoBack = currentStep !== 'app';

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto py-16">
        <ProgressIndicator 
          currentStep={currentStep} 
          template={data.template}
        />
        
        <div className="space-y-8">
          {renderStep()}
          
          <OnboardingNavigation
            onBack={previousStep}
            onNext={handleNext}
            canGoBack={canGoBack}
            canGoNext={canGoNext()}
            nextLabel={getNextLabel()}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingProvider>
        <OnboardingContent />
      </OnboardingProvider>
    </Suspense>
  );
}