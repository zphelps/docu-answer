import { useContext } from 'react';
import {AuthContext, AuthContextType} from "@/contexts/supabase";

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as T;
