// theme/ThemeProvider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useColorScheme, vars } from "nativewind";

// Define los temas
const themes = {
  brand: {
    light: vars({
      '--color-primary': 'black',
      '--color-secondary': 'white',
    }),
    dark: vars({
      '--color-primary': 'white',
      '--color-secondary': 'black',
    }),
  },
  christmas: {
    light: vars({
      '--color-primary': 'red',
      '--color-secondary': 'green',
    }),
    dark: vars({
      '--color-primary': 'green',
      '--color-secondary': 'red',
    }),
  },
};

// Tipos
type ThemeName = keyof typeof themes;
type ColorMode = 'light' | 'dark';

interface ThemeProviderProps {
  name: ThemeName;
  children: ReactNode;
  style?: ViewStyle;
}

// Context (opcional)
const ThemeContext = createContext<ThemeName>("brand");

// Provider
export function ThemeProvider({ name, children, style }: ThemeProviderProps) {
  const { colorScheme } = useColorScheme();
  const mode = (colorScheme ?? 'light') as ColorMode;

  const themeVars = themes[name]?.[mode];

  return (
    <ThemeContext.Provider value={name}>
      <View style={[themeVars, style]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

// Hook opcional para obtener el nombre del tema
export const useThemeName = () => useContext(ThemeContext);
