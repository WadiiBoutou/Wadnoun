"use client";

import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";

interface LottieIconProps {
  iconPath: string;
  isHovered: boolean;
  className?: string;
}

export const LottieIcon = ({ iconPath, isHovered, className }: LottieIconProps) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    fetch(iconPath)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading Lottie:", err));
  }, [iconPath]);

  useEffect(() => {
    if (!lottieRef.current) return;
    if (isHovered) {
      lottieRef.current.play();
    } else {
      lottieRef.current.stop();
    }
  }, [isHovered]);

  if (!animationData) return <div className={className} />;

  return (
    <div className={className}>
      <Lottie 
        lottieRef={lottieRef}
        animationData={animationData} 
        loop={true} 
        autoplay={false}
      />
    </div>
  );
};
