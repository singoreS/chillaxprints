import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AFFILIATE_COOKIE_NAME = 'chillax_ref';
const COOKIE_EXPIRY_DAYS = 30;

export const useAffiliateTracking = () => {
  useEffect(() => {
    const trackReferral = async () => {
      // Check for ref parameter in URL
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');

      if (refCode) {
        // Validate affiliate code format (alphanumeric only)
        if (!/^[A-Z0-9]+$/i.test(refCode)) {
          console.error('Invalid affiliate code format');
          return;
        }

        // Save to cookie
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
        document.cookie = `${AFFILIATE_COOKIE_NAME}=${refCode}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

        try {
          // Track referral via secure edge function
          const { error } = await supabase.functions.invoke('track-referral', {
            body: {
              affiliateCode: refCode,
              referrerUrl: document.referrer || null,
              landingPage: window.location.pathname,
              userAgent: navigator.userAgent,
            },
          });

          if (error) {
            console.error('Error tracking referral:', error);
          }

          // Clean up URL
          urlParams.delete('ref');
          const newUrl = urlParams.toString()
            ? `${window.location.pathname}?${urlParams.toString()}`
            : window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        } catch (error) {
          console.error('Error tracking referral:', error);
        }
      }
    };

    trackReferral();
  }, []);
};

// Helper function to get stored affiliate code
export const getStoredAffiliateCode = (): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === AFFILIATE_COOKIE_NAME) {
      // Validate before returning
      if (value && /^[A-Z0-9]+$/i.test(value)) {
        return value;
      }
      return null;
    }
  }
  return null;
};

// Helper function to clear affiliate cookie
export const clearAffiliateCookie = () => {
  document.cookie = `${AFFILIATE_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
