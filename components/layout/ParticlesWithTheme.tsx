"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "../ui/particles";

const ParticlesWithTheme = () => {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    console.log(resolvedTheme);
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <Particles
      className="absolute inset-0 z-0"
      color={color}
      ease={80}
      refresh
    />
  );
};

export default ParticlesWithTheme;
