import React, { ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { vars, useColorScheme } from 'nativewind';

// Definición de temas con variables CSS personalizadas
const themes = {
  brand: {
    light: vars({
      '--color-primary': '#f4f5f9',
      '--color-secondary': 'black',
      '--color-third':'white',
      '--color-fourth':'425466',
      '--color-lessons':'white',
      '--color-card':'#f4f5f9',
      '--color-card-text':'#425466', 
      //
      '--color-general':'white', // Color de fondo general
      '--color-secondary-card': 'white', 
      '--color-title': '#425466', // Color del título
      '--color-icons': '#425466', // Color de los iconos
      
    }),
    dark: vars({
      '--color-primary': '#1a1c20',
      '--color-secondary': 'white',
      '--color-third':'#24262f',
      '--color-fourth':'#898989',
      '--color-lessons':'#24262F',
      '--color-card':'#D1D1D1',
      '--color-card-text':'white',
      //
      '--color-general':'#14161B', // Color de fondo general
      '--color-secondary-card': '#313843', // Color púrpura
      '--color-title': 'white', // Color del título
      '--color-icons': 'white', // Color de los iconos
    }),
  },
};

// Tipo ThemeName (keys del objeto themes)
export type ThemeName = keyof typeof themes;

// Interface ThemeProps, con style opcional y name opcional con default
export interface ThemeProps {
  name?: ThemeName;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Theme({ name = 'brand', children, style }: ThemeProps) {
  const { colorScheme } = useColorScheme();
  const themeVars = themes[name][colorScheme ?? 'light'];

  return <View style={[{ flex: 1 }, themeVars, style]}>{children}</View>;
}
