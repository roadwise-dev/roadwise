"use client";

import { createContext, useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type OnboardingData = {
  // App Details
  appName: string;
  appSlug: string;
  appDescription: string;
  avatarUrl: string;
  isSlugEdited: boolean;
  
  // Board Configuration  
  template: 'simple' | 'kanban' | 'product' | 'custom';
  customBoards: string[];
  
  // Settings
  isPublic: boolean;
  emailNotifications: boolean;
};

type OnboardingContextType = {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  currentStep: string;
  goToStep: (step: string) => void;
  canGoNext: () => boolean;
  nextStep: () => void;
  previousStep: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const steps = ['app', 'boards', 'custom', 'settings', 'launch'];
const stepIndexMap = {
  app: 0,
  boards: 1,
  custom: 2,
  settings: 3,
  launch: 4
};

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step') || 'app';

  const [data, setData] = useState<OnboardingData>({
    appName: '',
    appSlug: '',
    appDescription: '',
    avatarUrl: '',
    isSlugEdited: false,
    template: 'simple',
    customBoards: ['', '', ''],
    isPublic: true,
    emailNotifications: true
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
    // Clear related errors when data is updated
    if (updates.appName !== undefined) {
      setErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { appName: _, ...rest } = prev;
        return rest;
      });
    }
    if (updates.appSlug !== undefined) {
      setErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { appSlug: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const goToStep = (step: string) => {
    router.push(`/dashboard/create?step=${step}`, { scroll: false });
  };

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 'app':
        return !!(data.appName.trim() && data.appSlug.trim() && !errors.appName && !errors.appSlug);
      case 'boards':
        return true; // Template selection is always valid
      case 'custom':
        if (data.template !== 'custom') return true;
        return data.customBoards.filter(board => board.trim()).length >= 2;
      case 'settings':
        return true; // Settings have defaults
      case 'launch':
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    const currentIndex = stepIndexMap[currentStep as keyof typeof stepIndexMap] || 0;
    
    // Skip custom step if template is not custom
    if (currentStep === 'boards' && data.template !== 'custom') {
      goToStep('settings');
    } else if (currentIndex < steps.length - 1) {
      goToStep(steps[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    const currentIndex = stepIndexMap[currentStep as keyof typeof stepIndexMap] || 0;
    
    // Skip custom step when going back if template is not custom
    if (currentStep === 'settings' && data.template !== 'custom') {
      goToStep('boards');
    } else if (currentIndex > 0) {
      goToStep(steps[currentIndex - 1]);
    }
  };
  
  return (
    <OnboardingContext.Provider value={{
      data, 
      updateData, 
      errors, 
      setErrors, 
      currentStep, 
      goToStep,
      canGoNext,
      nextStep,
      previousStep
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};