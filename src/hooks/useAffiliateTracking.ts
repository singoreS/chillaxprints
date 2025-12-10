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
        // Save to cookie
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
        document.cookie = `${AFFILIATE_COOKIE_NAME}=${refCode}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

        try {
          // Get affiliate ID from code
          const { data: affiliate } = await supabase
            .from('affiliates')
            .select('id')
            .eq('affiliate_code', refCode)
            .eq('status', 'active')
            .single();

          if (affiliate) {
            // Track the referral
            await supabase.from('affiliate_referrals').insert({
              affiliate_id: affiliate.id,
              referrer_url: document.referrer || null,
              landing_page: window.location.pathname,
              user_agent: navigator.userAgent,
            });
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
      return value;
    }
  }
  return null;
};

// Helper function to clear affiliate cookie
export const clearAffiliateCookie = () => {
  document.cookie = `${AFFILIATE_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
