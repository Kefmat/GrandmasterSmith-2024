import React, { createContext, useContext, useEffect, useState } from "react";

import { NextUIProvider } from "@nextui-org/react";

import { AuthProvider } from "./AuthContext";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { OpeningsProvider } from "./OpeningsContext";
import { GameProvider } from "./GameContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme/theme";

/**
 * @description Provider - Hovedprovider for å wrappe alle andre providers.
 * @author  Borgar Flaen Stensrud
 *
 */

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <GameProvider>
            <OpeningsProvider>
              <NextUIProvider>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
              </NextUIProvider>{" "}
            </OpeningsProvider>
          </GameProvider>
        </AuthProvider>
      </I18nextProvider>
    </UserProvider>
  );
}
