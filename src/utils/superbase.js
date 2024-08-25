import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Setting superbase with clerk access token
const superbaseClient = async(superbaseAccessToken) => {
    const supabase = createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                Authorization: `Bearer ${superbaseAccessToken}`
            },
        },
    });

    return supabase;
}

export default superbaseClient;
        