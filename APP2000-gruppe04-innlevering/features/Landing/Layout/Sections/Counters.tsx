import { Box, Container, Divider, Grid, Flex } from "@chakra-ui/react";
import Counter from "@/features/Common/Layout/Component/Counter/Counter";
import { useTranslation } from "react-i18next";

/**
 * @description Counters er en layout for å å vise frem tellere på landingssiden.
 * @author Borgar Flaen Stensrud
 * @usage <Counters /> in layout/pages/LandingPage/index.tsx
 * @example <Counters/>
 *
 * @use box, container, divider, grid, counter
 * @use counter
 * @source https://www.creative-tim.com/product/material-kit-react
 * @version 1.0 2024-28-01
 *
 *
 */

export default function Counters() {
  const { t } = useTranslation();

  return (
    <Box py={3}>
      <Container>
        <div className="flex flex-row gap-4">
          <Counter
            count={70}
            suffix="+"
            title={t("counters.openingsTitle")}
            description={t("counters.openingsDescription")}
            color="black"
          />

          <Divider
            orientation="vertical"
            sx={{ display: { xs: "none", md: "block" }, mx: 0 }}
          />
          <Counter
            count={15}
            suffix="+"
            title={t("counters.endingsTitle")}
            description={t("counters.endingsDescription")}
            color="black"
          />
          <Divider
            orientation="vertical"
            sx={{ display: { xs: "none", md: "block" }, ml: 0 }}
          />

          <Counter
            count={4}
            title={t("counters.tutorialsTitle")}
            description={t("counters.tutorialsDescription")}
            color="black"
          />
        </div>
      </Container>
    </Box>
  );
}
