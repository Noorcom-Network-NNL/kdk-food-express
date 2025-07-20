import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { customer, items, total, paymentMethod, specialInstructions } = await req.json()

    // Create Supabase client with service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    console.log('Creating order with data:', { customer, items, total, paymentMethod })

    // First, create or get customer
    let customerId = null
    if (customer.phone) {
      // Check if customer exists
      const { data: existingCustomer } = await supabaseAdmin
        .from('customers')
        .select('id')
        .eq('phone', customer.phone)
        .single()

      if (existingCustomer) {
        customerId = existingCustomer.id
        // Update customer info
        await supabaseAdmin
          .from('customers')
          .update({
            name: customer.name,
            email: customer.email || null,
            address: customer.address || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', customerId)
      } else {
        // Create new customer
        const { data: newCustomer, error: customerError } = await supabaseAdmin
          .from('customers')
          .insert({
            name: customer.name,
            phone: customer.phone,
            email: customer.email || null,
            address: customer.address || null
          })
          .select('id')
          .single()

        if (customerError) {
          console.error('Customer creation error:', customerError)
          throw customerError
        }

        customerId = newCustomer.id
      }
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const taxAmount = 0 // No tax for now
    const deliveryFee = 0 // Free delivery for now

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_id: customerId,
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_address: customer.address || null,
        subtotal,
        tax_amount: taxAmount,
        delivery_fee: deliveryFee,
        total_amount: total,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cash' ? 'pending' : 'pending',
        status: 'pending',
        notes: specialInstructions || null,
        estimated_preparation_time: 30 // 30 minutes default
      })
      .select('id, order_number')
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      throw orderError
    }

    console.log('Order created:', order)

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      menu_item_id: null, // We'll need to map this to actual menu items later
      item_name: item.name,
      item_price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
      special_instructions: item.special_instructions || null
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      throw itemsError
    }

    console.log('Order items created successfully')

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        orderNumber: order.order_number,
        message: 'Order placed successfully!'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error creating order:', error)
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to create order'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})