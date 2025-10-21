import axios from "axios";

const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const api = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
});

export { api };
