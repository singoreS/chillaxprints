import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-shopify-hmac-sha256, x-shopify-topic, x-shopify-shop-domain',
};

// Map Shopify fulfillment status to our tracking status
function mapShopifyStatus(shopifyStatus: string, fulfillmentStatus: string | null): string {
  if (fulfillmentStatus === 'fulfilled') return 'delivered';
  if (fulfillmentStatus === 'partial') return 'shipped';
  
  switch (shopifyStatus) {
    case 'pending':
      return 'pending';
    case 'authorized':
    case 'paid':
      return 'confirmed';
    case 'partially_paid':
      return 'processing';
    case 'refunded':
    case 'voided':
      return 'cancelled';
    default:
      return 'processing';
  }
}

// Get French description for status
function getStatusDescription(status: string): string {
  const descriptions: Record<string, string> = {
    pending: 'Commande en attente de paiement',
    confirmed: 'Paiement confirmé, préparation en cours',
    processing: 'Commande en cours de préparation',
    shipped: 'Colis expédié',
    in_transit: 'Colis en transit',
    out_for_delivery: 'Colis en cours de livraison',
    delivered: 'Colis livré',
    cancelled: 'Commande annulée',
  };
  return descriptions[status] || 'Mise à jour du statut';
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get webhook topic from headers
    const topic = req.headers.get('x-shopify-topic');
    const shopDomain = req.headers.get('x-shopify-shop-domain');
    
    console.log(`Received Shopify webhook: ${topic} from ${shopDomain}`);

    const payload = await req.json();
    
    // Handle different webhook topics
    if (topic === 'orders/create' || topic === 'orders/updated' || topic === 'orders/paid') {
      await handleOrderUpdate(supabase, payload);
    } else if (topic === 'orders/fulfilled') {
      await handleOrderFulfilled(supabase, payload);
    } else if (topic === 'orders/cancelled') {
      await handleOrderCancelled(supabase, payload);
    } else if (topic === 'fulfillments/create' || topic === 'fulfillments/update') {
      await handleFulfillmentUpdate(supabase, payload);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

async function handleOrderUpdate(supabase: any, payload: any) {
  const shopifyOrderId = String(payload.id);
  const orderNumber = payload.order_number || payload.name;
  
  console.log(`Processing order update: ${shopifyOrderId}, order number: ${orderNumber}`);

  // Find order by shopify_order_id or order_number
  const { data: order, error: findError } = await supabase
    .from('orders')
    .select('id, status')
    .or(`shopify_order_id.eq.${shopifyOrderId},order_number.eq.${orderNumber}`)
    .maybeSingle();

  if (findError) {
    console.error('Error finding order:', findError);
    return;
  }

  if (!order) {
    console.log('Order not found in database, skipping update');
    return;
  }

  const newStatus = mapShopifyStatus(payload.financial_status, payload.fulfillment_status);
  
  // Only update if status changed
  if (order.status !== newStatus) {
    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: newStatus,
        shopify_order_id: shopifyOrderId,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Error updating order:', updateError);
      return;
    }

    // Add tracking event
    const { error: trackingError } = await supabase
      .from('order_tracking')
      .insert({
        order_id: order.id,
        status: newStatus,
        description: getStatusDescription(newStatus),
        location: null
      });

    if (trackingError) {
      console.error('Error adding tracking event:', trackingError);
    }

    console.log(`Order ${order.id} updated to status: ${newStatus}`);
  }
}

async function handleOrderFulfilled(supabase: any, payload: any) {
  const shopifyOrderId = String(payload.id);
  
  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('shopify_order_id', shopifyOrderId)
    .maybeSingle();

  if (!order) return;

  // Update to delivered
  await supabase
    .from('orders')
    .update({ status: 'delivered', updated_at: new Date().toISOString() })
    .eq('id', order.id);

  await supabase
    .from('order_tracking')
    .insert({
      order_id: order.id,
      status: 'delivered',
      description: 'Commande livrée avec succès',
      location: null
    });

  console.log(`Order ${order.id} marked as delivered`);
}

async function handleOrderCancelled(supabase: any, payload: any) {
  const shopifyOrderId = String(payload.id);
  
  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('shopify_order_id', shopifyOrderId)
    .maybeSingle();

  if (!order) return;

  await supabase
    .from('orders')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', order.id);

  await supabase
    .from('order_tracking')
    .insert({
      order_id: order.id,
      status: 'cancelled',
      description: payload.cancel_reason || 'Commande annulée',
      location: null
    });

  console.log(`Order ${order.id} cancelled`);
}

async function handleFulfillmentUpdate(supabase: any, payload: any) {
  const shopifyOrderId = String(payload.order_id);
  const trackingNumber = payload.tracking_number;
  const trackingCompany = payload.tracking_company;
  const fulfillmentStatus = payload.status;
  
  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('shopify_order_id', shopifyOrderId)
    .maybeSingle();

  if (!order) return;

  let status = 'processing';
  let description = 'Mise à jour de l\'expédition';
  
  switch (fulfillmentStatus) {
    case 'pending':
      status = 'processing';
      description = 'Colis en préparation';
      break;
    case 'open':
    case 'success':
      status = 'shipped';
      description = trackingNumber 
        ? `Colis expédié via ${trackingCompany || 'transporteur'} - N° ${trackingNumber}`
        : 'Colis expédié';
      break;
    case 'in_transit':
      status = 'in_transit';
      description = 'Colis en transit';
      break;
    case 'out_for_delivery':
      status = 'out_for_delivery';
      description = 'Colis en cours de livraison';
      break;
    case 'delivered':
      status = 'delivered';
      description = 'Colis livré';
      break;
  }

  await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', order.id);

  await supabase
    .from('order_tracking')
    .insert({
      order_id: order.id,
      status,
      description,
      location: payload.destination?.city || null
    });

  console.log(`Fulfillment update for order ${order.id}: ${status}`);
}
