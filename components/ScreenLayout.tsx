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
      '--color-fourth':'425466'
    }),
    dark: vars({
      '--color-primary': '#1a1c20',
      '--color-secondary': 'white',
      '--color-third':'#24262f',
      '--color-fourth':'#898989'
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
