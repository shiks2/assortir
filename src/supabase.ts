import { createClient } from '@supabase/supabase-js'
 
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string
 
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables. Check your .env file.')
}
 
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
 