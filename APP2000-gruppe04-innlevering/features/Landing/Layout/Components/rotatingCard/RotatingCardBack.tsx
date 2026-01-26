import { Button, Link } from "@nextui-org/react";

interface RotatingCardBackProps {
  color?: string;
  image?: string;
  icon?: string | JSX.Element;
  title?: string;
  description?: string;
  action?: {
    type: "external" | "internal";
    label: string;
    route?: string;
  };
}

/**
 * @description Gammel kode fra første innlevering som ble brukt til å lage et rotating card
 * henger igjen fra Creative Tim template, som var gratis, denne er ikke i bruk så lister den som deprecated
 * @author Borgar Flaen Stensrud
 * @deprecated
 *  @source https://www.creative-tim.com/product/material-kit-react
 */
export default function RotatingCardBack({
  color,
  image,
  icon,
  title,
  description,
  action,
}: RotatingCardBackProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotateY(180deg)",
        }}
      >
        <h3 style={{ color: "white", marginBottom: "16px" }}>{title}</h3>
        <p style={{ color: "white", opacity: "0.8" }}>{description}</p>
        {action && (
          <div
            style={{
              width: "50%",
              marginTop: "32px",
              marginBottom: "16px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {action.type === "external" ? (
              <Button
                href=""
                target="_blank"
                rel="noreferrer"
                size="sm"
                fullWidth
              >
                CTA
              </Button>
            ) : (
              <Button
                as={Link}
                href={action.route}
                color="primary"
                size="sm"
                fullWidth
              >
                {action.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
