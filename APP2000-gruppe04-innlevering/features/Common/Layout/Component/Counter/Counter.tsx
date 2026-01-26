"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Text from "@/features/Common/Components/Text/text";
import { Box } from "@chakra-ui/react";
interface CounterProps {
  count: number;
  title?: string;
  description?: string;
  color?: string;
  suffix?: string;
}

/**
 * @description Counter er en layout for tellende animert tekst.
 * @author Borgar Flaen Stensrud
 * @usage <LandingPageLayout /> in layout/page/LandingPage/index.tsx
 * @example <Counter count = {count} title = {title} description = {description} color = {color} suffix = {suffix} />
 *
 * @use countUp.js
 * @use <Box />, <Typography /> mui
 * @use <CountUp />
 * @use react, useState, useEffect
 * @version 1.0 2024-28-01
 * TODO: export interface. CounterProps
 *
 */
export default function Counter({
  count,
  title,
  description,
  color = "primary.main",
  ...rest
}: CounterProps) {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartCount(true);
    }, 900); // 80% av 1s fade-in lengde

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box p={2} textAlign="center" lineHeight={1}>
      <Text
        variant="h1"
        style={{ fontSize: "50px" }}
        color={color}
        alignment="center"
      >
        {startCount && <CountUp end={count} duration={4} {...rest} />}
      </Text>
      {title && (
        <Text variant="h3" size="xxl" className="mt-2 mb-2" alignment="center">
          {title}
        </Text>
      )}
      {description && (
        <Text variant="body2" className="text-primary" alignment="center">
          {description}
        </Text>
      )}
    </Box>
  );
}
