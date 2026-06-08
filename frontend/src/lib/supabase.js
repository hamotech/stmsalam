import { createClient } from '@supabase/supabase-js'

// Option 2: Supabase Serverless Backend Integration
// Replace these with your actual STM Salam Supabase URL and Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Example Supabase Data Functions
 */

// Save order to cloud database
export const insertSupabaseOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        customer_name: orderData.customer.name,
        customer_phone: orderData.customer.phone,
        total_amount: orderData.total,
        order_status: 'pending',
        items: orderData.items,
        payment_method: orderData.payment,
        fulfillment_mode: orderData.mode
      }
    ])
  
  if (error) throw error
  return data
}
