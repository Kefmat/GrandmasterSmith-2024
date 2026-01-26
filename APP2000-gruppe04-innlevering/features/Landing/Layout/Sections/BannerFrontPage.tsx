"use client";

import { Box, Container } from "@chakra-ui/react";
import { Button } from "@nextui-org/react";
import React from "react";
import Text from "@/features/Common/Components/Text/text";
import { useTranslation } from "react-i18next";

/**
 * @description BannerFrontPage er en layout for banner på forsiden.
 * @author Borgar Flaen Stensrud
 * @usage <BannerFrontPage /> in layout/page/LandingPage/index.tsx
 * @example <BannerFrontPage />
 *
 * @use react
 * @use <Box />, <Container />, <Typography /> fra @mui/material
 * @version 1.0 2024-28-01
 *
 */

const BannerFrontPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container
      maxW="container.xl"
      className="p-0 mt-20 flex flex-row w-full justify-between"
    >
      <Box className="flex flex-row w-full justify-between">
        <Box className="z-10 w-1/3">
          <Text variant="h3" size="6xl">
            {t("banner.title")}
          </Text>
          <Text
            variant="body1"
            className="text-right text-primary mt-0 mb-0 "
            style={{ minWidth: "100%", textAlign: "start" }}
          >
            {t("banner.subtitle")}
          </Text>
          <Button
            variant="shadow"
            size="lg"
            className="bg-dark text-secondary rounded-md mt-2"
          >
            {t("banner.button")}
          </Button>
        </Box>

        <Box
          className="flex  w-1/3 flex-col justify-end"
          style={{ zIndex: 1, maxWidth: "40%" }}
        >
          <div className="flex flex-col justify-end items-end gap-2">
            <Text
              variant="h3"
              size="4xl"
              className="m-0 p-0 text-primary text-right"
              style={{ minWidth: "100%", textAlign: "end" }}
            >
              {t("banner.spectateTitle")}
            </Text>
            <Text
              variant="body1"
              className="text-right text-primary mt-0 mb-0 "
              style={{ minWidth: "100%", textAlign: "end" }}
            >
              {t("banner.spectateSubtitle")}
            </Text>
            <Button
              variant="shadow"
              size="lg"
              className="bg-dark text-secondary rounded-md"
            >
              {t("banner.registerButton")}
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default BannerFrontPage;
