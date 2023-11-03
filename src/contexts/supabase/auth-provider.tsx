import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import type { State } from './auth-context';
import { AuthContext, initialState } from './auth-context';
import {User} from "@/types/user";
import {DEVELOPMENT_URL, PRODUCTION_URL, supabaseClient} from "@/config";
import {AuthChangeEvent, Session} from "@supabase/gotrue-js";

enum ActionType {
  AUTH_STATE_CHANGED = 'AUTH_STATE_CHANGED',
}

type AuthStateChangedAction = {
  type: ActionType.AUTH_STATE_CHANGED;
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type Action = AuthStateChangedAction;

const reducer = (state: State, action: Action): State => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAuthStateChanged = useCallback(
      async (event: any, session: Session | null) => {
        if (session?.user) {
          console.log("SIGNED_IN", session);

          const {data, error} = await supabaseClient.from("profiles").select(
              "*"
          ).eq("id", session.user.id).single();

          console.log(data, error);

          dispatch({
            type: ActionType.AUTH_STATE_CHANGED,
            payload: {
              isAuthenticated: true,
              user: {
                id: data.id, //session.user.id,
                email: data.email, //data?.email,
                displayName: data.display_name, //data.displayName,
                avatarURL: data.avatar_url, //data.displayName,
                googleAccessToken: ""
              }
            }
          });
        } else {
          dispatch({
            type: ActionType.AUTH_STATE_CHANGED,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      },
      [dispatch]
  );

  useEffect(
      () => {
        supabaseClient.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
          return handleAuthStateChanged(event, session);
        });
      },
      []
  );

  const signInWithGoogle = useCallback(
      async (redirectTo: string): Promise<void> => {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
            redirectTo: `${process.env.NODE_ENV == 'development' ? DEVELOPMENT_URL : PRODUCTION_URL}/${redirectTo}`,
            scopes: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile',
          },
        })
      },
      []
  );

  const _signOut = useCallback(async (): Promise<void> => {
    await supabaseClient.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signInWithGoogle,
        signOut: _signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
