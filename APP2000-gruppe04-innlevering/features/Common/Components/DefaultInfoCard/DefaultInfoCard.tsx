import PropTypes from "prop-types";
import { ReactNode } from "react";
import Box from "@/features/Common/Components/Box/box";
import Icon from "@/features/Common/Components/Icon/Icon";
import Text from "@/features/Common/Components/Text/text";
import React from "react";

interface DefaultInfoCardProps {
  color?: string;
  icon: ReactNode;
  title: string;
  description: string;
  direction?: "left" | "right" | "center";
  small?: boolean;
  customIcon?: ReactNode;
}

const DefaultInfoCard: React.FC<DefaultInfoCardProps> = ({
  color = "info",
  icon,
  title,
  description,
  direction = "left",
  small = false,
  customIcon,
}) => {
  return (
    <Box style={{ display: "block" }}>
      {React.isValidElement(icon) && (
        <img src={icon.props.src} alt={icon.props.alt} />
      )}
      <Text color="primary" size="xxl" variant="h1" header>
        {title}
      </Text>
      <Text color="tertiary" variant={"body1"} size="md">
        {description}
      </Text>
    </Box>
  );
};

export default DefaultInfoCard;
