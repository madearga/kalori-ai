'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      (deferredPrompt as unknown as { prompt: () => void }).prompt();
      const { outcome } = await (deferredPrompt as unknown as { userChoice: Promise<{ outcome: string }> }).userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsVisible(false);
      }
    }
  };

  const handleDismissClick = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to prevent showing again for a period
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Check if the prompt was dismissed recently
  useEffect(() => {
    const dismissedTime = localStorage.getItem('installPromptDismissed');
    if (dismissedTime) {
      const timeElapsed = Date.now() - parseInt(dismissedTime, 10);
      const dismissalPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days
      if (timeElapsed < dismissalPeriod) {
        setIsVisible(false);
      }
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-xs z-50">
      <h2 className="text-lg font-semibold mb-2">Install Calories Tracker</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Install this app on your device for quick access and a better experience.
      </p>
      <div className="flex gap-2">
        <Button onClick={handleInstallClick} variant="default">
          Install
        </Button>
        <Button onClick={handleDismissClick} variant="outline">
          Dismiss
        </Button>
      </div>
    </div>
  );
}
