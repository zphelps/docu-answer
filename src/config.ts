
/* Supabase Config */
import {createClient} from "@supabase/supabase-js";

const SUPABASE_PRIVATE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiaGJqamtsZWt1d2tjdGNwZHZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0NTY0MzYsImV4cCI6MjAxNDAzMjQzNn0.tMMCxVtFNs8sUlqcRsYbesdmTN5XD8xHfDZfOJviLmg"
const SUPABASE_URL="https://kbhbjjklekuwkctcpdvo.supabase.co"
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PRIVATE_KEY);

const PRODUCTION_URL = "https://langchain.vercel.app";
const DEVELOPMENT_URL = "http://localhost:3001";
export { supabaseClient, PRODUCTION_URL, DEVELOPMENT_URL };
