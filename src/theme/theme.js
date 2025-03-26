import { extendTheme } from "@chakra-ui/react";
import textStyles from './textStyles';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#a3cfff',
      200: '#60a5fa',
      300: '#06b6d4',
      400: '#3b82f6',
      500: '#2563eb',
      600: '#173da6',
      700: '#0c5c72',
      800: '#134152',
      900: '#14204a',
    },
  },
  fonts: {
    body: "ADLaM Display,Roboto, Noto Sans TC, sans-serif", // Custom font for body text
    heading: "ADLaM Display,Montserrat, Noto Sans TC, sans-serif", // Custom font for headings
  },
  textStyles: {
    ...textStyles,
  },
});

export default theme;
