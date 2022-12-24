import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
    disableTransitionOnChange: true,
  },
  styles: {
    global: {
      body: {
        bg: "green",
      },
    },
  },
});
