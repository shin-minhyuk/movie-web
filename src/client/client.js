import axios from "axios";

const { VITE_SUPABASE_APIKEY, VITE_SUPABASE_URL } = import.meta.env;

export const client = axios.create({
  baseURL: VITE_SUPABASE_URL,

  headers: {
    apikey: VITE_SUPABASE_APIKEY,
  },
});
