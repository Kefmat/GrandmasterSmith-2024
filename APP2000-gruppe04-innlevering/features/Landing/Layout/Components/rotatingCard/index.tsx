import { useState } from "react";
import { Card } from "@nextui-org/react";

interface RotatingCardProps {
  children: JSX.Element[];
}

/**
 * @description Gammel kode fra første innlevering som ble brukt til å lage et rotating card
 * henger igjen fra Creative Tim template, som var gratis, denne er ikke i bruk så lister den som deprecated
 * @author Borgar Flaen Stensrud
 * @deprecated
 * @source https://www.creative-tim.com/product/material-kit-react
 */

export default function RotatingCard({ children }: RotatingCardProps) {
  const [rotate, setRotate] = useState(false);

  const rotate0 = () => setRotate(false);
  const rotate180 = () => setRotate(true);

  return (
    <div
      style={{ perspective: "1000px" }} // Adjusted perspective value
      onMouseEnter={rotate180}
      onMouseLeave={rotate0}
    >
      <Card
        style={{
          boxShadow: "none",
          position: "relative",
          transform: rotate ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1)",
          border: "1px solid black",
          minWidth: "300px", // Adjusted minWidth
          minHeight: "500px", // Adjusted minHeight
          backfaceVisibility: "hidden",
        }}
        shadow="md"
      >
        {children}
      </Card>
    </div>
  );
}
