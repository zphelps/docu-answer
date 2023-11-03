'use client';

import type { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';


// Remove if locales are not used
import {store} from "@/store";
import {AuthConsumer, AuthProvider} from "@/contexts/supabase";
import {createTheme} from "@/theme";
import {SplashScreen} from "@/components/splash-screen";
import {pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;

  const theme = createTheme({
    colorPreset: "blue",
    contrast: "normal",
    paletteMode: "dark",
    responsiveFontSizes: true,
  });

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <AuthConsumer>
            {auth => {
              const showSlashScreen = !auth.isInitialized;
              return (
                  <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {
                      showSlashScreen
                          ? <SplashScreen/>
                          : (<>{children}</>)
                    }
                    <Toaster/>
                  </ThemeProvider>
              );
            }}
          </AuthConsumer>
        </AuthProvider>
      </ReduxProvider>
    </NextAppDirEmotionCacheProvider>
  );
};
