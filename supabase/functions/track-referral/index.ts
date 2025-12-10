import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { affiliateCode, landingPage, referrerUrl, userAgent } = await req.json();

    if (!affiliateCode || typeof affiliateCode !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid affiliate code' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Validate affiliate code format (alphanumeric only)
    if (!/^[A-Z0-9]+$/i.test(affiliateCode)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid affiliate code format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get affiliate ID from code - verify it's active
    const { data: affiliate, error: affiliateError } = await supabaseClient
      .from('affiliates')
      .select('id')
      .eq('affiliate_code', affiliateCode.toUpperCase())
      .eq('status', 'active')
      .single();

    if (affiliateError || !affiliate) {
      console.log('Affiliate not found or inactive:', affiliateCode);
      return new Response(
        JSON.stringify({ success: false, error: 'Affiliate not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    // Insert referral record using service role (bypasses RLS)
    const { error: insertError } = await supabaseClient
      .from('affiliate_referrals')
      .insert({
        affiliate_id: affiliate.id,
        referrer_url: referrerUrl || null,
        landing_page: landingPage || null,
        user_agent: userAgent || null,
      });

    if (insertError) {
      console.error('Error inserting referral:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to track referral' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log('Referral tracked successfully for affiliate:', affiliateCode);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error in track-referral:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
