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

    const { orderId } = await req.json();

    if (!orderId) {
      throw new Error('Order ID is required');
    }

    // Verify order exists
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('id, order_number, user_id')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error('Order not found');
    }

    // Generate a secure random token
    const tokenArray = new Uint8Array(32);
    crypto.getRandomValues(tokenArray);
    const token = Array.from(tokenArray, byte => byte.toString(16).padStart(2, '0')).join('');

    // Token expires in 30 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Store token in database
    const { data: tokenData, error: tokenError } = await supabaseClient
      .from('order_access_tokens')
      .insert({
        order_id: orderId,
        token: token,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();

    if (tokenError) {
      console.error('Error creating token:', tokenError);
      throw new Error('Failed to generate tracking token');
    }

    // Get user profile for email
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('email, first_name')
      .eq('id', order.user_id)
      .single();

    const trackingUrl = `${req.headers.get('origin') || ''}/suivi-commande?token=${token}`;

    console.log('Token generated successfully:', {
      orderId: order.id,
      orderNumber: order.order_number,
      trackingUrl: trackingUrl,
      expiresAt: expiresAt.toISOString()
    });

    return new Response(
      JSON.stringify({
        success: true,
        token: token,
        trackingUrl: trackingUrl,
        expiresAt: expiresAt.toISOString(),
        email: profile?.email,
        orderNumber: order.order_number
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in generate-order-token:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});