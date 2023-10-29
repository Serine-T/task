import React from 'react';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

interface CustomTheme {}

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
  interface TypographyVariantsOptions {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    subtitle3: React.CSSProperties;
  }
   interface BreakpointOverrides {
     sm: true;
     md: true;
     lg: true;
     l: true;
     xl: true;
     el: true;
     eel: true;
   }
}

export { createTheme, responsiveFontSizes };
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    subtitle3: true;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    custom: {
      red: string;
      yellow: string;
      green: string;
    };
  }
}
