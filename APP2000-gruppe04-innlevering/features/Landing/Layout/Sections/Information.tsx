import React from "react";
import RotatingCard from "@/features/Landing/Layout/Components/rotatingCard";
import RotatingCardFront from "@/features/Landing/Layout/Components/rotatingCard/RotatingCardFront";
import RotatingCardBack from "@/features/Landing/Layout/Components/rotatingCard/RotatingCardBack";
import Grid from "@/features/Common/Components/Grid/Grid";
import Image from "next/image";
import DefaultInfoCard from "@/features/Common/Components/DefaultInfoCard/DefaultInfoCard";
import rook from "@/public/images/chess/rook.png";
import { useTranslation } from "react-i18next";

/**
 * @description RotatingCardLayout er en layout for å å vise frem en roterende kortstokk med informasjon om sjakkspilling og sjakkspillere.
 * @author Borgar Flaen Stensrud
 * @usage <RotatingCardLayout /> in layout/pages/LandingPage/index.tsx
 * @example <RotatingCardLayout/>
 *
 * @use react
 * @use next/image
 * @use layout/components/rotatingCard
 * @use layout/components/rotatingCard/RotatingCardFront
 * @use layout/components/rotatingCard/RotatingCardBack
 * @use components/Grid
 * @use components/DefaultInfoCard
 *
 * @media public/images/chess/rook.png
 * @media public/images/chess/info.png
 * @media public/images/rotating-card-bg-back.jpeg
 *
 * @version 1.0 2024-28-01
 *
 * TODO: improve media loading.
 */

export default function RotatingCardLayout() {
  console.log(rook);
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-row justify-center items-start"
      style={{ gap: "3.5rem" }}
    >
      <Grid container lg={1}>
        <Grid item>
          <RotatingCardFront
            image="/images/chess/info.png"
            icon="Grandmaster"
            title={t("rotatingCard.front.title")}
            description={t("rotatingCard.front.description")}
          />
        </Grid>
      </Grid>

      <Grid container style={{ maxWidth: "40%" }} lg={1}>
        <Grid container xs={2} lg={2} spacing={6} style={{ width: "50%" }}>
          <Grid item>
            <DefaultInfoCard
              icon={<Image src={rook.src} alt="rook" width={24} height={24} />}
              title={t("defaultInfoCard.connectedThroughPlay")}
              description={t("defaultInfoCard.connectedThroughPlayDescription")}
            />
          </Grid>
          <Grid item>
            <DefaultInfoCard
              icon={<Image src={rook.src} alt="rook" width={24} height={24} />}
              title={t("defaultInfoCard.battleTestedAIOpponents")}
              description={t(
                "defaultInfoCard.battleTestedAIOpponentsDescription"
              )}
            />
          </Grid>
          <Grid item>
            <DefaultInfoCard
              icon={<Image src={rook.src} alt="rook" width={24} height={24} />}
              title={t("defaultInfoCard.dynamicRatingSystem")}
              description={t("defaultInfoCard.dynamicRatingSystemDescription")}
            />
          </Grid>
          <Grid item>
            <DefaultInfoCard
              icon={<Image src={rook.src} alt="rook" width={24} height={24} />}
              title={t("defaultInfoCard.designedByChessLovers")}
              description={t(
                "defaultInfoCard.designedByChessLoversDescription"
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
