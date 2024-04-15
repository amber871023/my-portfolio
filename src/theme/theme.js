import { extendTheme } from "@chakra-ui/react";
import textStyles from './textStyles';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#FFFAF0',
      100: '#FBF3DA',
      200: '#FEEBC8',
      300: '#FBD38D',
      400: '#C6A88A',
      500: '#C97B4A',
      600: '#DE8E5C',
      700: '#ED8936',
      800: '#DD6B20',
      900: '#C05621',
    }
  },
  fonts: {
    body: "Roboto, Noto Sans TC, sans-serif", // Custom font for body text
    heading: "Montserrat, Noto Sans TC, sans-serif", // Custom font for headings
  },
  textStyles: {
    ...textStyles,
  },
});

export default theme;
