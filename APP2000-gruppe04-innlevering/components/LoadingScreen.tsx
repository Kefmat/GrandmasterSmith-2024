"use client";

import Text from "@/features/Common/Components/Text/text";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import king from "@/public/assets/images/chess/king.png";

export default function LoadingScreen({
  handleDoneLoading,
}: {
  handleDoneLoading: () => void;
}) {
  const [dots, setDots] = useState(1);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      if (window.performance.timing.loadEventEnd > 0) {
        const totalTime =
          window.performance.timing.loadEventEnd -
          window.performance.timing.navigationStart;
        const elapsed =
          new Date().getTime() - window.performance.timing.navigationStart;
        const percentage = Math.min(100, (elapsed / totalTime) * 100);
        setLoadingPercentage(percentage);
      }
    }, 100);

    return () => clearInterval(loadingInterval);
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots === 3 ? 1 : prevDots + 1));
    }, 1000);

    const loadingInterval = setInterval(() => {
      setLoadingPercentage((prevPercentage) => {
        if (prevPercentage === 100) {
          clearInterval(loadingInterval);
          setHideContent(true);
          handleDoneLoading();
        }
        return prevPercentage === 100 ? 100 : prevPercentage + 1;
      });
    }, 100);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(loadingInterval);
    };
  }, [handleDoneLoading]);

  return (
    <div
      className={`fade-out ${hideContent ? "hide" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={king} alt="Loading" width={200} height={200} />
      <Text variant="h4" size="3xl" className="mt-5">
        Grandmaster&apos;s Smith
      </Text>
      <div className="loading-dots w-max-screen-xl w-100 flex flex-row items-center justify-start">
        <Text variant="h6" size="lg">
          Loading
        </Text>
        <p style={{ width: "0.5vw" }}> {".".repeat(dots)}</p>
      </div>
      {/* Replace 50 with your actual loading percentage */}
      <p>{loadingPercentage}% of loading</p>
    </div>
  );
}
