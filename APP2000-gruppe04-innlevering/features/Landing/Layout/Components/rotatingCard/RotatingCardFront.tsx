import { ReactNode } from "react";

interface RotatingCardFrontProps {
  color?: string;
  image?: string;
  icon?: string | ReactNode;
  title?: string;
  description?: string;
}
/**
 * @description Gammel kode fra første innlevering som ble brukt til å lage et rotating card
 * henger igjen fra Creative Tim template, vi bruker en egen versjon til sjakk-kortet på landing-page
 * @author Borgar Flaen Stensrud
 * @source https://www.creative-tim.com/product/material-kit-react
 */

export default function RotatingCardFront({
  color,
  image,
  icon,
  title,
  description,
}: RotatingCardFrontProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignContent: "start",
        borderRadius: "lg",
        width: "100%",
        position: "relative",
        backgroundColor: color || "transparent",
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backfaceVisibility: "hidden",
        minHeight: "500px",
        minWidth: "300px",
      }}
      className="bg-white bg-opacity-90 rounded-lg shadow-lg"
    >
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "between",
          justifyContent: "start",
        }}
      >
        <div style={{ padding: "16px", textAlign: "center", lineHeight: 1 }}>
          {icon && (
            <div style={{ fontSize: "2rem", marginBottom: "20px" }}>{icon}</div>
          )}
          <h3 style={{ color: "black", marginBottom: "40px" }}>{title}</h3>
          <p style={{ color: "black", opacity: 0.8 }}>{description}</p>
        </div>
      </div>
    </div>
  );
}
