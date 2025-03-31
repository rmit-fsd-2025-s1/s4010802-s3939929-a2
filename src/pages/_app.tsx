import "@/styles/globals.css";
//import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Navigation from "../components/Navigation";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      
      
        <Component {...pageProps} />
      
    </AuthProvider>
  );
}
